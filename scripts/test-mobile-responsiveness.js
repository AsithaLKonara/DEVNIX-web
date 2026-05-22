const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const FRONTEND_URL = 'http://localhost:3000';

async function runMobileAudit() {
  console.log('====================================================');
  console.log('🚀 STARTING REAL BROWSER MOBILE RESPONSIVENESS AUDIT');
  console.log('====================================================\n');

  const screenshotsDir = path.join(__dirname, '../public/e2e/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('Initializing Puppeteer under iPhone 14 Pro Max emulation...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Emulate iPhone 14 Pro Max
  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  });
  
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1');

  // Audit results container
  const auditResults = [];

  const auditPage = async (pageTitle, route, requiresAuth = false) => {
    const url = `${FRONTEND_URL}${route}`;
    console.log(`\n----------------------------------------------------`);
    console.log(`Auditing: ${pageTitle} (${route})`);
    console.log(`----------------------------------------------------`);
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      // Wait for React animations to settle
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Capture Mobile Screenshot
      const screenshotFilename = `mobile_${route.replace(/\//g, '_') || 'home'}.webp`;
      const screenshotPath = path.join(screenshotsDir, screenshotFilename);
      await page.screenshot({ path: screenshotPath, type: 'webp', quality: 80 });
      console.log(`📸 Screenshot captured: /e2e/screenshots/${screenshotFilename}`);

      // 1. Check for horizontal overflow
      const overflowDetails = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const windowWidth = window.innerWidth;
        const bodyWidth = document.body.scrollWidth;
        const isOverflowing = docWidth > windowWidth || bodyWidth > windowWidth;
        
        let badElements = [];
        if (isOverflowing) {
          // Find the elements causing overflow
          const allNodes = document.querySelectorAll('*');
          for (const node of allNodes) {
            const rect = node.getBoundingClientRect();
            if (rect.right > windowWidth) {
              // Get CSS selector or class list
              const selector = node.tagName.toLowerCase() + 
                (node.id ? `#${node.id}` : '') + 
                (node.className ? `.${Array.from(node.classList).join('.')}` : '');
              
              badElements.push({
                element: selector.substring(0, 100),
                right: rect.right,
                viewportWidth: windowWidth,
                width: rect.width
              });
              if (badElements.length >= 5) break; // Limit elements
            }
          }
        }

        return {
          isOverflowing,
          docWidth,
          bodyWidth,
          viewportWidth: windowWidth,
          badElements
        };
      });

      // 2. Audit Touch Targets (interactive elements must have min size of 44px x 44px)
      const touchTargetDetails = await page.evaluate(() => {
        const interactiveNodes = Array.from(document.querySelectorAll('a, button, input, select, textarea'));
        const sub44pxTargets = [];

        for (const node of interactiveNodes) {
          const rect = node.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) { // must be visible
            const isTooSmall = rect.width < 44 || rect.height < 44;
            if (isTooSmall) {
              const selector = node.tagName.toLowerCase() + 
                (node.id ? `#${node.id}` : '') + 
                (node.innerText ? ` (Text: "${node.innerText.substring(0, 20)}")` : '');
              
              sub44pxTargets.push({
                element: selector,
                width: rect.width,
                height: rect.height
              });
              if (sub44pxTargets.length >= 5) break; // Limit list
            }
          }
        }

        return {
          totalInteractive: interactiveNodes.length,
          sub44pxCount: sub44pxTargets.length,
          sub44pxTargets
        };
      });

      // Log findings
      console.log(`📏 Viewport Width: ${overflowDetails.viewportWidth}px`);
      console.log(`📐 Document Scroll Width: ${overflowDetails.docWidth}px`);
      if (overflowDetails.isOverflowing) {
        console.log(`⚠️  HORIZONTAL OVERFLOW DETECTED! Document is wider than the viewport.`);
        console.log('   Offending Elements:', overflowDetails.badElements);
      } else {
        console.log(`✅  Horizontal overflow: NONE. Layout fits perfectly.`);
      }

      console.log(`🎯 Touch Targets Audit: Total interactive elements = ${touchTargetDetails.totalInteractive}`);
      if (touchTargetDetails.sub44pxTargets.length > 0) {
        console.log(`⚠️  Touch targets below 44px standard: ${touchTargetDetails.sub44pxTargets.length} items found.`);
        console.log('   Sample sub-44px targets:', touchTargetDetails.sub44pxTargets);
      } else {
        console.log(`✅  Touch Targets: Compliant (All interactive zones satisfy >= 44px size guidelines).`);
      }

      auditResults.push({
        page: pageTitle,
        route,
        isOverflowing: overflowDetails.isOverflowing,
        touchTargetsCompliant: touchTargetDetails.sub44pxTargets.length === 0,
        overflowDetails,
        touchTargetDetails
      });

    } catch (e) {
      console.error(`❌ Audit failed for ${pageTitle}:`, e.message);
      auditResults.push({
        page: pageTitle,
        route,
        error: e.message
      });
    }
  };

  // A. Audit Public Homepage
  await auditPage('Public Landing Page', '/');

  // B. Audit Public Contact Page
  await auditPage('Contact Page', '/contact');

  // C. Audit Login Page
  await auditPage('Login Page', '/login');

  // D. Perform login to audit internal ERP pages
  console.log('\nLogging in as Super Admin to access ERP modules...');
  try {
    await page.goto(`${FRONTEND_URL}/login`, { waitUntil: 'networkidle2' });
    await page.type('input[type="email"]', 'superadmin@xonit.space');
    await page.type('input[type="password"]', 'xonit123');
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 })
    ]);
    console.log('✅ Successfully authenticated and logged in!');
    
    // E. Audit ERP main dashboard
    await auditPage('ERP Dashboard Home', '/dashboard');

    // F. Audit ERP HR directory
    await auditPage('ERP HR Module', '/dashboard/hr');

    // G. Audit ERP Project Board
    await auditPage('ERP Project Board', '/dashboard/projects');

    // H. Audit ERP CRM Lead Manager
    await auditPage('ERP CRM module', '/dashboard/crm');

    // I. Audit ERP Settings Form
    await auditPage('ERP Settings Page', '/dashboard/settings');

  } catch (err) {
    console.error('❌ Failed to login or perform internal ERP audits:', err.message);
  }

  await browser.close();

  console.log('\n====================================================');
  console.log('📊 RESPONSIVE AUDIT VERIFICATION RESULTS SUMMARY');
  console.log('====================================================');
  
  let totalPages = auditResults.length;
  let healthyPages = auditResults.filter(r => !r.isOverflowing && !r.error).length;
  
  console.log(`Total Pages Inspected: ${totalPages}`);
  console.log(`Responsive Fits (No Horizontal Overflow): ${healthyPages} / ${totalPages}`);
  
  console.log('\nPage Breakdown:');
  auditResults.forEach(r => {
    const statusStr = r.error ? '❌ ERROR' : (r.isOverflowing ? '⚠️ OVERFLOW' : '✅ COMPLIANT');
    console.log(`- ${r.page} (${r.route}): ${statusStr}`);
  });
  console.log('====================================================\n');
}

runMobileAudit();

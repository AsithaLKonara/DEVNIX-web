const puppeteer = require('puppeteer');

(async () => {
  console.log('Starting E2E Sidebar Click Test...');
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

  try {
    console.log('Navigating to login page...');
    await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle2' });
    
    console.log('Logging in as super admin...');
    await page.type('input[type="email"]', 'superadmin@xonit.space');
    await page.type('input[type="password"]', 'xonit123');
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle2' })
    ]);
    
    console.log('Successfully logged in. Waiting for dashboard to settle...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if sidebar is currently closed
    const isSidebarVisibleBefore = await page.evaluate(() => {
      const aside = document.querySelector('aside');
      if (!aside) return false;
      const rect = aside.getBoundingClientRect();
      return rect.left >= 0 && rect.right > 0;
    });
    console.log(`Sidebar visible initially: ${isSidebarVisibleBefore}`);
    
    // Click the Hamburger Menu button to open the sidebar
    console.log('Clicking Hamburger Menu button...');
    const hamburgerSelector = 'header button'; // First button in header
    await page.click(hamburgerSelector);
    await new Promise(resolve => setTimeout(resolve, 1000)); // wait for transition
    
    // Check if sidebar is now open
    const isSidebarVisibleAfter = await page.evaluate(() => {
      const aside = document.querySelector('aside');
      if (!aside) return false;
      const rect = aside.getBoundingClientRect();
      return rect.left >= 0 && rect.right > 0;
    });
    console.log(`Sidebar visible after clicking menu: ${isSidebarVisibleAfter}`);
    
    // Find the Close button inside the sidebar
    const closeBtnInfo = await page.evaluate(() => {
      const btn = document.querySelector('aside button[aria-label="Close sidebar"]');
      if (!btn) return { exists: false };
      const rect = btn.getBoundingClientRect();
      return {
        exists: true,
        tagName: btn.tagName,
        className: btn.className,
        rect: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          left: rect.left,
          top: rect.top
        },
        isVisible: rect.width > 0 && rect.height > 0
      };
    });
    console.log('Close Button Info:', JSON.stringify(closeBtnInfo, null, 2));
    
    if (closeBtnInfo.exists) {
      console.log('Clicking the Close button...');
      await page.click('aside button[aria-label="Close sidebar"]');
      await new Promise(resolve => setTimeout(resolve, 1000)); // wait for transition
      
      const isSidebarVisibleAfterClose = await page.evaluate(() => {
        const aside = document.querySelector('aside');
        if (!aside) return false;
        const rect = aside.getBoundingClientRect();
        return rect.left >= 0 && rect.right > 0;
      });
      console.log(`Sidebar visible after clicking close button: ${isSidebarVisibleAfterClose}`);
      
      if (!isSidebarVisibleAfterClose) {
        console.log('SUCCESS: Sidebar closed successfully via close button.');
      } else {
        console.log('FAILURE: Sidebar did not close when clicking the close button.');
      }
    } else {
      console.log('FAILURE: Close button was not found in the DOM.');
    }
  } catch (err) {
    console.error('An error occurred during testing:', err);
  } finally {
    await browser.close();
    console.log('Browser closed. Test finished.');
  }
})();

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const projects = [
  { name: 'weddinglk', url: 'https://wedding-lk.vercel.app/' },
  { name: 'task-nest', url: 'https://task-nest-gamma.vercel.app/' },
  { name: 'classified-ad', url: 'https://ai-powered-classified-ad-web.vercel.app/' },
  { name: 'ride-taxi', url: 'https://ride-x-taxi-web.vercel.app/' },
  { name: 'azone-cnc', url: 'https://a-zone-cnc-web.vercel.app/' },
  { name: 'smart-lms', url: 'https://smart-lms-saas.vercel.app/' },
  { name: 'smart-hotel-2', url: 'https://smart-hotel-2.vercel.app/' },
  { name: 'car-sale', url: 'https://car-sale-web.vercel.app/' },
  { name: 'ominichat', url: 'https://universal-chatbot-psi.vercel.app/' },
  { name: 'smart-store', url: 'https://smart-store-saas-demo.vercel.app/' },
  { name: 'facade-center', url: 'https://facade-web-red.vercel.app/' },
  { name: 'smart-hotel-1', url: 'https://smarthotel-demo.vercel.app/' },
  { name: 'automate-lanka', url: 'https://autolanka-frontend-app.vercel.app/' },
  { name: 'pos-system', url: 'https://facade-pos-frontend.vercel.app/' },
];

async function captureScreenshots() {
  const dir = path.join(__dirname, '../public/projects');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  for (const project of projects) {
    const filename = `${project.name}.webp`;
    const filepath = path.join(dir, filename);
    
    if (fs.existsSync(filepath)) {
      console.log(`Skipping ${project.name}, already exists.`);
      continue;
    }

    console.log(`Navigating to ${project.url}...`);
    try {
      await page.goto(project.url, { waitUntil: 'networkidle2', timeout: 30000 });
      // Wait an extra 2 seconds for any animations or images to load fully
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await page.screenshot({ path: filepath, type: 'webp', quality: 80 });
      console.log(`Captured: ${filename}`);
    } catch (e) {
      console.error(`Failed to capture ${project.name}:`, e.message);
    }
  }

  await browser.close();
  console.log('Done capturing screenshots.');
}

captureScreenshots();

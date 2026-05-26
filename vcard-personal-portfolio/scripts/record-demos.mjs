import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../assets/videos');

const demos = [
  {
    name: 'etg-portal',
    url: 'https://etg-portal.vercel.app/',
    wait: 3000,
    scroll: true,
  },
  {
    name: 'cutfish',
    url: 'https://thecutfishbarber.com/',
    wait: 3000,
    scroll: true,
  },
  {
    name: 'beats-demo',
    url: 'https://drive.google.com/file/d/1rs6iz70-h9CD6F3QBx3ocS5OqV5Ks4P9/preview',
    wait: 5000,
    scroll: false,
    duration: 8000,
  },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

for (const demo of demos) {
  const videoDir = path.join(outDir, `_tmp_${demo.name}`);
  await mkdir(videoDir, { recursive: true });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: videoDir,
      size: { width: 1280, height: 720 },
    },
  });

  const page = await context.newPage();
  console.log(`Recording ${demo.name}...`);

  try {
    await page.goto(demo.url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(demo.wait);

    if (demo.scroll) {
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let y = 0;
          const step = 4;
          const interval = setInterval(() => {
            window.scrollBy(0, step);
            y += step;
            if (y >= 600 || window.scrollY + window.innerHeight >= document.body.scrollHeight) {
              clearInterval(interval);
              resolve();
            }
          }, 16);
        });
      });
      await page.waitForTimeout(2000);
    } else {
      await page.waitForTimeout(demo.duration ?? 4000);
    }
  } catch (err) {
    console.warn(`  Warning for ${demo.name}:`, err.message);
    await page.waitForTimeout(3000);
  }

  const video = page.video();
  await context.close();

  if (video) {
    const webmPath = await video.path();
    const finalPath = path.join(outDir, `${demo.name}.webm`);
    const { rename, unlink } = await import('fs/promises');
    await rename(webmPath, finalPath);
    console.log(`  Saved ${finalPath}`);
    try {
      await unlink(path.join(videoDir, '.'));
    } catch {
      /* ignore */
    }
  }
}

await browser.close();
console.log('Done recording demos.');

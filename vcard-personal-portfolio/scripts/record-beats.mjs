import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../assets/videos');
const videoDir = path.join(outDir, '_tmp_beats-demo');

await mkdir(outDir, { recursive: true });
await mkdir(videoDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: {
    dir: videoDir,
    size: { width: 1280, height: 720 },
  },
});

const page = await context.newPage();
const url = 'https://drive.google.com/file/d/1rs6iz70-h9CD6F3QBx3ocS5OqV5Ks4P9/preview';

console.log('Recording Beats by Dre notebook demo...');
await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(5000);

const frame = page.frameLocator('iframe').first();
await frame.locator('body').click({ timeout: 10000 }).catch(async () => {
  await page.locator('iframe').click({ timeout: 5000 }).catch(() => {});
});

await page.waitForTimeout(1500);

for (let i = 0; i < 8; i += 1) {
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(900);
}

await page.waitForTimeout(2000);

const video = page.video();
await context.close();

if (video) {
  const webmPath = await video.path();
  const { rename } = await import('fs/promises');
  await rename(webmPath, path.join(outDir, 'beats-demo.webm'));
  console.log('Saved beats-demo.webm');
}

await browser.close();

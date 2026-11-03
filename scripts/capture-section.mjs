
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  reducedMotion: "no-preference",
});

await mkdir("portfolio-captures/sections", {
  recursive: true,
});

try {
  await page.goto("http://localhost:3000", {
    waitUntil: "domcontentloaded",
  });

  await page.evaluate(() => document.fonts.ready);

  // Replace this heading with the actual visible section text.
  const heading = page.getByText("Spaces for slower living", {
    exact: false,
  }).first();

  await heading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1600);

  await page.screenshot({
    path: "portfolio-captures/sections/residence-discovery.png",
    fullPage: false,
    animations: "allow",
  });

  console.log("Residence discovery captured!");
} finally {
  await browser.close();
}

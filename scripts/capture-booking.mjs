
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE_URL = "http://localhost:3000";
const OUTPUT = "portfolio-captures/booking";

await mkdir(OUTPUT, { recursive: true });

const browser = await chromium.launch({
  headless: false,
  slowMo: 80,
});

const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  reducedMotion: "no-preference",
});

const page = await context.newPage();

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

try {
  console.log("01 / Opening ATELIER STAY...");

  const response = await page.goto(BASE_URL, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });

  if (!response?.ok()) {
    throw new Error(`Website returned HTTP ${response?.status()}`);
  }

  await page.evaluate(() => document.fonts.ready);
  await sleep(2000);

  console.log("02 / Finding booking section...");

  // Match part of the visible booking section heading.
  const bookingHeading = page.getByText("Make room", {
    exact: false,
  }).first();

  await bookingHeading.waitFor({
    state: "visible",
    timeout: 15000,
  });

  await bookingHeading.scrollIntoViewIfNeeded();

  // Allow scroll-triggered animation to finish.
  await sleep(1800);

  console.log("03 / Capturing booking interface...");

  await page.screenshot({
    path: `${OUTPUT}/booking-default-desktop.png`,
    fullPage: false,
    animations: "allow",
    timeout: 30000,
  });

  console.log("Screenshot saved successfully!");
  console.log(`${OUTPUT}/booking-default-desktop.png`);

} catch (error) {
  console.error("Capture failed:", error.message);
} finally {
  console.log("Browser will stay open for inspection.");
  console.log("Press Enter in the terminal to close.");

  await new Promise((resolve) => {
    process.stdin.resume();
    process.stdin.once("data", resolve);
  });

  await context.close();
  await browser.close();
}

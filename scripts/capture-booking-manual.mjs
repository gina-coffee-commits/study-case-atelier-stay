
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const browser = await chromium.launch({
  headless: false,
});

const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  reducedMotion: "no-preference",
});

const page = await context.newPage();
const rl = readline.createInterface({ input, output });

await mkdir("portfolio-captures/booking", {
  recursive: true,
});

try {
  await page.goto("http://localhost:3000", {
    waitUntil: "domcontentloaded",
  });

  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2000);

  console.log("\nATELIER STAY is ready.");
  console.log("Use the browser to scroll and interact.");

  const screenshots = [
    "booking-default",
    "booking-calendar-open",
    "booking-dates-selected",
    "booking-residence-selector",
    "booking-guests",
    "booking-summary",
  ];

  for (const name of screenshots) {
    await rl.question(
      `\nPrepare "${name}" in Chrome, then press Enter to capture...`
    );

    await page.screenshot({
      path: `portfolio-captures/booking/${name}.png`,
      fullPage: false,
      animations: "allow",
      timeout: 30000,
    });

    console.log(`Saved: ${name}.png`);
  }

  console.log("\nAll booking screenshots captured!");
  await rl.question("Press Enter to close Chrome...");

} catch (error) {
  console.error("Capture error:", error);
  await rl.question("Press Enter to close Chrome...");
} finally {
  rl.close();
  await context.close();
  await browser.close();
}

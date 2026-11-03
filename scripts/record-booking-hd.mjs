
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const OUTPUT = "portfolio-captures/videos";
const URL = "http://localhost:3000";

await mkdir(OUTPUT, { recursive: true });

const rl = readline.createInterface({ input, output });

const browser = await chromium.launch({
  headless: false,
  args: [
    "--start-maximized",
    "--app=http://localhost:3000",
  ],
});

const context = await browser.newContext({
  viewport: null,
  reducedMotion: "no-preference",
  recordVideo: {
    dir: OUTPUT,
    size: {
      width: 1440,
      height: 900,
    },
  },
});

const page = await context.newPage();

try {
  console.log("Opening ATELIER STAY...");

  await page.goto(URL, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });

  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2000);

  console.log("\nRecording is active.");
  console.log("1. Scroll to the booking section.");
  console.log("2. Select check-in and check-out.");
  console.log("3. Select a residence.");
  console.log("4. Adjust the guest count.");
  console.log("5. Show the reservation summary.");

  await rl.question(
    "\nFinish your interaction, then press Enter to SAVE video..."
  );

  console.log("Saving video...");

  await context.close();

  await page.video()?.saveAs(
    `${OUTPUT}/atelier-stay-booking-hd.webm`
  );

  console.log("Video saved successfully!");
  console.log(`${OUTPUT}/atelier-stay-booking-hd.webm`);

} catch (error) {
  console.error("Recording error:", error.message);
  await context.close().catch(() => {});
} finally {
  rl.close();
  await browser.close();
}

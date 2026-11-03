
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE_URL = process.env.CAPTURE_URL ?? "http://localhost:3000";
const OUTPUT = "portfolio-captures";

const routes = [
  { name: "homepage", path: "/" },
  { name: "stays", path: "/stays" },
  { name: "experiences", path: "/experiences" },
  { name: "our-story", path: "/our-story" },
  { name: "gallery", path: "/gallery" },
];

// IMPORTANT:
// Check your actual src/app routes and edit the paths above.
// A nonexistent route will be reported and skipped.

const devices = {
  desktop: { width: 1440, height: 900, dpr: 2 },
  mobile: { width: 390, height: 844, dpr: 3 },
};

const browser = await chromium.launch({ headless: true });
await mkdir(OUTPUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function prepare(page) {
  await page.evaluate(() => document.fonts.ready);

  // Trigger scroll reveals and image lazy-loading.
  await page.evaluate(async () => {
    const delay = (ms) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const step = Math.max(300, Math.round(innerHeight * 0.65));
    const max = Math.max(
      0,
      document.documentElement.scrollHeight - innerHeight
    );

    for (let y = 0; y <= max; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await delay(120);
    }

    window.scrollTo({ top: max, behavior: "instant" });
    await delay(400);
    window.scrollTo({ top: 0, behavior: "instant" });
    await delay(700);
  });

  // Wait for currently loaded <img> elements to decode.
  await page.evaluate(async () => {
    const imgs = Array.from(document.images);
    await Promise.all(
      imgs.map(async (img) => {
        if (!img.complete) {
          await Promise.race([
            new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            }),
            new Promise((resolve) => setTimeout(resolve, 5000)),
          ]);
        }
        if (img.complete && img.naturalWidth > 0) {
          await img.decode().catch(() => {});
        }
      })
    );
  });

  await sleep(600);
}

async function capture(name, route, deviceName, device) {
  console.log(`\nCapturing ${name} / ${deviceName}`);

  const context = await browser.newContext({
    viewport: { width: device.width, height: device.height },
    deviceScaleFactor: device.dpr,
    reducedMotion: "no-preference",
  });

  const page = await context.newPage();
  page.setDefaultTimeout(15000);

  page.on("pageerror", (error) => {
    console.error("Page error:", error.message);
  });

  try {
    const response = await page.goto(`${BASE_URL}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    const status = response?.status() ?? 0;
    console.log("HTTP status:", status);

    if (status >= 400 || status === 0) {
      console.log("Skipped: unavailable route");
      return;
    }

    await prepare(page);

    // Capture a reliable top-of-page viewport.
    await page.screenshot({
      path: `${OUTPUT}/${name}-${deviceName}-hero.png`,
      fullPage: false,
      animations: "allow",
      timeout: 30000,
    });

    console.log("Saved viewport screenshot");

    // A separate full-page reference.
    // Sticky/fixed elements may not look like a real scrolling session.
    await page.screenshot({
      path: `${OUTPUT}/${name}-${deviceName}-full.png`,
      fullPage: true,
      animations: "allow",
      timeout: 60000,
    });

    console.log("Saved full-page reference");
  } catch (error) {
    console.error(`Failed ${name}/${deviceName}:`, error.message);
  } finally {
    await context.close();
  }
}

try {
  for (const route of routes) {
    for (const [deviceName, device] of Object.entries(devices)) {
      await capture(route.name, route.path, deviceName, device);
    }
  }
} finally {
  await browser.close();
}

console.log("\nCapture process finished.");

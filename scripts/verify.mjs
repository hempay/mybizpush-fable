import { chromium } from "playwright-core";
import os from "os";
import path from "path";
import fs from "fs";

const exec = path.join(
  os.homedir(),
  "Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
);

const BASE = "http://localhost:8088";
const OUT = "/tmp/fable-shots";
fs.mkdirSync(OUT, { recursive: true });

const pages = [
  ["home", "/"],
  ["services", "/services"],
  ["products", "/products"],
  ["privacy", "/privacy"],
  ["terms", "/terms"],
  ["admin", "/admin/consultations"],
  ["404", "/does-not-exist"],
];

const viewports = [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 390, height: 844 }],
];

const browser = await chromium.launch({ executablePath: exec });
const errors = [];

for (const [vpName, vp] of viewports) {
  const context = await browser.newContext({
    viewport: vp,
    isMobile: vpName === "mobile",
    hasTouch: vpName === "mobile",
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`[${vpName}] ${page.url()}: ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`[${vpName}] ${page.url()}: PAGEERROR ${err.message}`));

  for (const [name, route] of pages) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    // wait out the preloader on home
    await page.waitForTimeout(name === "home" ? 4200 : 1200);
    await page.screenshot({ path: `${OUT}/${name}-${vpName}-top.png` });
    // scroll snapshots for the long pages
    if (["home", "services", "products"].includes(name)) {
      const height = await page.evaluate(() => document.body.scrollHeight);
      for (const frac of [0.33, 0.66, 1]) {
        await page.evaluate((y) => window.scrollTo(0, y), Math.floor(height * frac));
        await page.waitForTimeout(1300);
        await page.screenshot({ path: `${OUT}/${name}-${vpName}-${Math.round(frac * 100)}.png` });
      }
    }
  }
  await context.close();
}

await browser.close();
console.log("ERRORS:", errors.length ? "\n" + errors.join("\n") : "none");

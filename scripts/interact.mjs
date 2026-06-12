import { chromium } from "playwright-core";
import os from "os";
import path from "path";

const exec = path.join(
  os.homedir(),
  "Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
);
const BASE = "http://localhost:8088";
const OUT = "/tmp/fable-shots";

const browser = await chromium.launch({ executablePath: exec });
const errors = [];

// --- Desktop: consultation modal + form submit ---
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
page.on("pageerror", (e) => errors.push("PAGEERROR " + e.message));
await page.goto(BASE + "/", { waitUntil: "networkidle" });
await page.waitForTimeout(4500);

await page.getByRole("button", { name: "Start a Project" }).first().click();
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/modal-consultation.png` });
await page.fill("#fullName", "Test User");
await page.fill("#email", "test@example.com");
await page.fill("#phoneNumber", "+2348000000000");
await page.fill("#message", "I need a website for my business.");
await page.click('button[type="submit"]');
await page.waitForTimeout(10000);
const saved = await page.evaluate(() =>
  JSON.parse(localStorage.getItem("consultationRequests") || "[]")
);
console.log("Saved requests:", saved.length, saved[0]?.fullName);
await page.screenshot({ path: `${OUT}/modal-after-submit.png` });

// --- Service modal on /services ---
await page.goto(BASE + "/services", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.getByText("Website Design", { exact: true }).first().click();
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/modal-service.png` });

// --- Admin shows the saved request ---
await page.goto(BASE + "/admin/consultations", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/admin-with-data.png` });
await ctx.close();

// --- Mobile: hamburger menu ---
const mctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  deviceScaleFactor: 2,
});
const mpage = await mctx.newPage();
mpage.on("pageerror", (e) => errors.push("MOBILE PAGEERROR " + e.message));
await mpage.goto(BASE + "/", { waitUntil: "networkidle" });
await mpage.waitForTimeout(4500);
await mpage.click('button[aria-label="Toggle menu"]');
await mpage.waitForTimeout(1200);
await mpage.screenshot({ path: `${OUT}/mobile-menu.png` });
await mctx.close();

await browser.close();
console.log("ERRORS:", errors.length ? errors.join("\n") : "none");

import {copyFileSync, existsSync, mkdirSync} from "node:fs";
import {dirname, join, resolve} from "node:path";
import {spawn} from "node:child_process";
import {fileURLToPath} from "node:url";
import {chromium} from "playwright";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const captures = join(root, "public", "captures");
mkdirSync(captures, {recursive: true});

const hiveDist = process.env.HIVE_RENDERER_DIR ?? "C:\\HIVE\\dist-desktop\\renderer";
const pledgrDist = process.env.PLEDGR_DIST_DIR ?? "C:\\Pledgr\\dist";
const pledgrSite = process.env.PLEDGR_SITE_DIR ?? "C:\\Pledgr\\site";
const hiveDemo = resolve(root, "..", "..", "demo", "the-hive-skill-demo.mp4");

for (const path of [hiveDist, pledgrDist, pledgrSite, hiveDemo]) {
  if (!existsSync(path)) throw new Error(`Required capture source not found: ${path}`);
}
copyFileSync(hiveDemo, join(captures, "hive-demo.mp4"));

const servers = [];
const serve = (directory, port) => {
  const child = spawn("python", ["-m", "http.server", String(port), "--bind", "127.0.0.1", "--directory", directory], {stdio: "ignore", windowsHide: true});
  servers.push(child);
  return `http://127.0.0.1:${port}`;
};
const waitForServer = async (url) => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try { const response = await fetch(url); if (response.ok) return; } catch {}
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
  }
  throw new Error(`Server did not become ready: ${url}`);
};

const hiveUrl = serve(hiveDist, 4175);
const pledgrUrl = serve(pledgrDist, 4176);
const pledgrSiteUrl = serve(pledgrSite, 4177);

try {
  await Promise.all([waitForServer(hiveUrl), waitForServer(pledgrUrl), waitForServer(pledgrSiteUrl)]);
  const browser = await chromium.launch({headless: true});
  try {
    const hivePage = await browser.newPage({viewport: {width: 1440, height: 900}, deviceScaleFactor: 1});
    await hivePage.addInitScript(() => {
      const now = "2026-07-14T07:16:00.000Z";
      const thread = {
        schemaVersion: 1,
        id: "promo-thread",
        title: "Verified engineering loop",
        createdAt: now,
        updatedAt: now,
        archived: false,
        messages: [
          {id: "message-1", role: "user", content: "Inspect, implement, validate, and report with evidence.", createdAt: now},
          {id: "message-2", role: "assistant", content: "Validation complete. Evidence preserved in the final report.", createdAt: now},
        ],
        runs: [{userMessageId: "message-1", codingSessionId: "promo-session", status: "completed", createdAt: now, updatedAt: now}],
      };
      const listeners = new Set();
      window.__emitHivePromo = (event) => listeners.forEach((listener) => listener(event));
      window.hiveDesktop = {
        subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
        async request(command) {
          const base = {timestamp: now, requestId: command.requestId};
          if (command.type === "repository.list") return {...base, type: "repository.listed", repositories: [{path: "C:\\HIVE", lastOpenedAt: now}]};
          if (command.type === "repository.open") return {...base, type: "desktop.ready", repositoryRoot: command.repositoryRoot};
          if (command.type === "thread.list") return {...base, type: "thread.listed", repositoryRoot: "C:\\HIVE", threads: [thread]};
          if (command.type === "thread.load") return {...base, type: "thread.changed", repositoryRoot: "C:\\HIVE", thread};
          if (command.type === "provider.list") return {...base, type: "provider.listed", providers: [{id: "local", name: "Local provider", kind: "local", authType: "none", approved: true, configured: true, defaultModel: "configured-model"}]};
          if (command.type === "git.inspect") return {...base, type: "git.changed", repositoryRoot: "C:\\HIVE", status: {repositoryRoot: "C:\\HIVE", branch: "codex/hive-desktop-companion", head: "local", dirty: true, changedFiles: [], ahead: 0, behind: 0}};
          if (command.type === "run.report") return {...base, type: "run.reported", repositoryRoot: "C:\\HIVE", codingSessionId: "promo-session", report: null};
          if (command.type === "changes.diff") return {...base, type: "changes.diffed", repositoryRoot: "C:\\HIVE", diff: {repositoryRoot: "C:\\HIVE", codingSessionId: "promo-session", patch: "", truncated: false, recordedFiles: [], reviewedFiles: [], commitEligibility: "ineligible"}};
          return {...base, type: "request.completed"};
        },
      };
    });
    await hivePage.goto(hiveUrl, {waitUntil: "networkidle"});
    await hivePage.getByLabel("Repository path").fill("C:\\HIVE");
    await hivePage.getByRole("button", {name: /^Open$/}).click();
    await hivePage.getByText("Verified engineering loop").first().waitFor();
    await hivePage.getByText("Verified engineering loop").first().click();
    await hivePage.screenshot({path: join(captures, "hive-desktop.png")});

    const pledgrPage = await browser.newPage({viewport: {width: 430, height: 900}, deviceScaleFactor: 1.5});
    await pledgrPage.goto(pledgrUrl, {waitUntil: "networkidle"});
    const appText = await pledgrPage.locator("body").innerText();
    if (appText.trim().length < 20) throw new Error("Pledgr web export rendered without readable content.");
    await pledgrPage.screenshot({path: join(captures, "pledgr-app.png")});

    const sitePage = await browser.newPage({viewport: {width: 1440, height: 900}, deviceScaleFactor: 1});
    await sitePage.goto(pledgrSiteUrl, {waitUntil: "networkidle"});
    await sitePage.locator(".phone-demo").screenshot({path: join(captures, "pledgr-site-phone.png")});
  } finally {
    await browser.close();
  }
} finally {
  for (const server of servers) server.kill();
}

/*
 * This file is designed to be executed locally or by an automated process.
 *
 * locally
 * - npm run lighthouse
 * Automated process
 * - pr_impact_on_lighthouse.yml
 *
 * See https://github.com/jsenv/workflow/tree/main/packages/jsenv-lighthouse-impact
 */

import { chromium } from "playwright"
import { pingServer } from "@jsenv/core"
import { runLighthouseOnPlaywrightPage } from "@jsenv/lighthouse-impact"
import { openBrowser } from "./utils/open_browser.js"

const local = process.argv.includes("--local")

// discard logs related to build
process.env.LOG_LEVEL = "warn"
await import(`./build.mjs`)

const buildServerOrigin = "https://player.local.dailymotion.com:8767"
const buildServerStarted = await pingServer(buildServerOrigin)
let buildServerModule
if (!buildServerStarted) {
  process.env.BROWSER = "none"
  buildServerModule = await import("./start_build_server.mjs")
}

const browser = await chromium.launch({
  args: ["--remote-debugging-port=9222", "--ignore-certificate-errors"],
})
const browserContext = await browser.newContext({
  // userAgent: "",
  ignoreHTTPSErrors: true, // prevent a CERT_INVALID error on jsenv self signed certificate
  viewport: {
    width: 640,
    height: 360,
  },
  screen: {
    width: 640,
    height: 360,
  },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 4,
})
const page = await browserContext.newPage()
await page.goto(`${buildServerOrigin}/embed.html?video=x3rdtfy`)

let lighthouseReport
try {
  lighthouseReport = await runLighthouseOnPlaywrightPage(page, {
    chromiumDebuggingPort: 9222,
    runCount: local ? 1 : 2,
    log: true,
    htmlFileUrl: new URL("../.jsenv/lighthouse_report.html", import.meta.url),
    jsonFileUrl: new URL("./.jsenv/lighthouse_report.json", import.meta.url),
  })
  if (process.env.BROWSER !== "none") {
    openBrowser(new URL("../.jsenv/lighthouse_report.html", import.meta.url))
  }
} finally {
  await browserContext.close()
  await browser.close()
  if (buildServerModule) {
    buildServerModule.buildServer.stop()
  }
}

export { lighthouseReport }
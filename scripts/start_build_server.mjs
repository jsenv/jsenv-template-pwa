import { startBuildServer } from "@jsenv/core"
import { requestCertificate } from "@jsenv/https-local"
import { openBrowser } from "./utils/open_browser.js"

const { certificate, privateKey } = requestCertificate()

export const buildServer = await startBuildServer({
  logLevel: process.env.LOG_LEVEL,
  protocol: "https",
  certificate,
  privateKey,
  rootDirectoryUrl: new URL("../", import.meta.url),
  buildDirectoryUrl: new URL("../dist/", import.meta.url),
})

if (process.env.BROWSER !== "none") {
  openBrowser(buildServer.origin)
}

/*
 * This file is designed to be executed locally or by an automated process.
 *
 * To run it locally, use one of
 * - node ./scripts/lighthouse/lighthouse.mjs --local
 * - npm run lighthouse
 *
 * The automated process is a GitHub workflow: ".github/workflows/lighthouse_impact.yml"
 * It will dynamically import this file and call generateLighthouseReport.
 *
 * See https://github.com/jsenv/lighthouse-impact
 */

import { generateLighthouseReport } from "@jsenv/lighthouse-impact"

const local = process.argv.includes("--local")

process.env.LOG_LEVEL = "warn" // discard logs related to build
await import(`../build/build.mjs`)
const { server } = await import(`../build/start_build_server.mjs`)
const lighthouseReport = await generateLighthouseReport(server.origin, {
  runCount: local ? 1 : 2,
  // prevent a CERT_INVALID error thrown by lighthouse
  // on jsenv self signed certificate
  ignoreCertificateErrors: true,
  log: local,
  rootDirectoryUrl: new URL("../../", import.meta.url),
  jsonFileUrl: local ? new URL("./report.json", import.meta.url) : null,
  htmlFileUrl: local ? new URL("./report.html", import.meta.url) : null,
})
server.stop("lighthouse report generated")
export { lighthouseReport }

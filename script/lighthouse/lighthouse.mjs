/*
 * This file is designed to be executed locally or by an automated process.
 *
 * To run it locally, use one of
 * - node ./script/lighthouse/lighthouse.mjs --local
 * - npm run lighthouse
 *
 * The automated process is a GitHub workflow: ".github/workflows/lighthouse_impact.yml"
 * It will dynamically import this file and call generateLighthouseReport.
 *
 * See https://github.com/jsenv/lighthouse-impact
 */

import { generateLighthouseReport } from "@jsenv/lighthouse-impact"

const local = process.argv.includes("--local")

process.env.LOG_LEVEL = "warn"
const { server } = await import(`../build/preview.mjs`)
const lighthouseReport = await generateLighthouseReport(server.origin, {
  runCount: local ? 1 : 2,

  // prevent a CERT_INVALID error thrown by lighthouse
  // on jsenv self signed certificate
  ignoreCertificateErrors: true,
  log: local,
  jsonFile: local,
  htmlFile: local,
  rootDirectoryUrl: new URL("../../", import.meta.url),
  jsonFileRelativeUrl: "./script/lighthouse/lighthouse_report.json",
  htmlFileRelativeUrl: "./script/lighthouse/lighthouse_report.html",
})
server.stop("lighthouse report generated")
export { lighthouseReport }

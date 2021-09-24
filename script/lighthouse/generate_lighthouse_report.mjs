/*
 * This file is designed to be executed locally or by an automated process.
 *
 * To run it locally, use one of
 * - node ./script/lighthouse/generate_lighthouse_report.mjs --local
 * - npm run generate-lighthouse-report
 *
 * The automated process is a GitHub workflow: ".github/workflows/lighthouse_impact.yml"
 * It will dynamically import this file and call generateLighthouseReport.
 *
 * See https://github.com/jsenv/lighthouse-impact
 */

import {
  getLighthouseReportUsingHeadlessChrome,
  logLighthouseReport,
} from "@jsenv/lighthouse-impact"

export const generateLighthouseReport = async ({
  runCount = 4,
  buildLogLevel = "warn",
  serverLogLevel = "warn",
  skipBuild = false,
  jsonFile = false,
  htmlFile = false,
} = {}) => {
  // this function is executed a second time after merging the pull request
  // without the ?cache_busting param, the second execution of the function
  // would not rebuild the project
  if (skipBuild) {
    process.env.LOG_LEVEL = buildLogLevel
    await import(`../build/build.mjs?cache_busting=${Date.now()}`)
  }
  process.env.LOG_LEVEL = serverLogLevel
  const { server } = await import(
    `../start/start_prod_server.mjs?cache_busting=${Date.now()}`
  )

  const lighthouseReport = await getLighthouseReportUsingHeadlessChrome(
    server.origin,
    {
      runCount,
      // prevent a CERT_INVALID error thrown by lighthouse
      // on jsenv self signed certificate
      ignoreCertificateErrors: true,
      jsonFile,
      htmlFile,
      projectDirectoryUrl: new URL("../../", import.meta.url),
      jsonFileRelativeUrl: "./script/lighthouse/lighthouse_report.json",
      htmlFileRelativeUrl: "./script/lighthouse/lighthouse_report.html",
    },
  )

  server.stop("lighthouse report generated")
  return lighthouseReport
}

const executeAndLog = process.argv.includes("--local")
if (executeAndLog) {
  const lighthouseReport = await generateLighthouseReport({
    runCount: 1,
    skipBuild: true,
    jsonFile: true,
    htmlFile: true,
    serverLogLevel: "warn",
  })
  logLighthouseReport(lighthouseReport)
}

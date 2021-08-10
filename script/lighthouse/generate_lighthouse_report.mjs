import {
  getLighthouseReportUsingHeadlessChrome,
  logLighthouseReport,
} from "@jsenv/lighthouse-impact"

export const generateLighthouseReport = async ({
  runCount = 4,
  serverLogLevel = "info",
  jsonFile = false,
  htmlFile = false,
} = {}) => {
  await import("../build/build.mjs")
  process.env.LOG_LEVEL = serverLogLevel
  const { server } = await import("../start/start_prod.mjs")

  const lighthouseReport = await getLighthouseReportUsingHeadlessChrome(server.origin, {
    runCount,
    // prevent a CERT_INVALID error thrown by lighthouse
    // on jsenv self signed certificate
    ignoreCertificateErrors: true,
    jsonFile,
    htmlFile,
    projectDirectoryUrl: new URL("../../", import.meta.url),
    jsonFileRelativeUrl: "./script/lighthouse/lighthouse_report.json",
    htmlFileRelativeUrl: "./script/lighthouse/lighthouse_report.html",
  })

  server.stop("lighthouse report generated")
  return lighthouseReport
}

const executeAndLog = process.argv.includes("--local")
if (executeAndLog) {
  const lighthouseReport = await generateLighthouseReport({
    runCount: 1,
    jsonFile: true,
    htmlFile: true,
    serverLogLevel: "warn",
  })
  logLighthouseReport(lighthouseReport)
}

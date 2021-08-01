import { getLighthouseReportFromHeadlessChrome } from "@jsenv/lighthouse-impact"

export const generateLighthouseReport = async (params = {}) => {
  await import("../build/build.mjs")

  process.env.LOG_LEVEL = "warn"
  process.env.HTTPS = true
  const { server } = await import("../start/start_prod.mjs")

  const lighthouseReport = await getLighthouseReportFromHeadlessChrome(server.origin, {
    projectDirectoryUrl: new URL("../../", import.meta.url),
    runCount: 4,
    // prevent a CERT_INVALID error
    // thrown by lighthouse on jsenv self signed certificate
    ignoreCertificateErrors: true,
    ...params,
  })

  server.stop("lighthouse report generated")

  return lighthouseReport
}

const executeAndLog = process.argv.includes("--log")
if (executeAndLog) {
  const lighthouseReport = await generateLighthouseReport({
    jsonFile: true,
    jsonFileRelativeUrl: "./lighthouse/lighthouse_report.json",
    htmlFile: true,
    htmlFileRelativeUrl: "./lighthouse/lighthouse_report.html",
  })
  const scores = {}
  Object.keys(lighthouseReport.categories).forEach((name) => {
    scores[name] = lighthouseReport.categories[name].score
  })
  console.log(JSON.stringify(scores, null, "  "))
}

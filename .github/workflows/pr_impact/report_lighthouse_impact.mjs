import { reportLighthouseImpact, readGitHubWorkflowEnv } from "@jsenv/lighthouse-impact"

reportLighthouseImpact({
  ...readGitHubWorkflowEnv(),
  // logLevel: 'debug',
  generateLighthouseReportFileRelativeUrl: "./script/lighthouse/generate_lighthouse_report.mjs",
})

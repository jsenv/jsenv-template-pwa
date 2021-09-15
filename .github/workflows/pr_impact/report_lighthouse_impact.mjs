import {
  reportLighthouseImpact,
  readGitHubWorkflowEnv,
} from "@jsenv/lighthouse-impact"

await reportLighthouseImpact({
  ...readGitHubWorkflowEnv(),
  logLevel: "debug",
  moduleGeneratingLighthouseReportRelativeUrl:
    "./script/lighthouse/generate_lighthouse_report.mjs",
})

import {
  reportLighthouseImpact,
  readGitHubWorkflowEnv,
} from "@jsenv/lighthouse-impact"

reportLighthouseImpact({
  ...readGitHubWorkflowEnv(),
  logLevel: "debug",
  moduleGeneratingLighthouseReportRelativeUrl:
    "./script/lighthouse/generate_lighthouse_report.mjs",
})

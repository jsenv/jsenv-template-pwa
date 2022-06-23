/*
 * This file is executed by pr_impact.yml GitHub workflow.
 * - it generates lighthouse report before and after merging a pull request
 * - Then, it creates or updates a comment in the pull request
 * See https://github.com/jsenv/lighthouse-impact
 */

import {
  reportLighthouseImpact,
  readGitHubWorkflowEnv,
} from "@jsenv/lighthouse-impact"

await reportLighthouseImpact({
  ...readGitHubWorkflowEnv(),
  logLevel: "debug",
  lighthouseReportUrl: new URL(
    "../../../scripts/lighthouse/lighthouse.mjs#lighthouseReport",
    import.meta.url,
  ),
})

/*
 * This file is executed by pr_impact.yml GitHub workflow.
 * - it generates lighthouse report before and after merging a pull request
 * - Then, it creates or updates a comment in the pull request
 */

import {
  reportLighthouseImpactInGithubPullRequest,
  readGitHubWorkflowEnv,
} from "@jsenv/lighthouse-impact"

await reportLighthouseImpactInGithubPullRequest({
  ...readGitHubWorkflowEnv(),
  lighthouseReportUrl: new URL(
    "../../../scripts/lighthouse.mjs#lighthouseReport",
    import.meta.url,
  ),
})

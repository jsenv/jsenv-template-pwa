/*
 * This file is executed by pr_impact.yml GitHub workflow.
 * - it generates file size report before and after merging a pull request
 * - Then, it creates or updates a comment in the pull request
 * See https://github.com/jsenv/file-size-impact
 */

import {
  reportFileSizeImpact,
  readGitHubWorkflowEnv,
} from "@jsenv/file-size-impact"

await reportFileSizeImpact({
  ...readGitHubWorkflowEnv(),
  buildCommand: "npm run dist",
  moduleGeneratingFileSizeReportRelativeUrl:
    "./script/file_size/generate_file_size_report.mjs",
})

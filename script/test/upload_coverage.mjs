/*
 * This file is executed by "upload coverage" step in .github/workflows/main.yml.
 * After test execution, coverage is written in a file at coverage/coverage.json.
 * This file will upload this coverage_final.json to codecov.io.
 * See https://github.com/jsenv/jsenv-template-node-package/blob/main/docs/coverage/coverage.md#coverage
 */

import { uploadCoverage } from "@jsenv/codecov-upload"

import { projectDirectoryUrl } from "../../jsenv.config.mjs"

await uploadCoverage({
  projectDirectoryUrl,
  coverageJsonFileRelativeUrl: "coverage/coverage.json",
})

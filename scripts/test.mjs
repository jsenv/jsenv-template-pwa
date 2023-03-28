/*
 * This file uses "@jsenv/core" to execute all test files.
 * See https://github.com/jsenv/jsenv-core/blob/master/docs/testing/readme.md#jsenv-test-runner
 */

import { executeTestPlan, chromium, firefox } from "@jsenv/core"

await executeTestPlan({
  testDirectoryUrl: new URL("../src/", import.meta.url),
  testPlan: {
    "./**/*.test.html": {
      chromium: {
        runtime: chromium,
      },
      firefox: {
        runtime: firefox,
      },
    },
  },
  devServerOrigin: "https://localhost:3472",
  devServerModuleUrl: new URL("./dev.mjs", import.meta.url),
  coverageEnabled: process.argv.includes("--coverage"),
  coverageReportJsonFileUrl: "./.coverage/coverage.json",
  coverageMethodForBrowsers: "istanbul",
})

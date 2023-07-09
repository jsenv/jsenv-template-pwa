/*
 * This file uses "@jsenv/core" to execute all test files.
 * See https://github.com/jsenv/jsenv-core/blob/master/docs/testing/readme.md#jsenv-test-runner
 */

import { executeTestPlan, chromium, firefox } from "@jsenv/test"

await executeTestPlan({
  rootDirectoryUrl: new URL("../", import.meta.url),
  testPlan: {
    "./src/**/*.test.html": {
      chromium: {
        runtime: chromium(),
      },
      firefox: {
        runtime: firefox(),
      },
    },
  },
  webServer: {
    origin: "https://localhost:3472",
    rootDirectoryUrl: new URL("../src/", import.meta.url),
    moduleUrl: new URL("./dev.mjs", import.meta.url),
  },
  coverageEnabled: process.argv.includes("--coverage"),
  coverageReportJson: true,
  coverageReportJsonFileUrl: new URL(
    "../.coverage/coverage.json",
    import.meta.url,
  ),
  coverageMethodForBrowsers: "istanbul",
})

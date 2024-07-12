/*
 * This file uses "@jsenv/core" to execute all test files.
 * See https://github.com/jsenv/jsenv-core/blob/master/docs/testing/readme.md#jsenv-test-runner
 */

import {
  executeTestPlan,
  chromium,
  firefox,
  reportCoverageAsJson,
} from "@jsenv/test"

const testPlanResult = await executeTestPlan({
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
  coverage: process.argv.includes("--coverage")
    ? {
        methodForBrowsers: "istanbul",
      }
    : null,
})

if (process.argv.includes("--coverage")) {
  reportCoverageAsJson(
    testPlanResult,
    new URL("../.coverage/coverage.json", import.meta.url),
  )
}

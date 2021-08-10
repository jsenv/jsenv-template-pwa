/*
 * This file uses "@jsenv/core" to execute all test files.
 * See https://github.com/jsenv/jsenv-core/blob/master/docs/testing/readme.md#jsenv-test-runner
 */

import { executeTestPlan, launchChromiumTab } from "@jsenv/core"

import * as jsenvConfig from "../../jsenv.config.mjs"

executeTestPlan({
  ...jsenvConfig,
  testPlan: {
    "./test/**/*.test.html": {
      browser: {
        launch: launchChromiumTab,
      },
    },
  },
  coverageJsonFileRelativeUrl: "coverage/coverage.json",
})

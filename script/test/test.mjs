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
})

import { executeTestPlan, launchChromiumTab } from "@jsenv/core"
import * as jsenvConfig from "../../jsenv.config.js"

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

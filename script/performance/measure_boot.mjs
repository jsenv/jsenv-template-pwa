import { execute, chromium } from "@jsenv/core"

import { rootDirectoryUrl } from "@jsenv/template-pwa/jsenv.config.mjs"

const executionResult = await execute({
  rootDirectoryUrl,
  fileRelativeUrl: "./src/main.html",
  runtime: chromium,
  collectPerformance: true,
})
const { measures } = executionResult.performance
const metrics = {}
Object.keys(measures).forEach((measureName) => {
  if (measureName.startsWith("jsenv_")) {
    // filter out jsenv metrics
    return
  }
  metrics[measureName] = { value: measures[measureName], unit: "ms" }
})

export const bootMetrics = metrics

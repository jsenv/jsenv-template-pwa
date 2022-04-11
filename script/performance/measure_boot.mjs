import { execute, chromium } from "@jsenv/core"

import * as jsenvConfig from "../../jsenv.config.mjs"

const executionResult = await execute({
  ...jsenvConfig,
  runtime: chromium,
  fileRelativeUrl: "./src/main.html",
  // measurePerformance: true,
  // compileServerCanWriteOnFilesystem: false,
  collectPerformance: true,
  stopAfterExecute: true,
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

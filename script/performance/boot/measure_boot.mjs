import { execute, launchChromium } from "@jsenv/core"
import {
  measurePerformanceMultipleTimes,
  computeMetricsMedian,
  logPerformanceMetrics,
} from "@jsenv/performance-impact"

import { projectDirectoryUrl } from "../../../jsenv.config.mjs"

export const measureBoot = async ({ iterations = 3 } = {}) => {
  const metrics = await measurePerformanceMultipleTimes(
    async () => {
      const executionResult = await execute({
        projectDirectoryUrl,
        launch: launchChromium,
        fileRelativeUrl: "./main.html",
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
      return metrics
    },
    iterations,
    { msToWaitBetweenEachMeasure: 100 },
  )
  return computeMetricsMedian(metrics)
}

const executeAndLog = process.argv.includes("--local")
if (executeAndLog) {
  const performanceMetrics = await measureBoot({ iterations: 1 })
  logPerformanceMetrics(performanceMetrics)
}

/*
 * This file is designed to be executed locally or by an automated process.
 *
 * To run it locally, use one of
 * - node ./script/performance/generate_performance_report.mjs --local
 * - npm run measure-performances
 *
 * The automated process is a GitHub workflow: ".github/workflows/performance_impact.yml"
 * It will dynamically import this file and call generatePerformanceReport.
 *
 * generatePerformanceReport is collecting all performance.measure() calls
 * done during execution of main.html.
 * The performance measures are done on dev files, it means they do not 100% represent
 * the measure you would have on files after build.
 * All performance.measure calls are removed by tree-shaking during the build
 *
 * See https://github.com/jsenv/performance-impact
 */

import { importMetricFromFiles } from "@jsenv/performance-impact"

const { bootMetrics } = await importMetricFromFiles({
  directoryUrl: new URL("./", import.meta.url),
  metricsDescriptions: {
    bootMetrics: {
      file: "./measure_boot.mjs#bootMetrics",
      iterations: process.argv.includes("--once") ? 1 : 7,
      msToWaitBetweenEachIteration: 500,
    },
  },
  logLevel: process.argv.includes("--log") ? "info" : "warn",
})

export const performanceReport = {
  "boot metrics": {
    ...bootMetrics,
  },
}

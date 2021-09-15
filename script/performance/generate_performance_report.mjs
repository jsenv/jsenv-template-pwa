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
 * generatePerformanceReport is measuring:
 * - Time and memory used to import @jsenv/template-node-package
 * - Size and number of files inside the npm tarball that would be published on npm
 *
 * See https://github.com/jsenv/performance-impact
 */

export const generatePerformanceReport = async () => {
  const { measureBoot } = await import("./boot/measure_boot.mjs")

  const bootMetrics = await measureBoot()

  return {
    groups: {
      boot: bootMetrics,
    },
  }
}

const executeAndLog = process.argv.includes("--local")
if (executeAndLog) {
  await import("./boot/measure_boot.mjs")
}

/*
 * This file is designed to be executed locally or by an automated process.
 *
 * To run it locally, use one of
 * - node ./script/file_size/generate_file_size_report.mjs --local
 * - npm run measure-file-sizes
 *
 * The automated process is a GitHub workflow: ".github/workflows/file_size_impact.yml"
 * It will dynamically import this file and call generateFileSizeReport.
 *
 * See https://github.com/jsenv/file-size-impact
 */

import {
  getFileSizeReport,
  raw,
  gzip,
  logFileSizeReport,
} from "@jsenv/file-size-impact"

import { projectDirectoryUrl } from "../../jsenv.config.mjs"

export const generateFileSizeReport = async () => {
  return getFileSizeReport({
    projectDirectoryUrl,
    transformations: { raw, gzip },
    trackingConfig: {
      script: {
        "./dist/systemjs/**/*.js": true,
        "./dist/systemjs/**/*.jsx": true,
        "./dist/systemjs/**/*.map": false,
      },
      style: {
        "./dist/systemjs/**/*.css": true,
        "./dist/systemjs/**/*.map": false,
      },
      image: {
        "./dist/systemjs/**/*.png": true,
        "./dist/systemjs/**/*.jpg": true,
        "./dist/systemjs/**/*.jpeg": true,
        "./dist/systemjs/**/*.gif": true,
        "./dist/systemjs/**/*.svg": true,
      },
      other: {
        "./dist/systemjs/**/*": true,
        "./dist/systemjs/**/*.map": false,
        "./dist/systemjs/**/*.js": false,
        "./dist/systemjs/**/*.jsx": false,
        "./dist/systemjs/**/*.css": false,
        "./dist/systemjs/**/*.png": false,
        "./dist/systemjs/**/*.jpg": false,
        "./dist/systemjs/**/*.jpeg": false,
        "./dist/systemjs/**/*.gif": false,
        "./dist/systemjs/**/*.svg": false,
      },
    },
    manifestConfig: {
      "./dist/**/asset-manifest.json": true,
    },
  })
}

const executeAndLog = process.argv.includes("--local")
if (executeAndLog) {
  const fileSizeReport = await generateFileSizeReport()
  logFileSizeReport(fileSizeReport)
}

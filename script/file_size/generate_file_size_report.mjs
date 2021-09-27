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
  const booting = {
    "./dist/systemjs/main.prod.html": true,
    "./dist/systemjs/app_loader-*.js": true,
    "./dist/systemjs/assets/app_loader-*.css": true,
    "./dist/systemjs/assets/roboto_v27_latin_regular-*.woff": true,
  }
  const app = {
    "./dist/systemjs/**/*": true,
    "./dist/systemjs/**/*.map": false,
    ...revertTrackingGroup(booting),
  }

  return getFileSizeReport({
    projectDirectoryUrl,
    transformations: { raw, gzip },
    trackingConfig: { booting, app },
    manifestConfig: {
      "./dist/**/asset-manifest.json": true,
    },
  })
}

const revertTrackingGroup = (trackingGroup) => {
  const opposite = {}
  Object.keys(trackingGroup).forEach((pattern) => {
    opposite[pattern] = !trackingGroup[pattern]
  })
  return opposite
}

const executeAndLog = process.argv.includes("--local")
if (executeAndLog) {
  const fileSizeReport = await generateFileSizeReport()
  logFileSizeReport(fileSizeReport)
}

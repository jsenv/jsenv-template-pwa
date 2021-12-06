/*
 * This file uses "@jsenv/core" to convert source files into systemjs format
 * and write them into "./dist/" directory.
 *
 * Read more at https://github.com/jsenv/jsenv-core/blob/master/docs/building/readme.md#jsenv-build
 */

import { buildProject, jsenvServiceWorkerFinalizer } from "@jsenv/core"
import { copyFileSystemNode, resolveUrl } from "@jsenv/filesystem"

import * as jsenvConfig from "../../jsenv.config.mjs"

await buildProject({
  ...jsenvConfig,
  buildDirectoryRelativeUrl: "./dist/systemjs/",
  format: "systemjs",
  buildDirectoryClean: true,
  entryPointMap: {
    "./src/main.html": "./main.prod.html",
  },
  urlMappings: {
    "./src/dev.importmap": "./src/prod.importmap",
  },
  serviceWorkers: {
    "./src/service_worker.js": "./service_worker.js",
  },
  serviceWorkerFinalizer: jsenvServiceWorkerFinalizer,
  minify: true,
  logLevel: process.env.LOG_LEVEL,
  assetManifestFile: true,
  assetManifestFileRelativeUrl: "asset-manifest.json",
})

const robotsProjectFileUrl = resolveUrl(
  "src/robots.txt",
  jsenvConfig.projectDirectoryUrl,
)
const buildDirectoryUrl = resolveUrl(
  "dist/systemjs/",
  jsenvConfig.projectDirectoryUrl,
)
const robotsBuildFileUrl = resolveUrl("robots.txt", buildDirectoryUrl)
await copyFileSystemNode({ from: robotsProjectFileUrl, to: robotsBuildFileUrl })

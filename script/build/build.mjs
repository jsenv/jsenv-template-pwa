import { buildProject, jsenvServiceWorkerFinalizer } from "@jsenv/core"
import { copyFileSystemNode, resolveUrl } from "@jsenv/util"

import * as jsenvConfig from "../../jsenv.config.mjs"

await buildProject({
  ...jsenvConfig,
  buildDirectoryRelativeUrl: "./dist/systemjs/",
  format: "systemjs",
  systemJsUrl: "/node_modules/systemjs/dist/s.js",
  buildDirectoryClean: true,
  entryPointMap: {
    "./main.html": "./main.prod.html",
  },
  serviceWorkers: {
    "./service_worker.js": "./service_worker.js",
  },
  serviceWorkerFinalizer: jsenvServiceWorkerFinalizer,
  // disable preserveEntrySignatures otherwise an empty (and useless) file is generated
  // as main js entry point
  preserveEntrySignatures: false,
  minify: true,
  assetManifestFile: true,
  assetManifestFileRelativeUrl: "asset-manifest.json",
})

const robotsProjectFileUrl = resolveUrl("robots.txt", jsenvConfig.projectDirectoryUrl)
const buildDirectoryUrl = resolveUrl("dist/systemjs/", jsenvConfig.projectDirectoryUrl)
const robotsBuildFileUrl = resolveUrl("robots.txt", buildDirectoryUrl)
await copyFileSystemNode(robotsProjectFileUrl, robotsBuildFileUrl)

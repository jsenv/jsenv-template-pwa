/*
 * This file uses "@jsenv/core" to convert source files into systemjs format
 * and write them into "./dist/" directory.
 *
 * Read more at https://github.com/jsenv/jsenv-core/blob/master/docs/building/readme.md#jsenv-build
 */

import { build } from "@jsenv/core"
import { copyEntry } from "@jsenv/filesystem"

import { rootDirectoryUrl, runtimeSupport } from "../../jsenv.config.mjs"

const buildDirectoryUrl = new URL("./dist/", rootDirectoryUrl)
await build({
  rootDirectoryUrl,
  buildDirectoryUrl,
  runtimeSupport,
  buildDirectoryClean: true,
  entryPoints: {
    "./src/main.html": "main.prod.html",
  },
  minify: true,
  logLevel: process.env.LOG_LEVEL,
  assetManifestFile: true,
  assetManifestFileRelativeUrl: "asset-manifest.json",
})
const robotsFileUrl = new URL("src/robots.txt", rootDirectoryUrl)
const robotsBuildFileUrl = new URL("robots.txt", buildDirectoryUrl)
await copyEntry({ from: robotsFileUrl, to: robotsBuildFileUrl })

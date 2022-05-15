/*
 * This file uses "@jsenv/core" to convert source files into systemjs format
 * and write them into "./dist/" directory.
 *
 * Read more at https://github.com/jsenv/jsenv-core/blob/master/docs/building/readme.md#jsenv-build
 */

import { build } from "@jsenv/core"
import { copyEntry } from "@jsenv/filesystem"

import { rootDirectoryUrl, runtimeCompat } from "../../jsenv.config.mjs"

await build({
  logLevel: process.env.LOG_LEVEL,
  rootDirectoryUrl,
  buildDirectoryUrl: new URL("./dist/", rootDirectoryUrl),
  runtimeCompat,
  buildDirectoryClean: true,
  entryPoints: {
    "./src/main.html": "main.html",
  },
  // minification is disabled to make build files readable as it can
  // help to understand what is going on while discovering this project template.
  // In the real project you likely want to re-enable minification
  minification: false,
  assetManifestFile: true,
  assetManifestFileRelativeUrl: "asset-manifest.json",
})
await copyEntry({
  from: new URL("src/robots.txt", rootDirectoryUrl),
  to: new URL("dist/robots.txt", rootDirectoryUrl),
})

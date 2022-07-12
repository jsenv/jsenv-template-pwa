/*
 * This file uses "@jsenv/core" to optimize source files and write them into "./dist/" directory.
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
    "./src/main.html": "index.html",
  },
  baseUrl: process.argv.includes("--prod") ? "/jsenv-template-pwa/" : "/",
  // minification is disabled (except for prod) to help discover what is generated
  // during build by this project template.
  // In the real project you likely want to keep minification all the time
  // to test the files as they will be in production
  minification: process.argv.includes("--prod"),
  sourcemaps: !process.argv.includes("--prod"),
  assetManifestFile: true,
  assetManifestFileRelativeUrl: "asset-manifest.json",
  watch: process.argv.includes("--watch"),
})

await copyEntry({
  from: new URL("src/robots.txt", rootDirectoryUrl),
  to: new URL("dist/robots.txt", rootDirectoryUrl),
})

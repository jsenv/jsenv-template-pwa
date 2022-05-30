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
  rootDirectoryUrl,
  buildDirectoryUrl: new URL("./dist/", rootDirectoryUrl),
  runtimeCompat,
  buildDirectoryClean: true,
  entryPoints: {
    "./src/main.html": "index.html",
  },
  baseUrl: process.argv.includes("--prod") ? "/jsenv-template-pwa/" : "/",
  // minification is disabled during preview to help discover what is generated
  // during build by this project template.
  // In the real project you likely want to keep minification during preview
  minification: !process.argv.includes("--preview"),
  sourcemaps: process.argv.includes("--lighthouse"),
  assetManifestFile: true,
  assetManifestFileRelativeUrl: "asset-manifest.json",
})
await copyEntry({
  from: new URL("src/robots.txt", rootDirectoryUrl),
  to: new URL("dist/robots.txt", rootDirectoryUrl),
})

/*
 * This file uses "@jsenv/core" to optimize source files and write them into "./dist/" directory.
 *
 * Read more at https://github.com/jsenv/jsenv-core/blob/master/docs/building/readme.md#jsenv-build
 */

import { build } from "@jsenv/core"
import { jsenvPluginBundling } from "@jsenv/plugin-bundling"
import { jsenvPluginMinification } from "@jsenv/plugin-minification"
import { copyEntry } from "@jsenv/filesystem"

await build({
  logLevel: process.env.LOG_LEVEL,
  sourceDirectoryUrl: new URL("../src/", import.meta.url),
  entryPoints: {
    "./main.html": "index.html",
  },
  buildDirectoryUrl: new URL("../dist/", import.meta.url),
  base: process.argv.includes("--prod") ? "/jsenv-template-pwa/" : "/",
  runtimeCompat: {
    chrome: "64",
    edge: "79",
    firefox: "67",
    safari: "11.3",
  },
  plugins: [
    jsenvPluginBundling({
      js_module: {
        chunks: {
          vendors: { "file://**/node_modules/": true },
        },
      },
    }),
    // minification is disabled (except for prod) to help discover what is generated
    // during build by this project template.
    // In the real project you likely want to keep minification all the time
    // to test the files as they will be in production
    ...(process.argv.includes("--prod") ? [jsenvPluginMinification()] : []),
  ],
  sourcemaps: !process.argv.includes("--prod"),
  watch: process.argv.includes("--watch"),
})

await copyEntry({
  from: new URL("../src/robots.txt", import.meta.url),
  to: new URL("../dist/robots.txt", import.meta.url),
})

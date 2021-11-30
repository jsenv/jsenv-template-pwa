/*
 * When this file is executed it generates import maps with the following mappings:
 * - mappings required for the browser to mimic node ESM resolution algorithm
 * - mappings to remap "#env" either to "./env.dev.js" or "./env.prod.js"
 *
 * It write 2 importmap files, the one to use in your HTML file depends how you want to execute your code.
 * dev.importmap -> execute code in development mode, with "devDependencies"
 * prod.importmap -> execute code in production mode, without "devDependencies"
 * see https://github.com/jsenv/jsenv-template-pwa/tree/main/docs/production_mode#how-to-use-production-mode
 * and https://github.com/jsenv/importmap-node-module#writeimportmapfiles
 *
 * It also update "paths" in "./jsconfig.json" file that is used by VSCode to resolve imports
 */

import { writeImportMapFiles } from "@jsenv/importmap-node-module"

import { projectDirectoryUrl } from "../../jsenv.config.mjs"

await writeImportMapFiles({
  projectDirectoryUrl,
  importMapFiles: {
    "./dev.importmap": {
      mappingsForNodeResolution: true,
      mappingsForDevDependencies: true,
      packageUserConditions: ["development"],
      manualImportMap: {
        imports: {
          "root/": "./",
          "#env": "./env.dev.js",
        },
      },
      useForJsConfigJSON: true,
    },
    "./prod.importmap": {
      mappingsForNodeResolution: true,
      packageUserConditions: ["production"],
      manualImportMap: {
        imports: {
          "root/": "./",
          "#env": "./env.prod.js",
        },
      },
      removeUnusedMappings: true,
    },
  },
})

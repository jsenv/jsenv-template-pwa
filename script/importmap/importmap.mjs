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

const sharedParameters = {
  runtime: "browser",
  mappingsForNodeResolution: true,
  manualImportMap: {
    imports: {
      "#env": "./src/env_dev.js",
      "root/": "./",
    },
  },
  entryPointsToCheck: ['./src/boot/boot.js']
}

await writeImportMapFiles({
  projectDirectoryUrl,
  importMapFiles: {
    "./src/dev.importmap": {
      ...sharedParameters,
      packageUserConditions: ["development"],
      removeUnusedMappings: true,
    },
    "./src/prod.importmap": {
      ...sharedParameters,
      manualImportMap: {
        imports: {
          ...sharedParameters.manualImportMap.imports,
          "#env": "./src/env_prod.js",
        },
        scopes: sharedParameters.manualImportMap.scopes,
      },
      packageUserConditions: ["production"],
      removeUnusedMappings: true,
    },
    "./test/test.importmap": {
      ...sharedParameters,
      mappingsForDevDependencies: true,
    },
    "./eslint.importmap": {
      ...sharedParameters,
      mappingsForDevDependencies: true,
      useForJsConfigJSON: true,
    },
  },
})

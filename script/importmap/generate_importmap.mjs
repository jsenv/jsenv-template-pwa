/*
 * When this file is executed it generates import maps with the following mappings:
 * - mappings from "./project.importmap"
 * - mappings required for the browser to mimic node ESM resolution algorithm
 * - mappings to remap "#env" either to "./env.dev.js" or "./env.prod.js"
 *
 * It write 3 importmap files, the one to use in your HTML file depends how you want to execute your code.
 * importmap.prod.importmap -> execute code in production mode, without "devDependencies"
 * importmap.dev.importmap -> execute code in development mode, with "devDependencies"
 * importmap.prod.test.importmap -> execute code production mode, with "devDependencies"
 * see https://github.com/jsenv/jsenv-template-pwa/blob/main/docs/production_mode/production_mode.md#how-to-use-production-mode
 *
 * It also update "paths" in "./jsconfig.json" file that is used by VSCode to resolve imports
 */

import { getImportMapFromProjectFiles, writeImportMapFile } from "@jsenv/importmap-node-module"

import { projectDirectoryUrl } from "../../jsenv.config.mjs"

const generateFile = async (importMapFileRelativeUrl, { dev, ...rest } = {}) => {
  await writeImportMapFile(
    [
      getImportMapFromProjectFiles({
        projectDirectoryUrl,
        dev,
        initialImportMap: {
          imports: {
            "#env": dev ? "./env.dev.js" : "./env.prod.js",
          },
        },
        ...rest,
      }),
    ],
    {
      projectDirectoryUrl,
      importMapFileRelativeUrl,
      jsConfigFile: dev,
    },
  )
}

generateFile("importmap.prod.importmap", {
  dev: false,
})
generateFile("importmap.dev.importmap", {
  dev: true,
})
generateFile("importmap.prod.test.importmap", {
  // we need dev dependencies for tests
  projectPackageDevDependenciesIncluded: true,
  // This importmap is generated for test files, no need to parse project files
  jsFilesParsing: false,
  // we want to favor "production" over "development" in package exports
  packageConditionDevelopment: false,
})

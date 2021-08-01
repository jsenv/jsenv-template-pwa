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
  // and avoid parsing js files are tests would not be found
  // also we want to favor "production" over "development" in package exports
  projectPackageDevDependenciesIncluded: true,
  treeshakeMappings: false,
  packageConditionDevelopment: false,
})

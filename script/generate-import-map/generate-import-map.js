import {
  generateImportMapForProject,
  getImportMapFromNodeModules,
  getImportMapFromFile,
} from "@jsenv/node-module-import-map"
import { projectDirectoryUrl } from "../../jsenv.config.js"

const generateFile = async (
  importMapFileRelativeUrl,
  { packageIncludedPredicate, includeDevDependencies = false } = {},
) => {
  await generateImportMapForProject(
    [
      getImportMapFromNodeModules({
        projectDirectoryUrl,
        packageIncludedPredicate,
        projectPackageDevDependenciesIncluded: includeDevDependencies,
      }),
      getImportMapFromFile(new URL("./importmap.project.importmap", projectDirectoryUrl)),
    ],
    {
      projectDirectoryUrl,
      importMapFileRelativeUrl,
      jsConfigFile: includeDevDependencies,
    },
  )
}

generateFile("importmap.prod.importmap", {
  packageIncludedPredicate: ({ packageName }) => {
    return !["@jsenv/server"].includes(packageName)
  },
})
generateFile("importmap.dev.importmap", {
  includeDevDependencies: true,
})

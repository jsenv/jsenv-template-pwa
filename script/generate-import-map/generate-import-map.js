import { getImportMapFromProjectFiles, writeImportMapFile } from "@jsenv/node-module-import-map"
import { projectDirectoryUrl } from "../../jsenv.config.js"

const generateFile = async (importMapFileRelativeUrl, { dev } = {}) => {
  await writeImportMapFile(
    [
      getImportMapFromProjectFiles({
        projectDirectoryUrl,
        dev,
      }),
    ],
    {
      projectDirectoryUrl,
      importMapFileRelativeUrl,
      jsConfigFile: dev,
      jsConfigBase: {
        jsx: "react",
      },
    },
  )
}

generateFile("importmap.prod.importmap", {
  dev: false,
})
generateFile("importmap.dev.importmap", {
  dev: true,
})

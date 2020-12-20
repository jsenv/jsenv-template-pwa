const { pathToFileURL } = require("url")
const { createEslintConfig } = require("@jsenv/eslint-config")

const config = createEslintConfig({
  projectDirectoryUrl: new URL("../", pathToFileURL(__dirname)),

  importResolutionMethod: "import-map",
  importMapFileRelativeUrl: "./import-map.importmap",

  browser: false,
  node: true,
  prettier: true,
})

module.exports = config

/* globals __dirname, require, module */
/**
 * Eslint does not support esmodule in the config file. For that reason
 * this file ends with the .cjs extension.
 *
 * This file uses eslint config from "@jsenv/eslint-config"
 * And configure some params.
 */

const { createEslintConfig } = require("@jsenv/eslint-config")

const config = createEslintConfig({
  projectDirectoryUrl: __dirname,

  importResolutionMethod: "import-map",
  importMapFileRelativeUrl: "./import-map.importmap",

  // "node" and "browser" params tells ESLint where our files will be executed.
  // ESLint will configure the available global variables according to this param.
  // Here it means ESLint could report an error like "global" is not defined
  // but not "window" is not defined.
  browser: true,
  node: false,

  // prettier param tells we are using prettier. It will disable all eslint rules
  // already handled by prettier.
  prettier: true,
})

module.exports = config

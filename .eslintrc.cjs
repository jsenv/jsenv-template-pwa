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
  importMapFileRelativeUrl: "./importmap.dev.importmap",

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

// tell to ESLint which files are for Node.js
const importResolverSettings = config.settings["import/resolver"]
const importResolverPath = Object.keys(importResolverSettings)[0]
config.overrides = [
  {
    files: ["script/**/*.js", ".github/**/*.js"],
    env: {
      browser: false,
      es6: true,
      node: true,
    },
    settings: {
      "import/resolver": {
        [importResolverPath]: {
          node: true,
          browser: false,
        },
      },
    },
  },
]

module.exports = config

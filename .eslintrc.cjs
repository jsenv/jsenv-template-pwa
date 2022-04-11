/*
 * This file uses "@jsenv/eslint-config" to configure ESLint
 * https://github.com/jsenv/eslint-config#eslint-config----
 */

const {
  composeEslintConfig,
  eslintConfigBase,
  eslintConfigForPrettier,
  eslintConfigToPreferExplicitGlobals,
  jsenvEslintRules,
  jsenvEslintRulesForImport,
} = require("@jsenv/eslint-config")

const eslintConfig = composeEslintConfig(
  eslintConfigBase,

  // enable top level await
  {
    parserOptions: {
      ecmaVersion: 2022,
    },
  },

  // use "@babel/eslint-parser" until import assertions is supported natively by ESLint
  {
    parser: "@babel/eslint-parser",
    parserOptions: {
      requireConfigFile: false,
    },
  },

  // Files in this repository are meant to be executed in browser
  // and we want to tell this to ESLint.
  // As a result ESLint can consider `global` as undefined
  // and `window` as an existing global variable.
  {
    env: {
      browser: true,
    },
  },

  // Reuse jsenv eslint rules
  {
    rules: {
      ...jsenvEslintRules,
      // Example of code changing the ESLint configuration to enable a rule:
      // 'prefer-const':  ['error']
    },
  },

  // Enable import plugin
  {
    plugins: ["import"],
    settings: {
      "import/resolver": {
        "@jsenv/eslint-import-resolver": {
          rootDirectoryUrl: __dirname,
        },
      },
    },
    rules: jsenvEslintRulesForImport,
  },

  // Enable HTML plugin
  {
    plugins: ["html"],
    settings: {
      extensions: [".html"],
    },
  },

  // tell to ESLint which files are for Node.js in ESM
  {
    overrides: [
      {
        files: ["**/*.mjs"],
        env: {
          browser: false,
          node: true,
        },
        globals: {
          __filename: "off",
          __dirname: "off",
          require: "off",
          exports: "off",
        },
        settings: {
          "import/resolver": {
            "@jsenv/eslint-import-resolver": {
              rootDirectoryUrl: __dirname,
              packageConditions: ["node", "import"],
            },
          },
        },
      },
    ],
  },

  // tell to ESLint which files are for Node.js in CommonJS
  {
    overrides: [
      {
        files: ["**/*.cjs"],
        env: {
          browser: false,
          node: true,
        },
        // inside *.cjs files. restore commonJS "globals"
        globals: {
          __filename: true,
          __dirname: true,
          require: true,
          exports: true,
        },
        // inside *.cjs files, use commonjs module resolution
        settings: {
          "import/resolver": {
            "@jsenv/eslint-import-resolver": {
              rootDirectoryUrl: __dirname,
              packageConditions: ["node", "require"],
            },
          },
        },
      },
    ],
  },

  eslintConfigToPreferExplicitGlobals,

  // We are using prettier, disable all eslint rules
  // already handled by prettier.
  eslintConfigForPrettier,
)

module.exports = eslintConfig

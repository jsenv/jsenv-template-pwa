/*
 * This file uses "@jsenv/core" to start a development server.
 * https://github.com/jsenv/jsenv-core/blob/master/docs/exploring/readme.md#jsenv-dev-server
 *
 */

import { startExploring } from "@jsenv/core"

import * as jsenvConfig from "../../jsenv.config.mjs"

export const server = await startExploring({
  ...jsenvConfig,
  compileServerPort: 3472,
  explorableConfig: {
    "app": {
      "./main.html": true,
    },
    "unit tests": {
      "test/**/*.test.html": true,
    },
  },
})

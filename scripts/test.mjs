/*
 * This file uses "@jsenv/core" to execute all test files.
 * See https://github.com/jsenv/jsenv-core/blob/master/docs/testing/readme.md#jsenv-test-runner
 */

import { pingServer, executeTestPlan, chromium, firefox } from "@jsenv/core"

const devServerOrigin = "https://localhost:3472"
const devServerStarted = await pingServer(devServerOrigin)
let devServerModule
if (!devServerStarted) {
  devServerModule = await import("./start_dev_server.mjs")
}

try {
  await executeTestPlan({
    rootDirectoryUrl: new URL("../", import.meta.url),
    devServerOrigin,
    testPlan: {
      "./tests/**/*.test.html": {
        chromium: {
          runtime: chromium,
        },
        firefox: {
          runtime: firefox,
        },
      },
    },
    coverage: process.argv.includes("--coverage"),
    coverageJsonFileRelativeUrl: "./.coverage/coverage.json",
    coverageForceIstanbul: true,
  })
} finally {
  if (devServerModule) {
    devServerModule.devServer.stop()
  }
}

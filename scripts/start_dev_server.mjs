/*
 * This file uses "@jsenv/core" to start a development server.
 * https://github.com/jsenv/jsenv-core/tree/master/docs/dev_server#jsenv-dev-server
 */

import open from "open"
import { startDevServer } from "@jsenv/core"
import { requestCertificate } from "@jsenv/https-local"

const { certificate, privateKey } = requestCertificate()

export const devServer = await startDevServer({
  rootDirectoryUrl: new URL("../", import.meta.url),
  port: 3472,
  https: { certificate, privateKey },
  explorer: {
    groups: {
      app: {
        "./src/main.html": true,
      },
      tests: {
        "test/**/*.test.html": true,
      },
    },
  },
})

if (process.argv.includes("--open")) {
  open(`${devServer.origin}/src/main.html`)
}

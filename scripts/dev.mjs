/*
 * This file uses "@jsenv/core" to start a development server.
 * https://github.com/jsenv/jsenv-core/tree/master/docs/dev_server#jsenv-dev-server
 */

import open from "open"
import { startDevServer } from "@jsenv/core"
import { jsenvPluginExplorer } from "@jsenv/plugin-explorer"
import { requestCertificate } from "@jsenv/https-local"

const { certificate, privateKey } = requestCertificate()

export const devServer = await startDevServer({
  sourceDirectoryUrl: new URL("../src/", import.meta.url),
  port: 3472,
  https: { certificate, privateKey },
  plugins: [
    jsenvPluginExplorer({
      groups: {
        app: {
          "./main.html": true,
        },
        tests: {
          "./**/*.test.html": true,
        },
      },
    }),
  ],
})

if (process.argv.includes("--open")) {
  open(`${devServer.origin}/main.html`)
}

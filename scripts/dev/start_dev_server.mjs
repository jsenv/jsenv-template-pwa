/*
 * This file uses "@jsenv/core" to start a development server.
 * https://github.com/jsenv/jsenv-core/tree/master/docs/dev_server#jsenv-dev-server
 */

import { startDevServer } from "@jsenv/core"
import { requestCertificateForLocalhost } from "@jsenv/https-local"

import { rootDirectoryUrl } from "../../jsenv.config.mjs"

const { certificate, privateKey } = requestCertificateForLocalhost()

await startDevServer({
  rootDirectoryUrl,
  port: 3472,
  protocol: "https",
  certificate,
  privateKey,
  explorerGroups: {
    app: {
      "./src/main.html": true,
    },
    tests: {
      "test/**/*.test.html": true,
    },
  },
})

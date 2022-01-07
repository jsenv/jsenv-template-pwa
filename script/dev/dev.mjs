/*
 * This file uses "@jsenv/core" to start a development server.
 * https://github.com/jsenv/jsenv-core/blob/master/docs/exploring/readme.md#jsenv-dev-server
 */

import { startDevServer } from "@jsenv/core"
import { requestCertificateForLocalhost } from "@jsenv/https-local"

import {
  projectDirectoryUrl,
  classicServiceWorkers,
} from "../../jsenv.config.mjs"

const { serverCertificate, serverCertificatePrivateKey } =
  await requestCertificateForLocalhost()

export const server = await startDevServer({
  projectDirectoryUrl,
  classicServiceWorkers,
  port: 3472,
  protocol: "https",
  certificate: serverCertificate,
  privateKey: serverCertificatePrivateKey,
  explorableConfig: {
    "app": {
      "./src/main.html": true,
    },
    "unit tests": {
      "test/**/*.test.html": true,
    },
  },
})

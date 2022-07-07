import { startBuildServer } from "@jsenv/core"
import { requestCertificateForLocalhost } from "@jsenv/https-local"

import { rootDirectoryUrl } from "../../jsenv.config.mjs"

const { certificate, privateKey } = requestCertificateForLocalhost()

export const server = await startBuildServer({
  logLevel: process.env.LOG_LEVEL,
  protocol: "https",
  certificate,
  privateKey,
  rootDirectoryUrl,
  buildDirectoryUrl: new URL("./dist/", rootDirectoryUrl),
})

import { startBuildServer } from "@jsenv/core"
import { requestCertificateForLocalhost } from "@jsenv/https-local"

import { rootDirectoryUrl } from "../../jsenv.config.mjs"

const { serverCertificate, serverCertificatePrivateKey } =
  await requestCertificateForLocalhost()

export const server = await startBuildServer({
  logLevel: process.env.LOG_LEVEL,
  protocol: "https",
  certificate: serverCertificate,
  privateKey: serverCertificatePrivateKey,
  buildCommand: process.env.LIGHTHOUSE
    ? "node scripts/build/build.mjs --lighthouse"
    : "node scripts/build/build.mjs --preview",
  rootDirectoryUrl,
  buildDirectoryUrl: new URL("./dist/", rootDirectoryUrl),
  mainBuildFile: "/index.html",
  autorestart: {
    url: import.meta.url,
  },
})

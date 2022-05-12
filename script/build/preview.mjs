import { startBuildServer } from "@jsenv/core"
import { requestCertificateForLocalhost } from "@jsenv/https-local"

import { rootDirectoryUrl } from "../../jsenv.config.mjs"

const { serverCertificate, serverCertificatePrivateKey } =
  await requestCertificateForLocalhost()

export const server = await startBuildServer({
  protocol: "https",
  certificate: serverCertificate,
  privateKey: serverCertificatePrivateKey,
  buildCommand: "node script/build/build.mjs",
  rootDirectoryUrl,
  buildDirectoryUrl: new URL("./dist/", rootDirectoryUrl),
  mainBuildFile: "main.html",
  autorestart: {
    url: import.meta.url,
  },
})

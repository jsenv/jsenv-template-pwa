import open from "open"
import { startBuildServer } from "@jsenv/core"
import { requestCertificate } from "@jsenv/https-local"

const { certificate, privateKey } = requestCertificate()

export const buildServer = await startBuildServer({
  logLevel: process.env.LOG_LEVEL,
  https: { certificate, privateKey },
  buildDirectoryUrl: new URL("../dist/", import.meta.url),
})

if (process.argv.includes("--open")) {
  open(buildServer.origin)
}

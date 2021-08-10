/*
 * This file uses "@jsenv/server" to start a production server.
 * https://github.com/jsenv/server#presentation
 */

import { startServer, serveFile } from "@jsenv/server"

// projectDirectoryUrl cannot be imported from jsenv.config.mjs
// because this code will run in "production" where "devDependencies" are not installed
// and jsenv.config.mjs depends on @jsenv/core which is a dev dependency
const projectDirectoryUrl = new URL("../../", import.meta.url)
const buildDirectoryUrl = new URL("./dist/systemjs/", projectDirectoryUrl)

const SECONDS_IN_30_DAYS = 60 * 60 * 24 * 30
const BUILD_FILE_CACHE_VALIDITY_IN_SECONDS = SECONDS_IN_30_DAYS

export const server = await startServer({
  logLevel: process.env.LOG_LEVEL || "info",
  protocol: process.env.HTTP ? "http" : "https",
  http2: !process.env.HTTP,
  port: process.env.PORT || 0,
  requestToResponse: (request) => {
    if (request.ressource === "/") {
      request = {
        ...request,
        ressource: "/main.prod.html",
      }
    }
    const longTermCacheEnabled = request.ressource !== "/main.prod.html"
    return serveFile(request, {
      rootDirectoryUrl: buildDirectoryUrl,
      cacheControl: longTermCacheEnabled
        ? `private,max-age=${BUILD_FILE_CACHE_VALIDITY_IN_SECONDS},immutable`
        : `private,max-age=0,must-revalidate`,
      etagEnabled: true,
      compressionEnabled: true,
    })
  },
})

/*
 * This file uses "@jsenv/server" to start a production server.
 * https://github.com/jsenv/server#presentation
 */

import { startServer, fetchFileSystem } from "@jsenv/server"

// rootDirectoryUrl cannot be imported from jsenv.config.mjs
// because this code will run in "production" where "devDependencies" are not installed
// and jsenv.config.mjs depends on @jsenv/core which is a dev dependency
const rootDirectoryUrl = new URL("../../", import.meta.url)
const buildDirectoryUrl = new URL("./dist/", rootDirectoryUrl)

export const server = await startServer({
  protocol: "http",
  port: process.env.PORT,
  logLevel: process.env.LOG_LEVEL,
  requestToResponse: (request) => {
    if (request.ressource === "/") {
      request = {
        ...request,
        ressource: "/main.prod.html",
      }
    }
    const SECONDS_IN_30_DAYS = 60 * 60 * 24 * 30
    const longTermCacheDisabled = request.ressource === "/main.prod.html"
    return fetchFileSystem(
      new URL(request.ressource.slice(1), buildDirectoryUrl),
      {
        headers: request.headers,
        cacheControl: longTermCacheDisabled
          ? `private,max-age=0,must-revalidate`
          : `private,max-age=${SECONDS_IN_30_DAYS},immutable`,
        etagEnabled: true,
        compressionEnabled: true,
      },
    )
  },
})

import { startServer, serveFile } from "@jsenv/server"

// not taken from jsenv.config.js because this code
// will run in production and jsenv.config.js depends on
// @jsenv/core which is a devDependency
const projectDirectoryUrl = new URL("../../", import.meta.url)

const resolveUrl = (specifier, baseUrl) => String(new URL(specifier, baseUrl))

const buildDirectoryUrl = resolveUrl("./dist/systemjs/", projectDirectoryUrl)

const SECONDS_IN_30_DAYS = 60 * 60 * 24 * 30
const BUILD_FILE_CACHE_VALIDITY_IN_SECONDS = SECONDS_IN_30_DAYS

export const serverPromise = startServer({
  logLevel: process.env.LOG_LEVEL || "info",
  protocol: process.env.HTTPS ? "https" : "http",
  http2: Boolean(process.env.HTTPS),
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

import { startServer, serveFile } from "@jsenv/server"

startServer({
  port: 80,
  requestToResponse: (request) => {
    return serveFile(request, {
      rootDirectoryUrl: new URL("./", import.meta.url),
    })
  },
})

import { startServer, fetchFileSystem } from "@jsenv/server"

startServer({
  port: 80,
  requestToResponse: (request) => {
    return fetchFileSystem(
      new URL(request.ressource.slice(1), import.meta.url),
      {
        headers: request.headers,
      },
    )
  },
})

import { startDevServer } from "@jsenv/core"

startDevServer({
  rootDirectoryUrl: new URL("./", import.meta.url),
  port: 8721,
})

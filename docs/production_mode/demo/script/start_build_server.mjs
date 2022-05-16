import { startBuildServer } from "@jsenv/core"

startBuildServer({
  rootDirectoryUrl: new URL("./", import.meta.url),
  buildDirectoryUrl: new URL("./dist/", import.meta.url),
  port: 8349,
  buildCommand: "node ./build.mjs",
})

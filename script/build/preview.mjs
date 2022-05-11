import { startBuildServer } from "@jsenv/core"

import { rootDirectoryUrl } from "../../jsenv.config.mjs"

export const server = await startBuildServer({
  buildCommand: "node script/build/build.mjs",
  rootDirectoryUrl,
  buildDirectoryUrl: new URL("./dist/", rootDirectoryUrl),
  mainFileRelativeUrl: "main.prod.html", // TODO
})

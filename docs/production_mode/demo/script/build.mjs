import { build } from "@jsenv/core"

await build({
  rootDirectoryUrl: new URL("./", import.meta.url),
  buildDirectoryUrl: new URL("./dist/", import.meta.url),
  entryPoints: {
    "./src/main.html": "index.html",
  },
})

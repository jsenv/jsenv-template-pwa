import { jsenvBabelPluginMap } from "@jsenv/core"

export const projectDirectoryUrl = String(new URL("./", import.meta.url))

export const importMapFileRelativeUrl = "./import-map.importmap"

export const babelPluginMap = {
  ...jsenvBabelPluginMap,
  // add babel plugin if needed
}

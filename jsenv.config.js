import { jsenvBabelPluginMap } from "@jsenv/core"

export const projectDirectoryUrl = String(new URL("./", import.meta.url))

export const babelPluginMap = {
  ...jsenvBabelPluginMap,
  // add babel plugin if needed
}

const { createRequire } = await import("node:module")
const require = createRequire(import.meta.url)

const open = require("open")

export const openBrowser = (url, options) => open(String(url), options)

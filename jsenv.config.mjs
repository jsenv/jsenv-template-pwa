/*
 * This file exports configuration reused by jsenv scripts such as
 *
 * script/test/test.mjs
 * script/build/build.mjs
 *
 * Read more at https://github.com/jsenv/jsenv-core#jsenvconfigmjs
 */

export const rootDirectoryUrl = String(new URL("./", import.meta.url))

export const runtimeSupport = {
  chrome: "55",
  edge: "14",
  firefox: "52",
  safari: "11",
}

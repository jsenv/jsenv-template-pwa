/*
 * This file exports configuration reused by scripts such as
 * - scripts/test/test.mjs
 * - scripts/build/build.mjs
 */

export const rootDirectoryUrl = String(new URL("./", import.meta.url))

export const runtimeCompat = {
  chrome: "55",
  edge: "14",
  firefox: "52",
  safari: "11",
}

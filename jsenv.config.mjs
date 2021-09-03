/*
 * This file exports configuration reused by jsenv scripts such as
 *
 * script/test/test.mjs
 * script/build/build.mjs
 *
 * See https://github.com/jsenv/jsenv-core#jsenvconfigjs
 */

export const projectDirectoryUrl = String(new URL("./", import.meta.url))

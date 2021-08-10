/*
 * Executing this file format files using prettier
 * See https://github.com/jsenv/jsenv-template-pwa/blob/main/docs/formatting/formatting.md#how-to-use-prettier
 */

import { formatWithPrettier } from "@jsenv/prettier-check-project"

import { projectDirectoryUrl } from "../../jsenv.config.mjs"

formatWithPrettier({
  projectDirectoryUrl,
})

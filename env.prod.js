/**
 * This file is used when code imports from "#env"
 *
 * import { DEV } from "#env"
 *
 * And importmap contains "#env": "./env.prod.js" mapping
 * This happens when using "prod.importmap" file
 * See https://github.com/jsenv/jsenv-template-pwa/blob/main/docs/production_mode/production_mode.md#production-mode
 */

export const DEV = false

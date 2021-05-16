/* eslint-env worker */
/* globals self */
// config globals comes from ./node_modules/@jsenv/pwa/src/service-worker.setup.js
/* globals config */

self.importScripts("./node_modules/@jsenv/pwa/src/service-worker.setup.js")

config.cachePrefix = "pwa-template"
// config.logLevel = "debug"

self.importScripts("./node_modules/@jsenv/pwa/src/service-worker.main.js")

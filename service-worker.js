/* globals self, config */

self.importScripts("./node_modules/@jsenv/pwa/src/service-worker.setup.js")

config.cachePrefix = "pwa-template"
// config.logLevel = "debug"

self.importScripts("./node_modules/@jsenv/pwa/src/service-worker.main.js")

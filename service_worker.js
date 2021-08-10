/*
 * This file is the service worker file of this pwa.
 *
 * self.config can be used to configure the service worker
 * behaviour implemented in "service-worker.main.js".
 *
 * Read more in https://github.com/jsenv/pwa/blob/master/docs/jsenv-service-worker.md#configuration
 */

/* globals self */

self.importScripts("./node_modules/@jsenv/pwa/src/service-worker.setup.js")

self.config.cachePrefix = "pwa-template"
// self.config.logLevel = "debug"

self.importScripts("./node_modules/@jsenv/pwa/src/service-worker.main.js")

/*
 * This file is the service worker file of this pwa.
 *
 * It is importing two files:
 * ./node_modules/@jsenv/pwa/src/service-worker.setup.js
 * ./node_modules/@jsenv/pwa/src/service-worker.main.js
 *
 * "service-worker.setup.js" creates self.config variable.
 * self.config is an object that can be used to configure
 * the service worker behaviour implemented in "service-worker.main.js".
 *
 * Read more in https://github.com/jsenv/pwa/blob/master/docs/jsenv-service-worker.md#configuration
 *
 */

/* globals self */

self.importScripts("./node_modules/@jsenv/pwa/src/service-worker.setup.js")

self.config.cachePrefix = "pwa-template"
// self.config.logLevel = "debug"

self.importScripts("./node_modules/@jsenv/pwa/src/service-worker.main.js")

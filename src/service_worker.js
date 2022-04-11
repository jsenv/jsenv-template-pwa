/*
 * This file is the service worker file of this pwa.
 *
 * Read more in https://github.com/jsenv/pwa/blob/master/docs/jsenv-service-worker.md#configuration
 */

/* globals self */

import "@jsenv/pwa/src/service_worker.js"

self.initJsenvServiceWorker({
  cachePrefix: "pwa-template",
  // logLevel:  "debug"
})

/*
 * This file is the service worker file of this pwa.
 *
 * Read more in https://github.com/jsenv/pwa/blob/master/docs/jsenv-service-worker.md#configuration
 */

/* eslint-env serviceworker */

self.importScripts(
  "../node_modules/@jsenv/service-worker/src/jsenv_service_worker.js",
)

self.__sw__.init({
  name: "product-name",
  logLevel: "debug",
  resources: {
    "/": {},
    ...(self.resourcesFromJsenvBuild || {}),
  },
})

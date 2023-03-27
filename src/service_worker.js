/*
 * This file is the service worker file of this pwa.
 *
 * Read more in https://github.com/jsenv/pwa/blob/master/docs/jsenv-service-worker.md#configuration
 */

/* eslint-env serviceworker */
/* globals __DEV__ */

self.importScripts("@jsenv/service-worker/src/jsenv_service_worker.js")

self.__sw__.init({
  name: "product-name",
  logLevel: "info",
  resources: {
    ...(__DEV__ ? { "/": {} } : { "/jsenv-template-pwa/": {} }),
    ...(self.resourcesFromJsenvBuild || {}),
  },
})

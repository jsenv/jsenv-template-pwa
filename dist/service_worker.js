self.resourcesFromJsenvBuild = {
  "/index.html": {
    "version": "e120d668"
  },
  "/other/favicon.png": {
    "version": "467b6542",
    "versionedUrl": "/other/favicon.png?v=467b6542"
  },
  "/other/pwa.webmanifest": {
    "version": "95af4e74"
  },
  "/other/pwa_icon_192.png": {
    "version": "eece115e",
    "versionedUrl": "/other/pwa_icon_192.png?v=eece115e"
  },
  "/other/pwa_icon_512.png": {
    "version": "62510d95",
    "versionedUrl": "/other/pwa_icon_512.png?v=62510d95"
  },
  "/other/maskable_icon_192.png": {
    "version": "33ca6666",
    "versionedUrl": "/other/maskable_icon_192.png?v=33ca6666"
  },
  "/other/logo.png": {
    "version": "467b6542",
    "versionedUrl": "/other/logo.png?v=467b6542"
  },
  "/js/main.nomodule.js": {
    "version": "76ef0a68",
    "versionedUrl": "/js/main.nomodule.js?v=76ef0a68"
  },
  "/other/roboto_v27_latin_regular.woff2": {
    "version": "fda7bb73",
    "versionedUrl": "/other/roboto_v27_latin_regular.woff2?v=fda7bb73"
  },
  "/js/app.nomodule.js": {
    "version": "3335e7de",
    "versionedUrl": "/js/app.nomodule.js?v=3335e7de"
  },
  "/js/jsenv_service_worker.js": {
    "version": "90994b80",
    "versionedUrl": "/js/jsenv_service_worker.js?v=90994b80"
  },
  "/js/vendors.nomodule.js": {
    "version": "91a34eab",
    "versionedUrl": "/js/vendors.nomodule.js?v=91a34eab"
  },
  "/css/app.css": {
    "version": "a0c28051",
    "versionedUrl": "/css/app.css?v=a0c28051"
  }
};


;(function() {
  var __versionMappings__ = {
    "/js/main.nomodule.js": "/js/main.nomodule.js?v=76ef0a68",
    "/js/vendors.nomodule.js": "/js/vendors.nomodule.js?v=91a34eab",
    "/other/roboto_v27_latin_regular.woff2": "/other/roboto_v27_latin_regular.woff2?v=fda7bb73",
    "/js/app.nomodule.js": "/js/app.nomodule.js?v=3335e7de",
    "/css/app.css": "/css/app.css?v=a0c28051",
    "/js/jsenv_service_worker.js": "/js/jsenv_service_worker.js?v=90994b80",
    "/other/logo.png": "/other/logo.png?v=467b6542"
  };
  self.__v__ = function (specifier) {
    return __versionMappings__[specifier] || specifier
  };
})();

/*
 * This file is the service worker file of this pwa.
 *
 * Read more in https://github.com/jsenv/pwa/blob/master/docs/jsenv-service-worker.md#configuration
 */

/* eslint-env serviceworker */
/* globals "/" */

self.importScripts(__v__("/js/jsenv_service_worker.js"));
self.__sw__.init({
  name: "product-name",
  logLevel: "info",
  resources: {
    [typeof "/" === "string" ? "/" : "/"]: {},
    ...(self.resourcesFromJsenvBuild || {})
  }
});
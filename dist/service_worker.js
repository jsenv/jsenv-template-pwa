
self.resourcesFromJsenvBuild = {
  "/index.html": {
    "version": "69c499db"
  },
  "/other/favicon.png": {
    "version": "25e95a00",
    "versionedUrl": "/other/favicon.png?v=25e95a00"
  },
  "/other/pwa.webmanifest": {
    "version": "be81fe0d"
  },
  "/other/logo.png": {
    "version": "25e95a00",
    "versionedUrl": "/other/logo.png?v=25e95a00"
  },
  "/css/app.css": {
    "version": "7afa9575",
    "versionedUrl": "/css/app.css?v=7afa9575"
  },
  "/js/main.nomodule.js": {
    "version": "e5e56ffd",
    "versionedUrl": "/js/main.nomodule.js?v=e5e56ffd"
  },
  "/js/app.nomodule.js": {
    "version": "2bc9155d",
    "versionedUrl": "/js/app.nomodule.js?v=2bc9155d"
  },
  "/js/babel_helpers.nomodule.js": {
    "version": "c0111822",
    "versionedUrl": "/js/babel_helpers.nomodule.js?v=c0111822"
  },
  "/other/roboto_v27_latin_regular.woff2": {
    "version": "cc46322d",
    "versionedUrl": "/other/roboto_v27_latin_regular.woff2?v=cc46322d"
  },
  "/other/pwa_icon_192.png": {
    "version": "574c1c76",
    "versionedUrl": "/other/pwa_icon_192.png?v=574c1c76"
  },
  "/other/pwa_icon_512.png": {
    "version": "d2dd96fd",
    "versionedUrl": "/other/pwa_icon_512.png?v=d2dd96fd"
  },
  "/other/maskable_icon_192.png": {
    "version": "c20be9d4",
    "versionedUrl": "/other/maskable_icon_192.png?v=c20be9d4"
  },
  "/js/jsenv_service_worker.js": {
    "version": "18d3e6d8",
    "versionedUrl": "/js/jsenv_service_worker.js?v=18d3e6d8"
  }
};

;(function() {
  var __versionMappings__ = {
  "/js/main.nomodule.js": "/js/main.nomodule.js?v=e5e56ffd",
  "/js/app.nomodule.js": "/js/app.nomodule.js?v=2bc9155d",
  "/css/app.css": "/css/app.css?v=7afa9575",
  "/js/babel_helpers.nomodule.js": "/js/babel_helpers.nomodule.js?v=c0111822",
  "/other/roboto_v27_latin_regular.woff2": "/other/roboto_v27_latin_regular.woff2?v=cc46322d",
  "/other/logo.png": "/other/logo.png?v=25e95a00",
  "/js/jsenv_service_worker.js": "/js/jsenv_service_worker.js?v=18d3e6d8"
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
/* globals self */

self.importScripts(__v__("/js/jsenv_service_worker.js"));
self.__sw__.init({
  name: "product-name",
  resources: {
    "/": {},
    ...(self.resourcesFromJsenvBuild || {})
  }
});
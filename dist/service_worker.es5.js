
self.serviceWorkerUrls = {
  "/index.html": {
    "versioned": false,
    "version": "3ffdf19d"
  },
  "/other/favicon.png?v=25e95a00": {
    "versioned": true
  },
  "/other/pwa.webmanifest": {
    "versioned": false,
    "version": "bdad4409"
  },
  "/other/logo.png?v=25e95a00": {
    "versioned": true
  },
  "/other/roboto_v27_latin_regular.woff2?v=cc46322d": {
    "versioned": true
  },
  "/css/app.css?v=c2350902": {
    "versioned": true
  },
  "/js/app_loader.es5.js?as_js_classic&v=31d1ddc8": {
    "versioned": true
  },
  "/js/app.es5.js?as_js_classic&v=7f142cb7": {
    "versioned": true
  },
  "/js/dev_ribbon.es5.js?as_js_classic&v=26df65e0": {
    "versioned": true
  },
  "/js/s.js?v=e8abd29a": {
    "versioned": true
  },
  "/js/babel_helpers.es5.js?as_js_classic&v=ea51f958": {
    "versioned": true
  },
  "/other/pwa_icon_192.png?v=574c1c76": {
    "versioned": true
  },
  "/other/pwa_icon_512.png?v=d2dd96fd": {
    "versioned": true
  },
  "/other/maskable_icon_192.png?v=c20be9d4": {
    "versioned": true
  }
};

;(function() {

var __versionMappings__ = {
  "/js/app_loader.es5.js": "/js/app_loader.es5.js?as_js_classic&v=31d1ddc8",
  "/js/dev_ribbon.es5.js": "/js/dev_ribbon.es5.js?as_js_classic&v=26df65e0",
  "/css/app.css": "/css/app.css?v=c2350902",
  "/js/app.es5.js": "/js/app.es5.js?as_js_classic&v=7f142cb7",
  "/js/babel_helpers.es5.js": "/js/babel_helpers.es5.js?as_js_classic&v=ea51f958",
  "/other/roboto_v27_latin_regular.woff2": "/other/roboto_v27_latin_regular.woff2?v=cc46322d",
  "/other/logo.png": "/other/logo.png?v=25e95a00"
};
self.__v__ = function (specifier) {
  return __versionMappings__[specifier] || specifier
};

})();

/*
 * This file is a modified version of https://github.com/systemjs/systemjs/blob/main/dist/s.js
 * with the following changes:
 *
 * - Code can use aync/await, const, ... because an es5 version of this file is generated
 * - Can use document.currentScript because we don't support IE
 * - auto import inline System.register
 * - auto import first System.register in web workers
 * - queing events in web workers
 * - no support for importmap because jsenv don't need it
 */

;(function () {
  /* eslint-env browser */
  /* globals self */

  const loadRegistry = Object.create(null)
  const registerRegistry = Object.create(null)
  let inlineScriptCount = 0
  const System = {}

  const hasDocument = typeof document === "object"
  const envGlobal = self
  const isWorker =
    !hasDocument &&
    typeof envGlobal.WorkerGlobalScope === "function" &&
    envGlobal instanceof envGlobal.WorkerGlobalScope
  const isServiceWorker = isWorker && typeof self.skipWaiting === "function"
  envGlobal.System = System

  let baseUrl = envGlobal.location.href.split("#")[0].split("?")[0]
  const lastSlashIndex = baseUrl.lastIndexOf("/")
  if (lastSlashIndex !== -1) {
    baseUrl = baseUrl.slice(0, lastSlashIndex + 1)
  }

  const resolveUrl = (specifier, baseUrl) => new URL(specifier, baseUrl).href

  if (hasDocument) {
    const baseElement = document.querySelector("base[href]")
    if (baseElement) {
      baseUrl = baseElement.href
    }
    System.register = (deps, declare) => {
      if (!document.currentScript) {
        throw new Error("unexpected call to System.register (document.currentScript is undefined)")
      }
      if (document.currentScript.__s__) {
        registerRegistry[document.currentScript.src] = [deps, declare]
        return null
      }
      const url =
        document.currentScript.src ||
        `${window.location.href}__inline_script__${++inlineScriptCount}`
      registerRegistry[url] = [deps, declare]
      return _import(url)
    }
    System.instantiate = (url) => {
      const script = createScript(url)
      return new Promise(function (resolve, reject) {
        let lastWindowErrorUrl
        let lastWindowError
        const windowErrorCallback = (event) => {
          lastWindowErrorUrl = event.filename
          lastWindowError = event.error
        }
        window.addEventListener("error", windowErrorCallback)
        script.addEventListener("error", () => {
          window.removeEventListener("error", windowErrorCallback)
          reject(`An error occured while loading url with <script> for ${url}`)
        })
        script.addEventListener("load", () => {
          window.removeEventListener("error", windowErrorCallback)
          document.head.removeChild(script)
          // Note that if an error occurs that isn't caught by this if statement,
          // that getRegister will return null and a "did not instantiate" error will be thrown.
          if (lastWindowErrorUrl === url) {
            reject(lastWindowError)
          } else {
            resolve()
          }
        })
        document.head.appendChild(script)
      })
    }
    const createScript = (url) => {
      const script = document.createElement("script")
      script.async = true
      // Only add cross origin for actual cross origin
      // this is because Safari triggers for all
      // - https://bugs.webkit.org/show_bug.cgi?id=171566
      if (url.indexOf(`${self.location.origin}/`)) {
        script.crossOrigin = "anonymous"
      }
      script.__s__ = true
      script.src = url
      return script
    }
  }
  if (isWorker) {
    /*
     * SystemJs loads X files before executing the worker/service worker main file
     * It mean events dispatched during this phase could be missed
     * A warning like the one below is displayed in chrome devtools:
     * "Event handler of 'install' event must be added on the initial evaluation of worker script"
     * To fix that code below listen for these events early and redispatch them later
     * once the worker file is executed (the listeners are installed)
     */
    const firstImportCallbacks = []
    if (isServiceWorker) {
      // for service worker there is more events to listen
      // and, to get rid of the warning, we override self.addEventListener
      const eventsToCatch = ["message", "install", "activate", "fetch"]
      const eventCallbackProxies = {}
      const firstImportPromise = new Promise((resolve) => {
        firstImportCallbacks.push(resolve)
      })
      eventsToCatch.forEach((eventName) => {
        const eventsToDispatch = []
        const eventCallback = (event) => {
          const eventCallbackProxy = eventCallbackProxies[event.type]
          if (eventCallbackProxy) {
            eventCallbackProxy(event)
          } else {
            eventsToDispatch.push(event)
            event.waitUntil(firstImportPromise)
          }
        }
        self.addEventListener(eventName, eventCallback)
        firstImportCallbacks.push(() => {
          if (eventsToDispatch.length) {
            const eventCallbackProxy =
              eventCallbackProxies[eventsToDispatch[0].type]
            if (eventCallbackProxy) {
              eventsToDispatch.forEach((event) => {
                eventCallbackProxy(event)
              })
            }
            eventsToDispatch.length = 0
          }
        })
      })

      const addEventListener = self.addEventListener
      self.addEventListener = function (eventName, callback, options) {
        if (eventsToCatch.indexOf(eventName) > -1) {
          eventCallbackProxies[eventName] = callback
          return null
        }
        return addEventListener.call(self, eventName, callback, options)
      }
    } else {
      const eventsToCatch = ["message"]
      eventsToCatch.forEach((eventName) => {
        var eventQueue = []
        var eventCallback = (event) => {
          eventQueue.push(event)
        }
        self.addEventListener(eventName, eventCallback)
        firstImportCallbacks.push(() => {
          self.removeEventListener(eventName, eventCallback)
          eventQueue.forEach(function (event) {
            self.dispatchEvent(event)
          })
          eventQueue.length = 0
        })
      })
    }

    System.register = async (deps, declare) => {
      System.register = () => {
        throw new Error("unexpected call to System.register (called outside url instantiation)")
      }
      const url = self.location.href
      registerRegistry[url] = [deps, declare]
      const namespace = await _import(url)
      firstImportCallbacks.forEach((firstImportCallback) => {
        firstImportCallback()
      })
      firstImportCallbacks.length = 0
      return namespace
    }
    System.instantiate = async (url) => {
      const response = await self.fetch(url, {
        credentials: "same-origin",
      })
      if (!response.ok) {
        throw Error(`Failed to fetch module at ${url}`)
      }
      let source = await response.text()
      if (source.indexOf("//# sourceURL=") < 0) {
        source += `\n//# sourceURL=${url}`
      }
      const register = System.register
      System.register = (deps, declare) => {
        registerRegistry[url] = [deps, declare]
      }
      ;(0, self.eval)(source)
      System.register = register
    }
  }

  const _import = (specifier, parentUrl) => {
    const url = resolveUrl(specifier, parentUrl)
    const load = getOrCreateLoad(url, parentUrl)
    return load.completionPromise || startExecution(load)
  }

  const getOrCreateLoad = (url, firstParentUrl) => {
    const existingLoad = loadRegistry[url]
    if (existingLoad) {
      return existingLoad
    }

    const load = {
      url,
    }
    loadRegistry[url] = load

    const importerSetters = []
    load.importerSetters = importerSetters

    const namespace = createNamespace()
    load.namespace = namespace

    load.instantiatePromise = (async () => {
      try {
        let registration = registerRegistry[url]
        if (!registration) {
          const instantiateReturnValue = System.instantiate(url, firstParentUrl)
          if (instantiateReturnValue) {
            await instantiateReturnValue
          }
          registration = registerRegistry[url]
        }
        if (!registration) {
          throw new Error(`System.register() not called after executing ${url}`)
        }

        const _export = (firstArg, secondArg) => {
          load.hoistedExports = true
          let changed = false
          if (typeof firstArg === "string") {
            const name = firstArg
            const value = secondArg
            if (!(name in namespace) || namespace[name] !== value) {
              namespace[name] = value
              changed = true
            }
          } else {
            Object.keys(firstArg).forEach((name) => {
              const value = firstArg[name]
              if (!(name in namespace) || namespace[name] !== value) {
                namespace[name] = value
                changed = true
              }
            })
            if (firstArg && firstArg.__esModule) {
              namespace.__esModule = firstArg.__esModule
            }
          }
          if (changed) {
            importerSetters.forEach((importerSetter) => {
              if (importerSetter) {
                importerSetter(namespace)
              }
            })
          }
          return secondArg
        }
        const [deps, declare] = registration
        const { setters, execute = () => {} } = declare(_export, {
          import: (importId) => _import(importId, url),
          meta: createMeta(url),
        })
        load.deps = deps
        load.setters = setters
        load.execute = execute
      } catch (e) {
        load.error = e
        load.execute = null
      }
    })()

    load.linkPromise = (async () => {
      await load.instantiatePromise
      const dependencyLoads = await Promise.all(
        load.deps.map(async (dep, index) => {
          const setter = load.setters[index]
          const dependencyUrl = resolveUrl(dep, url)
          const dependencyLoad = getOrCreateLoad(dependencyUrl, url)
          if (dependencyLoad.instantiatePromise) {
            await dependencyLoad.instantiatePromise
          }
          if (setter) {
            dependencyLoad.importerSetters.push(setter)
            if (
              dependencyLoad.hoistedExports ||
              !dependencyLoad.instantiatePromise
            ) {
              setter(dependencyLoad.namespace)
            }
          }
          return dependencyLoad
        }),
      )
      load.dependencyLoads = dependencyLoads
    })()

    return load
  }

  const startExecution = async (load) => {
    load.completionPromise = (async () => {
      await instantiateAll(load, load, {})
      await postOrderExec(load, {})
      return load.namespace
    })()
    return load.completionPromise
  }

  const instantiateAll = async (load, parent, loaded) => {
    if (loaded[load.url]) {
      return
    }
    loaded[load.url] = true
    try {
      if (load.linkPromise) {
        // load.linkPromise is null once instantiated
        await load.linkPromise
      }
      // if (!load.parent || !load.parent.execute) {
      //   load.parent = parent
      // }
      await Promise.all(
        load.dependencyLoads.map((dependencyLoad) => {
          return instantiateAll(dependencyLoad, parent, loaded)
        }),
      )
    } catch (error) {
      if (load.error) {
        throw error
      }
      load.execute = null
      throw error
    }
  }

  const postOrderExec = async (load, seen) => {
    if (seen[load.url]) {
      return
    }
    seen[load.url] = true
    if (!load.execute) {
      if (load.error) {
        throw load.error
      }
      if (load.executePromise) {
        await load.executePromise
      }
      return
    }

    // deps execute first, unless circular
    const depLoadPromises = []
    load.dependencyLoads.forEach((dependencyLoad) => {
      try {
        const depLoadPromise = postOrderExec(dependencyLoad, seen)
        if (depLoadPromise) {
          depLoadPromises.push(depLoadPromise)
        }
      } catch (err) {
        load.execute = null
        load.error = err
        throw err
      }
    })
    if (depLoadPromises.length) {
      await Promise.all(depLoadPromises)
    }

    try {
      const executeReturnValue = load.execute.call(nullContext)
      if (executeReturnValue) {
        load.executePromise = executeReturnValue.then(
          () => {
            load.executePromise = null
            load.completionPromise = load.namespace
          },
          (error) => {
            load.executePromise = null
            load.error = error
            throw error
          },
        )
        return
      }
      load.instantiatePromise = null
      load.linkPromise = null
      load.completionPromise = load.namespace
    } catch (error) {
      load.error = error
      throw error
    } finally {
      load.execute = null
    }
  }

  // the closest we can get to call(undefined)
  const nullContext = Object.freeze(Object.create(null))

  const createMeta = (url) => {
    return {
      url,
      resolve: (id, parentUrl) => resolveUrl(id, parentUrl),
    }
  }

  const createNamespace =
    typeof Symbol !== "undefined" && Symbol.toStringTag
      ? () => {
          const namespace = Object.create(null)
          Object.defineProperty(namespace, Symbol.toStringTag, {
            value: "Module",
          })
          return namespace
        }
      : () => Object.create(null)
})();


System.register([__v__("/js/babel_helpers.es5.js")], function (_export, _context) {
  "use strict";

  var _typeof, _objectSpread2, _slicedToArray, _toConsumableArray, createLogger, getCacheName, base, blockSize, discreteValues, pad, getRandomValue, randomBlock, generateCacheId, createUrlResolver, createUrlActions, redirectRequest;

  /**
   * https://web.dev/service-worker-caching-and-http-caching/
   * https://stackoverflow.com/questions/33262385/service-worker-force-update-of-new-assets/64880568#64880568
   * https://gomakethings.com/how-to-set-an-expiration-date-for-items-in-a-service-worker-cache/
   * https://phyks.me/2019/01/manage-expiration-of-cached-assets-with-service-worker-caching.html
  
   * https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
   * https://github.com/deanhume/pwa-update-available
   * https://deanhume.com/displaying-a-new-version-available-progressive-web-app/
   * https://raw.githubusercontent.com/GoogleChromeLabs/sw-precache/master/service-worker.tmpl
   *
   * Do not use relative self.importScripts in there because
   * They are resolved against self.location. It means
   * ./file.js would be resolved against the project root
  */

  /* env serviceworker */

  /* globals self */
  function _await(value, then, direct) {
    if (direct) {
      return then ? then(value) : value;
    }

    if (!value || !value.then) {
      value = Promise.resolve(value);
    }

    return then ? value.then(then) : value;
  }

  function _catch(body, recover) {
    try {
      var result = body();
    } catch (e) {
      return recover(e);
    }

    if (result && result.then) {
      return result.then(void 0, recover);
    }

    return result;
  }

  function _empty() {}

  function _continueIgnored(value) {
    if (value && value.then) {
      return value.then(_empty);
    }
  }

  function _async(f) {
    return function () {
      for (var args = [], i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];
      }

      try {
        return Promise.resolve(f.apply(this, args));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }

  function _awaitIgnored(value, direct) {
    if (!direct) {
      return value && value.then ? value.then(_empty) : Promise.resolve();
    }
  }

  function _continue(value, then) {
    return value && value.then ? value.then(then) : then(value);
  }

  function _invokeIgnored(body) {
    var result = body();

    if (result && result.then) {
      return result.then(_empty);
    }
  }

  function _invoke(body, then) {
    var result = body();

    if (result && result.then) {
      return result.then(then);
    }

    return then(result);
  }

  return {
    setters: [function (_jsBabel_helpersJs) {
      _typeof = _jsBabel_helpersJs._;
      _objectSpread2 = _jsBabel_helpersJs.a;
      _slicedToArray = _jsBabel_helpersJs.b;
      _toConsumableArray = _jsBabel_helpersJs.c;
    }],
    execute: function () {
      self.initJsenvServiceWorker = function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$logLevel = _ref.logLevel,
            logLevel = _ref$logLevel === void 0 ? "warn" : _ref$logLevel,
            _ref$logsBackgroundCo = _ref.logsBackgroundColor,
            logsBackgroundColor = _ref$logsBackgroundCo === void 0 ? "#ffdc00" : _ref$logsBackgroundCo,
            _ref$cachePrefix = _ref.cachePrefix,
            cachePrefix = _ref$cachePrefix === void 0 ? "jsenv" : _ref$cachePrefix,
            _ref$urlsConfig = _ref.urlsConfig,
            urlsConfig = _ref$urlsConfig === void 0 ? {
          "/": {}
        } : _ref$urlsConfig,
            _ref$shouldHandleRequ = _ref.shouldHandleRequest,
            shouldHandleRequest = _ref$shouldHandleRequ === void 0 ? function (request, _ref2) {
          var requestWasCachedOnInstall = _ref2.requestWasCachedOnInstall;
          if (request.method !== "GET" && request.method !== "HEAD") return false;
          return requestWasCachedOnInstall;
        } : _ref$shouldHandleRequ,
            _ref$shouldCleanOnAct = _ref.shouldCleanOnActivate,
            shouldCleanOnActivate = _ref$shouldCleanOnAct === void 0 ? function (response, request, _ref3) {
          var requestWasCachedOnInstall = _ref3.requestWasCachedOnInstall;
          return !requestWasCachedOnInstall;
        } : _ref$shouldCleanOnAct,
            _ref$navigationPreloa = _ref.navigationPreloadEnabled,
            navigationPreloadEnabled = _ref$navigationPreloa === void 0 ? false : _ref$navigationPreloa,
            _ref$actions = _ref.actions,
            actions = _ref$actions === void 0 ? {
          ping: function ping() {
            return "pong";
          }
        } : _ref$actions;

        if (_typeof(urlsConfig) !== "object") {
          throw new TypeError("urlsConfig should be an object, got ".concat(urlsConfig));
        }

        if (typeof cachePrefix !== "string") {
          throw new TypeError("cachePrefix should be a string, got ".concat(cachePrefix));
        }

        if (cachePrefix.length === 0) {
          throw new TypeError("cachePrefix must not be empty");
        }

        if (typeof shouldCleanOnActivate !== "function") {
          throw new TypeError("shouldCleanOnActivate should be a function, got ".concat(shouldCleanOnActivate));
        }

        if (typeof shouldHandleRequest !== "function") {
          throw new TypeError("shouldHandleRequest should be a function, got ".concat(shouldHandleRequest));
        }

        if (typeof logLevel !== "string") {
          throw new TypeError("logLevel should be a boolean, got ".concat(logLevel));
        }

        if (typeof logsBackgroundColor !== "string") {
          throw new TypeError("logsBackgroundColor should be a string, got ".concat(logsBackgroundColor));
        }

        if (typeof navigationPreloadEnabled !== "boolean") {
          throw new TypeError("navigationPreloadEnabled should be a boolean, got ".concat(navigationPreloadEnabled));
        }

        var cacheName = getCacheName({
          cachePrefix: cachePrefix
        });
        var logger = createLogger({
          logLevel: logLevel,
          logsBackgroundColor: logsBackgroundColor
        });
        var urlResolver = createUrlResolver();

        var _createUrlActions = createUrlActions({
          urlsConfig: urlsConfig,
          urlResolver: urlResolver
        }),
            urlsToCacheOnInstall = _createUrlActions.urlsToCacheOnInstall,
            urlsToReloadOnInstall = _createUrlActions.urlsToReloadOnInstall,
            urlMapping = _createUrlActions.urlMapping;

        logger.info("cache key: ".concat(cacheName)); // --- installation phase ---

        self.addEventListener("install", function (installEvent) {
          installEvent.waitUntil(install(installEvent));
        });

        var install = _async(function () {
          logger.info("install start");
          return _continueIgnored(_catch(function () {
            var total = urlsToCacheOnInstall.length;
            var installed = 0;
            return _await(Promise.all(urlsToCacheOnInstall.map(_async(function (url) {
              return _continueIgnored(_catch(function () {
                var requestUrlsInUrlsToReloadOnInstall = urlsToReloadOnInstall.includes(url);
                var request = new Request(url, _objectSpread2({}, requestUrlsInUrlsToReloadOnInstall ? {
                  // A non versioned url must ignore navigator cache
                  // otherwise we might (99% chances) hit previous worker cache
                  // and miss the new version
                  cache: "reload"
                } : {// If versioned url is the same as before, it's ok to reuse
                  // cache from previous worker or navigator itself.
                }));
                return _awaitIgnored(fetchAndCache(request, {
                  oncache: function oncache() {
                    installed += 1;
                  }
                }));
              }, function (e) {
                logger.warn("cannot put ".concat(url, " in cache due to error while fetching: ").concat(e.stack));
              }));
            }))), function () {
              if (installed === total) {
                logger.info("install done (".concat(total, " urls added in cache)"));
              } else {
                logger.info("install done (".concat(installed, "/").concat(total, " urls added in cache)"));
              }
            });
          }, function (error) {
            logger.error("install error: ".concat(error.stack));
          }));
        }); // --- fetch implementation ---


        self.addEventListener("fetch", function (fetchEvent) {
          var request = remapRequest(fetchEvent.request);

          if (shouldHandleRequest(request, {
            requestWasCachedOnInstall: urlsToCacheOnInstall.includes(request.url)
          })) {
            var responsePromise = handleRequest(request, fetchEvent);

            if (responsePromise) {
              fetchEvent.respondWith(responsePromise);
            }
          }
        });

        var handleRequest = _async(function (request, fetchEvent) {
          var _exit = false;
          logger.debug("received fetch event for ".concat(request.url));
          return _continue(_catch(function () {
            return _await(self.caches.match(request), function (responseFromCache) {
              if (responseFromCache) {
                logger.debug("respond with response from cache for ".concat(request.url));
                _exit = true;
                return responseFromCache;
              }

              return _await(fetchEvent.preloadResponse, function (responsePreloaded) {
                if (responsePreloaded) {
                  logger.debug("respond with preloaded response for ".concat(request.url));
                  _exit = true;
                  return responsePreloaded;
                }
              });
            });
          }, function (error) {
            logger.warn("error while trying to use cache for ".concat(request.url), error.stack);

            var _fetch = fetch(request);

            _exit = true;
            return _fetch;
          }), function (_result) {
            if (_exit) return _result;
            logger.debug("no cache for ".concat(request.url, ", fetching it"));
            return fetchAndCache(request);
          });
        });

        var remapRequest = function remapRequest(request) {
          if (Object.prototype.hasOwnProperty.call(urlMapping, request.url)) {
            var newUrl = urlMapping[request.url];
            logger.debug("redirect request from ".concat(request.url, " to ").concat(newUrl));
            return redirectRequest(request, newUrl);
          }

          return request;
        }; // --- activation phase ---


        self.addEventListener("activate", function (activateEvent) {
          var activatePromise = activate(activateEvent);

          if (activatePromise) {
            activateEvent.waitUntil(activatePromise);
          }
        });

        var activate = _async(function () {
          logger.info("activate start");
          return _await(Promise.all([enableNavigationPreloadIfPossible(), deleteOtherUrls(), deleteOtherCaches()]), function () {
            logger.info("activate done");
          });
        });

        var enableNavigationPreloadIfPossible = _async(function () {
          return _invokeIgnored(function () {
            if (navigationPreloadEnabled && self.registration.navigationPreload) {
              return _awaitIgnored(self.registration.navigationPreload.enable());
            }
          });
        });

        var deleteOtherUrls = _async(function () {
          return _await(self.caches.open(cacheName), function (cache) {
            return _await(cache.keys(), function (requestsInCache) {
              return _awaitIgnored(Promise.all(requestsInCache.map(_async(function (requestInCache) {
                return _await(cache.match(requestInCache), function (responseInCache) {
                  return _invokeIgnored(function () {
                    if (shouldCleanOnActivate(responseInCache, requestInCache, {
                      requestWasCachedOnInstall: urlsToCacheOnInstall.includes(requestInCache.url)
                    })) {
                      logger.info("delete ".concat(requestInCache.url));
                      return _awaitIgnored(cache.delete(requestInCache));
                    }
                  });
                });
              }))));
            });
          });
        });

        var deleteOtherCaches = _async(function () {
          return _await(self.caches.keys(), function (cacheKeys) {
            return _awaitIgnored(Promise.all(cacheKeys.map(_async(function (cacheKey) {
              return _invokeIgnored(function () {
                if (cacheKey !== cacheName && cacheKey.startsWith(cachePrefix)) {
                  logger.info("delete cache ".concat(cacheKey));
                  return _awaitIgnored(self.caches.delete(cacheKey));
                }
              });
            }))));
          });
        }); // --- postMessage communication ---


        self.addEventListener("message", _async(function (messageEvent) {
          var data = messageEvent.data;

          if (_typeof(data) !== "object") {
            return;
          }

          var action = data.action;
          var actionFn = actions[action];

          if (!actionFn) {
            return;
          }

          var payload = data.payload;
          var status;
          var value;
          return _continue(_catch(function () {
            return _await(actionFn(payload, {
              cacheName: cacheName
            }), function (actionFnReturnValue) {
              status = "resolved";
              value = actionFnReturnValue;
            });
          }, function (e) {
            status = "rejected";
            value = e;
          }), function () {
            messageEvent.ports[0].postMessage({
              status: status,
              value: value
            });
          });
        }));
        actions = _objectSpread2({
          skipWaiting: function skipWaiting() {
            self.skipWaiting();
          },
          refreshCacheKey: _async(function (url) {
            url = urlResolver.resolve(url);
            return _await(fetchAndCache(new Request(url, {
              cache: "reload"
            })), function (response) {
              return response.status;
            });
          }),
          addCacheKey: _async(function (url) {
            url = urlResolver.resolve(url);
            return _await(fetchAndCache(url), function (response) {
              return response.status;
            });
          }),
          removeCacheKey: _async(function (url) {
            url = urlResolver.resolve(url);
            return _await(self.caches.open(cacheName), function (cache) {
              return _await(cache.delete(url));
            });
          })
        }, actions);

        var fetchAndCache = _async(function (request) {
          var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
              oncache = _ref4.oncache;

          return _await(Promise.all([fetchUsingNetwork(request), getCache()]), function (_ref5) {
            var _exit2 = false;

            var _ref6 = _slicedToArray(_ref5, 2),
                response = _ref6[0],
                cache = _ref6[1];

            return _invoke(function () {
              if (response.status === 200) {
                logger.debug("fresh response found for ".concat(request.url, ", put it in cache and respond with it"));
                return _await(responseToResponseForCache(response), function (responseForCache) {
                  var cacheWrittenPromise = cache.put(request, responseForCache);
                  return _invoke(function () {
                    if (oncache) {
                      return _await(cacheWrittenPromise, function () {
                        oncache();
                      });
                    }
                  }, function () {
                    _exit2 = true;
                    return response;
                  });
                });
              }
            }, function (_result2) {
              if (_exit2) return _result2;
              logger.warn("cannot put ".concat(request.url, " in cache due to response status (").concat(response.status, ")"));
              return response;
            });
          });
        });

        var responseToResponseForCache = _async(function (response) {
          var responseClone = response.clone();

          if (!response.redirected) {
            return responseClone;
          } // When passed a redirected response, this will create a new, "clean" response
          // that can be used to respond to a navigation request.
          // See https://bugs.chromium.org/p/chromium/issues/detail?id=669363&desc=2#c1
          // Not all browsers support the Response.body stream, so fall back to reading
          // the entire body into memory as a blob.


          var bodyPromise = "body" in responseClone ? Promise.resolve(responseClone.body) : responseClone.blob();
          return _await(bodyPromise, function (body) {
            // new Response() is happy when passed either a stream or a Blob.
            return new Response(body, {
              headers: responseClone.headers,
              status: responseClone.status,
              statusText: responseClone.statusText
            });
          });
        });

        var fetchUsingNetwork = _async(function (request) {
          var controller = new AbortController();
          var signal = controller.signal;
          return _catch(function () {
            return _await(fetch(request, {
              signal: signal
            }));
          }, function (e) {
            // abort request in any case
            // I don't know how useful this is ?
            controller.abort();
            throw e;
          });
        });

        var getCache = _async(function () {
          return self.caches.open(cacheName);
        });
      };

      createLogger = function createLogger(_ref7) {
        var logLevel = _ref7.logLevel,
            logsBackgroundColor = _ref7.logsBackgroundColor;

        var prefixArgs = function prefixArgs() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return ["%csw", "background: ".concat(logsBackgroundColor, "; color: black; padding: 1px 3px; margin: 0 1px")].concat(args);
        };

        var createLogMethod = function createLogMethod(method) {
          return function () {
            var _console;

            return (_console = console)[method].apply(_console, _toConsumableArray(prefixArgs.apply(void 0, arguments)));
          };
        };

        var debug = createLogMethod("debug");
        var info = createLogMethod("info");
        var warn = createLogMethod("warn");
        var error = createLogMethod("error");

        var noop = function noop() {};

        if (logLevel === "debug") {
          return {
            debug: debug,
            info: info,
            warn: warn,
            error: error
          };
        }

        if (logLevel === "info") {
          return {
            debug: noop,
            info: info,
            warn: warn,
            error: error
          };
        }

        if (logLevel === "warn") {
          return {
            debug: noop,
            info: noop,
            warn: warn,
            error: error
          };
        }

        if (logLevel === "error") {
          return {
            debug: noop,
            info: noop,
            warn: noop,
            error: error
          };
        }

        if (logLevel === "off") {
          return {
            debug: noop,
            info: noop,
            warn: noop,
            error: noop
          };
        }

        throw new Error("unknown logLevel, got ".concat(logLevel));
      };

      getCacheName = function getCacheName(_ref8) {
        var cachePrefix = _ref8.cachePrefix;
        return "".concat(cachePrefix).concat(generateCacheId());
      };

      base = 36;
      blockSize = 4;
      discreteValues = Math.pow(base, blockSize);

      pad = function pad(number, size) {
        var s = "000000000".concat(number);
        return s.substr(s.length - size);
      };

      getRandomValue = function () {
        var _self = self,
            crypto = _self.crypto;

        if (crypto) {
          var lim = Math.pow(2, 32) - 1;
          return function () {
            return Math.abs(crypto.getRandomValues(new Uint32Array(1))[0] / lim);
          };
        }

        return Math.random;
      }();

      randomBlock = function randomBlock() {
        return pad((getRandomValue() * discreteValues << 0).toString(base), blockSize);
      };

      generateCacheId = function generateCacheId() {
        var timestamp = new Date().getTime().toString(base);
        var random = "".concat(randomBlock()).concat(randomBlock());
        return "".concat(timestamp).concat(random);
      };

      createUrlResolver = function createUrlResolver() {
        var resolve = function resolve(string) {
          return String(new URL(string, self.location));
        };

        return {
          resolve: resolve
        };
      };

      createUrlActions = function createUrlActions(_ref9) {
        var urlsConfig = _ref9.urlsConfig,
            urlResolver = _ref9.urlResolver;
        var urlsToCacheOnInstall = [];
        var urlsToReloadOnInstall = [];
        var urlMapping = {};
        var urls = [];
        Object.keys(urlsConfig).forEach(function (key) {
          var url = urlResolver.resolve(key);

          if (urls.includes(url)) {
            return;
          }

          urls.push(url);
          var urlConfig = urlsConfig[key];
          if (!urlConfig) urlConfig = {
            cache: false
          };
          if (urlConfig === true) urlConfig = {
            cache: true
          };
          var _urlConfig = urlConfig,
              _urlConfig$cache = _urlConfig.cache,
              cache = _urlConfig$cache === void 0 ? true : _urlConfig$cache,
              _urlConfig$versioned = _urlConfig.versioned,
              versioned = _urlConfig$versioned === void 0 ? false : _urlConfig$versioned,
              alias = _urlConfig.alias;

          if (cache) {
            urlsToCacheOnInstall.push(url);

            if (!versioned) {
              urlsToReloadOnInstall.push(url);
            }
          }

          if (alias) {
            urlMapping[url] = urlResolver.resolve(alias);
          }
        });
        return {
          urlsToCacheOnInstall: urlsToCacheOnInstall,
          urlsToReloadOnInstall: urlsToReloadOnInstall,
          urlMapping: urlMapping
        };
      };

      redirectRequest = _async(function (request, url) {
        var mode = request.mode; // see https://github.com/GoogleChrome/workbox/issues/1796

        if (mode !== "navigate") {
          return new Request(url, request);
        }

        var requestClone = request.clone();
        var body = requestClone.body,
            credentials = requestClone.credentials,
            headers = requestClone.headers,
            integrity = requestClone.integrity,
            referrer = requestClone.referrer,
            referrerPolicy = requestClone.referrerPolicy;
        var bodyPromise = body ? Promise.resolve(body) : requestClone.blob();
        return _await(bodyPromise, function (bodyValue) {
          var requestMutated = new Request(url, {
            body: bodyValue,
            credentials: credentials,
            headers: headers,
            integrity: integrity,
            referrer: referrer,
            referrerPolicy: referrerPolicy,
            mode: "same-origin",
            redirect: "manual"
          });
          return requestMutated;
        });
      }); // const responseUsesLongTermCaching = (responseInCache) => {
      //   const cacheControlResponseHeader =
      //     responseInCache.headers.get("cache-control")
      //   const maxAge = parseMaxAge(cacheControlResponseHeader)
      //   return maxAge && maxAge > 0
      // }
      // // https://github.com/tusbar/cache-control
      // const parseMaxAge = (cacheControlHeader) => {
      //   if (!cacheControlHeader || cacheControlHeader.length === 0) {
      //     return null
      //   }
      //   const HEADER_REGEXP =
      //     /([a-zA-Z][a-zA-Z_-]*)\s*(?:=(?:"([^"]*)"|([^ \t",;]*)))?/g
      //   const matches = cacheControlHeader.match(HEADER_REGEXP) || []
      //   const values = {}
      //   Array.from(matches).forEach((match) => {
      //     const tokens = match.split("=", 2)
      //     const [key] = tokens
      //     let value = null
      //     if (tokens.length > 1) {
      //       value = tokens[1].trim()
      //     }
      //     values[key.toLowerCase()] = value
      //   })
      //   return parseDuration(values["max-age"])
      // }
      // const parseDuration = (value) => {
      //   if (!value) {
      //     return null
      //   }
      //   const duration = Number.parseInt(value, 10)
      //   if (!Number.isFinite(duration) || duration < 0) {
      //     return null
      //   }
      //   return duration
      // }

      /*
       * This file is the service worker file of this pwa.
       *
       * Read more in https://github.com/jsenv/pwa/blob/master/docs/jsenv-service-worker.md#configuration
       */

      self.initJsenvServiceWorker({
        cachePrefix: "pwa-template",
        // logLevel:  "debug",
        urlsConfig: self.serviceWorkerUrls || {}
      });
    }
  };
});
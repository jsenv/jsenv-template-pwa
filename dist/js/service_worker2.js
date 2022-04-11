import _slicedToArray from "/js/slicedToArray.js?v=c89a8a94";
import _objectSpread from "/js/objectSpread2.js?v=a8808167";

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
 * ./file.js would be resoled against the project root
*/

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

self.initJsenvServiceWorker = function () {
  let _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$logLevel = _ref.logLevel,
      logLevel = _ref$logLevel === void 0 ? "warn" : _ref$logLevel,
      _ref$logsBackgroundCo = _ref.logsBackgroundColor,
      logsBackgroundColor = _ref$logsBackgroundCo === void 0 ? "#ffdc00" : _ref$logsBackgroundCo,
      _ref$cachePrefix = _ref.cachePrefix,
      cachePrefix = _ref$cachePrefix === void 0 ? "jsenv" : _ref$cachePrefix,
      _ref$manualUrlsConfig = _ref.manualUrlsConfig,
      manualUrlsConfig = _ref$manualUrlsConfig === void 0 ? {
    "/": {}
  } : _ref$manualUrlsConfig,
      _ref$shouldHandleRequ = _ref.shouldHandleRequest,
      shouldHandleRequest = _ref$shouldHandleRequ === void 0 ? (request, _ref2) => {
    let requestWasCachedOnInstall = _ref2.requestWasCachedOnInstall;
    if (request.method !== "GET" && request.method !== "HEAD") return false;
    return requestWasCachedOnInstall;
  } : _ref$shouldHandleRequ,
      _ref$shouldCleanOnAct = _ref.shouldCleanOnActivate,
      shouldCleanOnActivate = _ref$shouldCleanOnAct === void 0 ? (response, request, _ref3) => {
    let requestWasCachedOnInstall = _ref3.requestWasCachedOnInstall;
    return !requestWasCachedOnInstall;
  } : _ref$shouldCleanOnAct,
      _ref$navigationPreloa = _ref.navigationPreloadEnabled,
      navigationPreloadEnabled = _ref$navigationPreloa === void 0 ? false : _ref$navigationPreloa,
      _ref$actions = _ref.actions,
      actions = _ref$actions === void 0 ? {
    ping: () => "pong"
  } : _ref$actions;

  if (self.generatedUrlsConfig === undefined) {
    self.generatedUrlsConfig = {};
  }

  const generatedUrlsConfig = self.generatedUrlsConfig;

  if (typeof generatedUrlsConfig !== "object") {
    throw new TypeError("self.generatedUrlsConfig should be an object, got ".concat(generatedUrlsConfig));
  }

  if (typeof manualUrlsConfig !== "object") {
    throw new TypeError("manualUrlsConfig should be an object, got ".concat(manualUrlsConfig));
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

  const cacheName = getCacheName({
    cachePrefix
  });
  const logger = createLogger({
    logLevel,
    logsBackgroundColor
  });
  const urlResolver = createUrlResolver();

  const _createUrlActions = createUrlActions({
    generatedUrlsConfig,
    manualUrlsConfig,
    urlResolver
  }),
        urlsToCacheOnInstall = _createUrlActions.urlsToCacheOnInstall,
        urlsToReloadOnInstall = _createUrlActions.urlsToReloadOnInstall,
        urlMapping = _createUrlActions.urlMapping;

  logger.info("cache key: ".concat(cacheName)); // --- installation phase ---

  self.addEventListener("install", installEvent => {
    installEvent.waitUntil(install(installEvent));
  });

  const install = _async(function () {
    logger.info("install start");
    return _continueIgnored(_catch(function () {
      const total = urlsToCacheOnInstall.length;
      let installed = 0;
      return _await(Promise.all(urlsToCacheOnInstall.map(_async(function (url) {
        return _continueIgnored(_catch(function () {
          const requestUrlsInUrlsToReloadOnInstall = urlsToReloadOnInstall.includes(url);
          const request = new Request(url, _objectSpread({}, requestUrlsInUrlsToReloadOnInstall ? {
            // A non versioned url must ignore navigator cache
            // otherwise we might (99% chances) hit previous worker cache
            // and miss the new version
            cache: "reload"
          } : {// If versioned url is the same as before, it's ok to reuse
            // cache from previous worker or navigator itself.
          }));
          return _awaitIgnored(fetchAndCache(request, {
            oncache: () => {
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


  self.addEventListener("fetch", fetchEvent => {
    const request = remapRequest(fetchEvent.request);

    if (shouldHandleRequest(request, {
      requestWasCachedOnInstall: urlsToCacheOnInstall.includes(request.url)
    })) {
      const responsePromise = handleRequest(request, fetchEvent);

      if (responsePromise) {
        fetchEvent.respondWith(responsePromise);
      }
    }
  });

  const handleRequest = _async(function (request, fetchEvent) {
    let _exit = false;
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

      const _fetch = fetch(request);

      _exit = true;
      return _fetch;
    }), function (_result) {
      if (_exit) return _result;
      logger.debug("no cache for ".concat(request.url, ", fetching it"));
      return fetchAndCache(request);
    });
  });

  const remapRequest = request => {
    if (Object.prototype.hasOwnProperty.call(urlMapping, request.url)) {
      const newUrl = urlMapping[request.url];
      logger.debug("redirect request from ".concat(request.url, " to ").concat(newUrl));
      return redirectRequest(request, newUrl);
    }

    return request;
  }; // --- activation phase ---


  self.addEventListener("activate", activateEvent => {
    const activatePromise = activate(activateEvent);

    if (activatePromise) {
      activateEvent.waitUntil(activatePromise);
    }
  });

  const activate = _async(function () {
    logger.info("activate start");
    return _await(Promise.all([enableNavigationPreloadIfPossible(), deleteOtherUrls(), deleteOtherCaches()]), function () {
      logger.info("activate done");
    });
  });

  const enableNavigationPreloadIfPossible = _async(function () {
    return _invokeIgnored(function () {
      if (navigationPreloadEnabled && self.registration.navigationPreload) {
        return _awaitIgnored(self.registration.navigationPreload.enable());
      }
    });
  });

  const deleteOtherUrls = _async(function () {
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

  const deleteOtherCaches = _async(function () {
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
    const data = messageEvent.data;

    if (typeof data !== "object") {
      return;
    }

    const action = data.action;
    const actionFn = actions[action];

    if (!actionFn) {
      return;
    }

    const payload = data.payload;
    let status;
    let value;
    return _continue(_catch(function () {
      return _await(actionFn(payload, {
        cacheName
      }), function (actionFnReturnValue) {
        status = "resolved";
        value = actionFnReturnValue;
      });
    }, function (e) {
      status = "rejected";
      value = e;
    }), function () {
      messageEvent.ports[0].postMessage({
        status,
        value
      });
    });
  }));
  actions = _objectSpread({
    skipWaiting: () => {
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

  const fetchAndCache = _async(function (request) {
    let _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        oncache = _ref4.oncache;

    return _await(Promise.all([fetchUsingNetwork(request), getCache()]), function (_ref5) {
      let _exit2 = false;

      let _ref6 = _slicedToArray(_ref5, 2),
          response = _ref6[0],
          cache = _ref6[1];

      return _invoke(function () {
        if (response.status === 200) {
          logger.debug("fresh response found for ".concat(request.url, ", put it in cache and respond with it"));
          return _await(responseToResponseForCache(response), function (responseForCache) {
            const cacheWrittenPromise = cache.put(request, responseForCache);
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

  const responseToResponseForCache = _async(function (response) {
    const responseClone = response.clone();

    if (!response.redirected) {
      return responseClone;
    } // When passed a redirected response, this will create a new, "clean" response
    // that can be used to respond to a navigation request.
    // See https://bugs.chromium.org/p/chromium/issues/detail?id=669363&desc=2#c1
    // Not all browsers support the Response.body stream, so fall back to reading
    // the entire body into memory as a blob.


    const bodyPromise = "body" in responseClone ? Promise.resolve(responseClone.body) : responseClone.blob();
    return _await(bodyPromise, function (body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: responseClone.headers,
        status: responseClone.status,
        statusText: responseClone.statusText
      });
    });
  });

  const fetchUsingNetwork = _async(function (request) {
    const controller = new AbortController();
    const signal = controller.signal;
    return _catch(function () {
      return _await(fetch(request, {
        signal
      }));
    }, function (e) {
      // abort request in any case
      // I don't know how useful this is ?
      controller.abort();
      throw e;
    });
  });

  const getCache = _async(function () {
    return self.caches.open(cacheName);
  });
};

const createLogger = _ref7 => {
  let logLevel = _ref7.logLevel,
      logsBackgroundColor = _ref7.logsBackgroundColor;

  const prefixArgs = function prefixArgs() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return ["%csw", "background: ".concat(logsBackgroundColor, "; color: black; padding: 1px 3px; margin: 0 1px"), ...args];
  };

  const createLogMethod = method => function () {
    return console[method](...prefixArgs(...arguments));
  };

  const debug = createLogMethod("debug");
  const info = createLogMethod("info");
  const warn = createLogMethod("warn");
  const error = createLogMethod("error");

  const noop = () => {};

  if (logLevel === "debug") {
    return {
      debug,
      info,
      warn,
      error
    };
  }

  if (logLevel === "info") {
    return {
      debug: noop,
      info,
      warn,
      error
    };
  }

  if (logLevel === "warn") {
    return {
      debug: noop,
      info: noop,
      warn,
      error
    };
  }

  if (logLevel === "error") {
    return {
      debug: noop,
      info: noop,
      warn: noop,
      error
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

const getCacheName = _ref8 => {
  let cachePrefix = _ref8.cachePrefix;
  return "".concat(cachePrefix).concat(generateCacheId());
};

const base = 36;
const blockSize = 4;
const discreteValues = Math.pow(base, blockSize);

const pad = (number, size) => {
  var s = "000000000".concat(number);
  return s.substr(s.length - size);
};

const getRandomValue = (() => {
  const _self = self,
        crypto = _self.crypto;

  if (crypto) {
    const lim = Math.pow(2, 32) - 1;
    return () => {
      return Math.abs(crypto.getRandomValues(new Uint32Array(1))[0] / lim);
    };
  }

  return Math.random;
})();

const randomBlock = () => {
  return pad((getRandomValue() * discreteValues << 0).toString(base), blockSize);
};

const generateCacheId = () => {
  const timestamp = new Date().getTime().toString(base);
  const random = "".concat(randomBlock()).concat(randomBlock());
  return "".concat(timestamp).concat(random);
};

const createUrlResolver = () => {
  const resolve = string => String(new URL(string, self.location));

  return {
    resolve
  };
};

const createUrlActions = _ref9 => {
  let generatedUrlsConfig = _ref9.generatedUrlsConfig,
      manualUrlsConfig = _ref9.manualUrlsConfig,
      urlResolver = _ref9.urlResolver;

  const urlsConfig = _objectSpread(_objectSpread({}, generatedUrlsConfig), manualUrlsConfig);

  const urlsToCacheOnInstall = [];
  const urlsToReloadOnInstall = [];
  const urlMapping = {};
  const urls = [];
  Object.keys(urlsConfig, key => {
    const url = urlResolver.resolve(key);

    if (urls.includes(url)) {
      return;
    }

    urls.push(url);
    let urlConfig = urlsConfig[key];
    if (!urlConfig) urlConfig = {
      cache: false
    };
    if (urlConfig === true) urlConfig = {
      cache: true
    };
    const _urlConfig = urlConfig,
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
    urlsToCacheOnInstall,
    urlsToReloadOnInstall,
    urlMapping
  };
};

const redirectRequest = _async(function (request, url) {
  const mode = request.mode; // see https://github.com/GoogleChrome/workbox/issues/1796

  if (mode !== "navigate") {
    return new Request(url, request);
  }

  const requestClone = request.clone();
  const body = requestClone.body,
        credentials = requestClone.credentials,
        headers = requestClone.headers,
        integrity = requestClone.integrity,
        referrer = requestClone.referrer,
        referrerPolicy = requestClone.referrerPolicy;
  const bodyPromise = body ? Promise.resolve(body) : requestClone.blob();
  return _await(bodyPromise, function (bodyValue) {
    const requestMutated = new Request(url, {
      body: bodyValue,
      credentials,
      headers,
      integrity,
      referrer,
      referrerPolicy,
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
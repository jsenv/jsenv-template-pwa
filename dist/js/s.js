/*
* SJS 6.12.1
* Minimal SystemJS Build
*/
(function () {
  function errMsg(errCode, msg) {
    return (msg || "") + " (SystemJS https://git.io/JvFET#" + errCode + ")";
  }

  var hasSymbol = typeof Symbol !== 'undefined';
  var hasSelf = typeof self !== 'undefined';
  var hasDocument = typeof document !== 'undefined';
  var envGlobal = hasSelf ? self : global;
  var baseUrl;

  if (hasDocument) {
    var baseEl = document.querySelector('base[href]');
    if (baseEl) baseUrl = baseEl.href;
  }

  if (!baseUrl && typeof location !== 'undefined') {
    baseUrl = location.href.split('#')[0].split('?')[0];
    var lastSepIndex = baseUrl.lastIndexOf('/');
    if (lastSepIndex !== -1) baseUrl = baseUrl.slice(0, lastSepIndex + 1);
  }

  var backslashRegEx = /\\/g;

  function resolveIfNotPlainOrUrl(relUrl, parentUrl) {
    if (relUrl.indexOf('\\') !== -1) relUrl = relUrl.replace(backslashRegEx, '/'); // protocol-relative

    if (relUrl[0] === '/' && relUrl[1] === '/') {
      return parentUrl.slice(0, parentUrl.indexOf(':') + 1) + relUrl;
    } // relative-url
    else if (relUrl[0] === '.' && (relUrl[1] === '/' || relUrl[1] === '.' && (relUrl[2] === '/' || relUrl.length === 2 && (relUrl += '/')) || relUrl.length === 1 && (relUrl += '/')) || relUrl[0] === '/') {
      var parentProtocol = parentUrl.slice(0, parentUrl.indexOf(':') + 1); // Disabled, but these cases will give inconsistent results for deep backtracking
      //if (parentUrl[parentProtocol.length] !== '/')
      //  throw Error('Cannot resolve');
      // read pathname from parent URL
      // pathname taken to be part after leading "/"

      var pathname;

      if (parentUrl[parentProtocol.length + 1] === '/') {
        // resolving to a :// so we need to read out the auth and host
        if (parentProtocol !== 'file:') {
          pathname = parentUrl.slice(parentProtocol.length + 2);
          pathname = pathname.slice(pathname.indexOf('/') + 1);
        } else {
          pathname = parentUrl.slice(8);
        }
      } else {
        // resolving to :/ so pathname is the /... part
        pathname = parentUrl.slice(parentProtocol.length + (parentUrl[parentProtocol.length] === '/'));
      }

      if (relUrl[0] === '/') return parentUrl.slice(0, parentUrl.length - pathname.length - 1) + relUrl; // join together and split for removal of .. and . segments
      // looping the string instead of anything fancy for perf reasons
      // '../../../../../z' resolved to 'x/y' is just 'z'

      var segmented = pathname.slice(0, pathname.lastIndexOf('/') + 1) + relUrl;
      var output = [];
      var segmentIndex = -1;

      for (var i = 0; i < segmented.length; i++) {
        // busy reading a segment - only terminate on '/'
        if (segmentIndex !== -1) {
          if (segmented[i] === '/') {
            output.push(segmented.slice(segmentIndex, i + 1));
            segmentIndex = -1;
          }
        } // new segment - check if it is relative
        else if (segmented[i] === '.') {
          // ../ segment
          if (segmented[i + 1] === '.' && (segmented[i + 2] === '/' || i + 2 === segmented.length)) {
            output.pop();
            i += 2;
          } // ./ segment
          else if (segmented[i + 1] === '/' || i + 1 === segmented.length) {
            i += 1;
          } else {
            // the start of a new segment as below
            segmentIndex = i;
          }
        } // it is the start of a new segment
        else {
          segmentIndex = i;
        }
      } // finish reading out the last segment


      if (segmentIndex !== -1) output.push(segmented.slice(segmentIndex));
      return parentUrl.slice(0, parentUrl.length - pathname.length) + output.join('');
    }
  }
  /*
   * Import maps implementation
   *
   * To make lookups fast we pre-resolve the entire import map
   * and then match based on backtracked hash lookups
   *
   */


  function resolveUrl(relUrl, parentUrl) {
    return resolveIfNotPlainOrUrl(relUrl, parentUrl) || (relUrl.indexOf(':') !== -1 ? relUrl : resolveIfNotPlainOrUrl('./' + relUrl, parentUrl));
  }

  function resolveAndComposePackages(packages, outPackages, baseUrl, parentMap, parentUrl) {
    for (var p in packages) {
      var resolvedLhs = resolveIfNotPlainOrUrl(p, baseUrl) || p;
      var rhs = packages[p]; // package fallbacks not currently supported

      if (typeof rhs !== 'string') continue;
      var mapped = resolveImportMap(parentMap, resolveIfNotPlainOrUrl(rhs, baseUrl) || rhs, parentUrl);

      if (!mapped) {
        targetWarning('W1', p, rhs);
      } else outPackages[resolvedLhs] = mapped;
    }
  }

  function resolveAndComposeImportMap(json, baseUrl, outMap) {
    if (json.imports) resolveAndComposePackages(json.imports, outMap.imports, baseUrl, outMap, null);
    var u;

    for (u in json.scopes || {}) {
      var resolvedScope = resolveUrl(u, baseUrl);
      resolveAndComposePackages(json.scopes[u], outMap.scopes[resolvedScope] || (outMap.scopes[resolvedScope] = {}), baseUrl, outMap, resolvedScope);
    }

    for (u in json.depcache || {}) outMap.depcache[resolveUrl(u, baseUrl)] = json.depcache[u];

    for (u in json.integrity || {}) outMap.integrity[resolveUrl(u, baseUrl)] = json.integrity[u];
  }

  function getMatch(path, matchObj) {
    if (matchObj[path]) return path;
    var sepIndex = path.length;

    do {
      var segment = path.slice(0, sepIndex + 1);
      if (segment in matchObj) return segment;
    } while ((sepIndex = path.lastIndexOf('/', sepIndex - 1)) !== -1);
  }

  function applyPackages(id, packages) {
    var pkgName = getMatch(id, packages);

    if (pkgName) {
      var pkg = packages[pkgName];
      if (pkg === null) return;

      if (id.length > pkgName.length && pkg[pkg.length - 1] !== '/') {
        targetWarning('W2', pkgName, pkg);
      } else return pkg + id.slice(pkgName.length);
    }
  }

  function targetWarning(code, match, target, msg) {
    console.warn(errMsg(code, [target, match].join(', ')));
  }

  function resolveImportMap(importMap, resolvedOrPlain, parentUrl) {
    var scopes = importMap.scopes;
    var scopeUrl = parentUrl && getMatch(parentUrl, scopes);

    while (scopeUrl) {
      var packageResolution = applyPackages(resolvedOrPlain, scopes[scopeUrl]);
      if (packageResolution) return packageResolution;
      scopeUrl = getMatch(scopeUrl.slice(0, scopeUrl.lastIndexOf('/')), scopes);
    }

    return applyPackages(resolvedOrPlain, importMap.imports) || resolvedOrPlain.indexOf(':') !== -1 && resolvedOrPlain;
  }
  /*
   * SystemJS Core
   * 
   * Provides
   * - System.import
   * - System.register support for
   *     live bindings, function hoisting through circular references,
   *     reexports, dynamic import, import.meta.url, top-level await
   * - System.getRegister to get the registration
   * - Symbol.toStringTag support in Module objects
   * - Hookable System.createContext to customize import.meta
   * - System.onload(err, id, deps) handler for tracing / hot-reloading
   * 
   * Core comes with no System.prototype.resolve or
   * System.prototype.instantiate implementations
   */


  var toStringTag = hasSymbol && Symbol.toStringTag;
  var REGISTRY = hasSymbol ? Symbol() : '@';

  function SystemJS() {
    this[REGISTRY] = {};
  }

  var systemJSPrototype = SystemJS.prototype;

  systemJSPrototype.import = function (id, parentUrl) {
    var loader = this;
    return Promise.resolve(loader.prepareImport()).then(function () {
      return loader.resolve(String(id), parentUrl);
    }).then(function (id) {
      var load = getOrCreateLoad(loader, id);
      return load.C || topLevelLoad(loader, load);
    });
  }; // Hookable createContext function -> allowing eg custom import meta


  systemJSPrototype.createContext = function (parentId) {
    var loader = this;
    return {
      url: parentId,
      resolve: function resolve(id, parentUrl) {
        return Promise.resolve(loader.resolve(id, parentUrl || parentId));
      }
    };
  };

  function loadToId(load) {
    return load.id;
  }

  function triggerOnload(loader, load, err, isErrSource) {
    loader.onload(err, load.id, load.d && load.d.map(loadToId), !!isErrSource);
    if (err) throw err;
  }

  var lastRegister;

  systemJSPrototype.register = function (deps, declare) {
    lastRegister = [deps, declare];
  };
  /*
   * getRegister provides the last anonymous System.register call
   */


  systemJSPrototype.getRegister = function () {
    var _lastRegister = lastRegister;
    lastRegister = undefined;
    return _lastRegister;
  };

  function getOrCreateLoad(loader, id, firstParentUrl) {
    var load = loader[REGISTRY][id];
    if (load) return load;
    var importerSetters = [];
    var ns = Object.create(null);
    if (toStringTag) Object.defineProperty(ns, toStringTag, {
      value: 'Module'
    });
    var instantiatePromise = Promise.resolve().then(function () {
      return loader.instantiate(id, firstParentUrl);
    }).then(function (registration) {
      if (!registration) throw Error(errMsg(2, id));

      function _export(name, value) {
        // note if we have hoisted exports (including reexports)
        load.h = true;
        var changed = false;

        if (typeof name === 'string') {
          if (!(name in ns) || ns[name] !== value) {
            ns[name] = value;
            changed = true;
          }
        } else {
          for (var p in name) {
            var value = name[p];

            if (!(p in ns) || ns[p] !== value) {
              ns[p] = value;
              changed = true;
            }
          }

          if (name && name.__esModule) {
            ns.__esModule = name.__esModule;
          }
        }

        if (changed) for (var i = 0; i < importerSetters.length; i++) {
          var setter = importerSetters[i];
          if (setter) setter(ns);
        }
        return value;
      }

      var declared = registration[1](_export, registration[1].length === 2 ? {
        import: function _import(importId) {
          return loader.import(importId, id);
        },
        meta: loader.createContext(id)
      } : undefined);

      load.e = declared.execute || function () {};

      return [registration[0], declared.setters || []];
    }, function (err) {
      load.e = null;
      load.er = err;
      throw err;
    });
    var linkPromise = instantiatePromise.then(function (instantiation) {
      return Promise.all(instantiation[0].map(function (dep, i) {
        var setter = instantiation[1][i];
        return Promise.resolve(loader.resolve(dep, id)).then(function (depId) {
          var depLoad = getOrCreateLoad(loader, depId, id); // depLoad.I may be undefined for already-evaluated

          return Promise.resolve(depLoad.I).then(function () {
            if (setter) {
              depLoad.i.push(setter); // only run early setters when there are hoisted exports of that module
              // the timing works here as pending hoisted export calls will trigger through importerSetters

              if (depLoad.h || !depLoad.I) setter(depLoad.n);
            }

            return depLoad;
          });
        });
      })).then(function (depLoads) {
        load.d = depLoads;
      });
    }); // Capital letter = a promise function

    return load = loader[REGISTRY][id] = {
      id: id,
      // importerSetters, the setters functions registered to this dependency
      // we retain this to add more later
      i: importerSetters,
      // module namespace object
      n: ns,
      // instantiate
      I: instantiatePromise,
      // link
      L: linkPromise,
      // whether it has hoisted exports
      h: false,
      // On instantiate completion we have populated:
      // dependency load records
      d: undefined,
      // execution function
      e: undefined,
      // On execution we have populated:
      // the execution error if any
      er: undefined,
      // in the case of TLA, the execution promise
      E: undefined,
      // On execution, L, I, E cleared
      // Promise for top-level completion
      C: undefined,
      // parent instantiator / executor
      p: undefined
    };
  }

  function instantiateAll(loader, load, parent, loaded) {
    if (!loaded[load.id]) {
      loaded[load.id] = true; // load.L may be undefined for already-instantiated

      return Promise.resolve(load.L).then(function () {
        if (!load.p || load.p.e === null) load.p = parent;
        return Promise.all(load.d.map(function (dep) {
          return instantiateAll(loader, dep, parent, loaded);
        }));
      }).catch(function (err) {
        if (load.er) throw err;
        load.e = null;
        throw err;
      });
    }
  }

  function topLevelLoad(loader, load) {
    return load.C = instantiateAll(loader, load, load, {}).then(function () {
      return postOrderExec(loader, load, {});
    }).then(function () {
      return load.n;
    });
  } // the closest we can get to call(undefined)


  var nullContext = Object.freeze(Object.create(null)); // returns a promise if and only if a top-level await subgraph
  // throws on sync errors

  function postOrderExec(loader, load, seen) {
    if (seen[load.id]) return;
    seen[load.id] = true;

    if (!load.e) {
      if (load.er) throw load.er;
      if (load.E) return load.E;
      return;
    } // deps execute first, unless circular


    var depLoadPromises;
    load.d.forEach(function (depLoad) {
      try {
        var depLoadPromise = postOrderExec(loader, depLoad, seen);
        if (depLoadPromise) (depLoadPromises = depLoadPromises || []).push(depLoadPromise);
      } catch (err) {
        load.e = null;
        load.er = err;
        throw err;
      }
    });
    if (depLoadPromises) return Promise.all(depLoadPromises).then(doExec);
    return doExec();

    function doExec() {
      try {
        var execPromise = load.e.call(nullContext);

        if (execPromise) {
          execPromise = execPromise.then(function () {
            load.C = load.n;
            load.E = null; // indicates completion

            if (!true) ;
          }, function (err) {
            load.er = err;
            load.E = null;
            if (!true) ;
            throw err;
          });
          return load.E = execPromise;
        } // (should be a promise, but a minify optimization to leave out Promise.resolve)


        load.C = load.n;
        load.L = load.I = undefined;
      } catch (err) {
        load.er = err;
        throw err;
      } finally {
        load.e = null;
      }
    }
  }

  envGlobal.System = new SystemJS();
  /*
   * SystemJS browser attachments for script and import map processing
   */

  var importMapPromise = Promise.resolve();
  var importMap = {
    imports: {},
    scopes: {},
    depcache: {},
    integrity: {}
  };
  systemJSPrototype.importMap = importMap;
  systemJSPrototype.baseUrl = baseUrl; // Scripts are processed immediately, on the first System.import, and on DOMReady.
  // Import map scripts are processed only once (by being marked) and in order for each phase.
  // This is to avoid using DOM mutation observers in core, although that would be an alternative.

  var processFirst = hasDocument;

  systemJSPrototype.prepareImport = function (doProcessScripts) {
    if (processFirst || doProcessScripts) {
      processScripts();
      processFirst = false;
    }

    return importMapPromise;
  };

  if (hasDocument) {
    processScripts();
    window.addEventListener('DOMContentLoaded', processScripts);
  }

  function processScripts() {
    [].forEach.call(document.querySelectorAll('script'), function (script) {
      if (script.sp) // sp marker = systemjs processed
        return; // TODO: deprecate systemjs-module in next major now that we have auto import

      if (script.type === 'systemjs-module') {
        script.sp = true;
        if (!script.src) return;
        System.import(script.src.slice(0, 7) === 'import:' ? script.src.slice(7) : resolveUrl(script.src, baseUrl)).catch(function (e) {
          // if there is a script load error, dispatch an "error" event
          // on the script tag.
          if (e.message.indexOf('https://git.io/JvFET#3') > -1) {
            var event = document.createEvent('Event');
            event.initEvent('error', false, false);
            script.dispatchEvent(event);
          }

          return Promise.reject(e);
        });
      } else if (script.type === 'systemjs-importmap') {
        script.sp = true; // The passThrough property is for letting the module types fetch implementation know that this is not a SystemJS module.

        var fetchPromise = script.src ? (System.fetch || fetch)(script.src, {
          integrity: script.integrity,
          passThrough: true
        }).then(function (res) {
          if (!res.ok) throw Error(res.status);
          return res.text();
        }).catch(function (err) {
          err.message = errMsg('W4', script.src) + '\n' + err.message;
          console.warn(err);

          if (typeof script.onerror === 'function') {
            script.onerror();
          }

          return '{}';
        }) : script.innerHTML;
        importMapPromise = importMapPromise.then(function () {
          return fetchPromise;
        }).then(function (text) {
          extendImportMap(importMap, text, script.src || baseUrl);
          return importMap;
        });
      }
    });
  }

  function extendImportMap(importMap, newMapText, newMapUrl) {
    var newMap = {};

    try {
      newMap = JSON.parse(newMapText);
    } catch (err) {
      console.warn(Error(errMsg('W5')));
    }

    resolveAndComposeImportMap(newMap, newMapUrl, importMap);
  }

  System.extendImportMap = extendImportMap;
  /*
   * Script instantiation loading
   */

  if (hasDocument) {
    window.addEventListener('error', function (evt) {
      lastWindowErrorUrl = evt.filename;
      lastWindowError = evt.error;
    });
    var baseOrigin = location.origin;
  }

  systemJSPrototype.createScript = function (url) {
    var script = document.createElement('script');
    script.async = true; // Only add cross origin for actual cross origin
    // this is because Safari triggers for all
    // - https://bugs.webkit.org/show_bug.cgi?id=171566

    if (url.indexOf(baseOrigin + '/')) script.crossOrigin = 'anonymous';
    var integrity = importMap.integrity[url];
    if (integrity) script.integrity = integrity;
    script.src = url;
    return script;
  }; // Auto imports -> script tags can be inlined directly for load phase


  var lastAutoImportDeps, lastAutoImportTimeout;
  var autoImportCandidates = {};
  var systemRegister = systemJSPrototype.register;
  var inlineScriptCount = 0;

  systemJSPrototype.register = function (deps, declare, autoUrl) {
    if (hasDocument && document.readyState === 'loading' && typeof deps !== 'string') {
      var scripts = document.querySelectorAll('script');
      var lastScript = scripts[scripts.length - 1];
      var lastAutoImportUrl;
      lastAutoImportDeps = deps;

      if (lastScript && lastScript.src) {
        lastAutoImportUrl = lastScript.src;
      } else if (autoUrl) {
        lastAutoImportUrl = autoUrl;
      } else {
        inlineScriptCount++;
        lastAutoImportUrl = document.location.href + "__inline_script__" + inlineScriptCount;
      } // if this is already a System load, then the instantiate has already begun
      // so this re-import has no consequence


      var loader = this;
      lastAutoImportTimeout = setTimeout(function () {
        autoImportCandidates[lastAutoImportUrl] = [deps, declare];
        loader.import(lastAutoImportUrl);
      });
    } else {
      lastAutoImportDeps = undefined;
    }

    return systemRegister.call(this, deps, declare);
  };

  var lastWindowErrorUrl, lastWindowError;

  systemJSPrototype.instantiate = function (url, firstParentUrl) {
    var autoImportRegistration = autoImportCandidates[url];

    if (autoImportRegistration) {
      delete autoImportCandidates[url];
      return autoImportRegistration;
    }

    var loader = this;
    return Promise.resolve(systemJSPrototype.createScript(url)).then(function (script) {
      return new Promise(function (resolve, reject) {
        script.addEventListener('error', function () {
          reject(Error(errMsg(3, [url, firstParentUrl].join(', '))));
        });
        script.addEventListener('load', function () {
          document.head.removeChild(script); // Note that if an error occurs that isn't caught by this if statement,
          // that getRegister will return null and a "did not instantiate" error will be thrown.

          if (lastWindowErrorUrl === url) {
            reject(lastWindowError);
          } else {
            var register = loader.getRegister(url); // Clear any auto import registration for dynamic import scripts during load

            if (register && register[0] === lastAutoImportDeps) clearTimeout(lastAutoImportTimeout);
            resolve(register);
          }
        });
        document.head.appendChild(script);
      });
    });
  };
  /*
   * Fetch loader, sets up shouldFetch and fetch hooks
   */


  systemJSPrototype.shouldFetch = function () {
    return false;
  };

  if (typeof fetch !== 'undefined') systemJSPrototype.fetch = fetch;
  var instantiate = systemJSPrototype.instantiate;
  var jsContentTypeRegEx = /^(text|application)\/(x-)?javascript(;|$)/;

  systemJSPrototype.instantiate = function (url, parent) {
    var loader = this;
    if (!this.shouldFetch(url)) return instantiate.apply(this, arguments);
    return this.fetch(url, {
      credentials: 'same-origin',
      integrity: importMap.integrity[url]
    }).then(function (res) {
      if (!res.ok) throw Error(errMsg(7, [res.status, res.statusText, url, parent].join(', ')));
      var contentType = res.headers.get('content-type');
      if (!contentType || !jsContentTypeRegEx.test(contentType)) throw Error(errMsg(4, contentType));
      return res.text().then(function (source) {
        if (source.indexOf('//# sourceURL=') < 0) source += '\n//# sourceURL=' + url;
        (0, eval)(source);
        return loader.getRegister(url);
      });
    });
  };

  systemJSPrototype.resolve = function (id, parentUrl) {
    parentUrl = parentUrl || !true || baseUrl;
    return resolveImportMap(importMap, resolveIfNotPlainOrUrl(id, parentUrl) || id, parentUrl) || throwUnresolved(id, parentUrl);
  };

  function throwUnresolved(id, parentUrl) {
    throw Error(errMsg(8, [id, parentUrl].join(', ')));
  }

  var systemInstantiate = systemJSPrototype.instantiate;

  systemJSPrototype.instantiate = function (url, firstParentUrl) {
    var preloads = importMap.depcache[url];

    if (preloads) {
      for (var i = 0; i < preloads.length; i++) getOrCreateLoad(this, this.resolve(preloads[i], url), url);
    }

    return systemInstantiate.call(this, url, firstParentUrl);
  };
  /*
   * Supports loading System.register in workers
   */


  if (hasSelf && typeof importScripts === 'function') {
    systemJSPrototype.instantiate = function (url) {
      var loader = this;
      return self.fetch(url, {
        credentials: 'same-origin'
      }).then(function (response) {
        if (!response.ok) {
          throw Error(errMsg(7, [response.status, response.statusText, url].join(', ')));
        }

        return response.text();
      }).then(function (source) {
        if (source.indexOf('//# sourceURL=') < 0) source += '\n//# sourceURL=' + url;
        (0, eval)(source);
        return loader.getRegister(url);
      });
    };
  }
})();

(function () {
  var envGlobal = typeof self !== 'undefined' ? self : global;
  var System = envGlobal.System;
  var registerRegistry = Object.create(null);
  var register = System.register;
  System.registerRegistry = registerRegistry;

  System.register = function (name, deps, declare) {
    if (typeof name !== 'string') return register.apply(this, arguments);
    var define = [deps, declare];
    return System.prepareImport().then(function () {
      var url = System.resolve("./".concat(name));
      registerRegistry[url] = define;
      return register.call(System, deps, declare, url);
    });
  };

  var instantiate = System.instantiate;

  System.instantiate = function (url, firstParentUrl) {
    var result = registerRegistry[url];

    if (result) {
      registerRegistry[url] = null;
      return result;
    } else {
      return instantiate.call(this, url, firstParentUrl);
    }
  };

  var getRegister = System.getRegister;

  System.getRegister = function (url) {
    // Calling getRegister() because other extras need to know it was called so they can perform side effects
    var register = getRegister.call(this, url);
    var result = registerRegistry[url] || register;
    return result;
  };
})();

(function () {
  // worker or service worker
  if (typeof WorkerGlobalScope === 'function' && self instanceof WorkerGlobalScope) {
    /*
     * SystemJs loads X files before executing the worker/service worker main file
     * It mean events dispatched during this phase could be missed
     * A warning like the one below is displayed in chrome devtools:
     * "Event handler of 'install' event must be added on the initial evaluation of worker script"
     * To fix that code below listen for these events early and redispatch them later
     * once the worker file is executed (the listeners are installed)
    */
    var firstRegisterCallbacks = [];
    var isServiceWorker = typeof self.skipWaiting === 'function';

    if (isServiceWorker) {
      // for service worker there is more events to listen
      // and, to get rid of the warning, we override self.addEventListener
      var eventsToCatch = ['message', 'install', 'activate', 'fetch'];
      var eventCallbackProxies = {};
      var firstRegisterPromise = new Promise(resolve => {
        firstRegisterCallbacks.push(resolve);
      });
      eventsToCatch.forEach(function (eventName) {
        var eventsToDispatch = [];

        var eventCallback = function eventCallback(event) {
          const eventCallbackProxy = eventCallbackProxies[event.type];

          if (eventCallbackProxy) {
            eventCallbackProxy(event);
          } else {
            eventsToDispatch.push(event);
            event.waitUntil(firstRegisterPromise);
          }
        };

        self.addEventListener(eventName, eventCallback);
        firstRegisterCallbacks.push(function () {
          if (eventsToDispatch.length) {
            const eventCallbackProxy = eventCallbackProxies[eventsToDispatch[0].type];

            if (eventCallbackProxy) {
              eventsToDispatch.forEach(function (event) {
                eventCallbackProxy(event);
              });
            }

            eventsToDispatch.length = 0;
          }
        });
      });
      var addEventListener = self.addEventListener;

      self.addEventListener = function (eventName, callback, options) {
        if (eventsToCatch.indexOf(eventName) > -1) {
          eventCallbackProxies[eventName] = callback;
          return;
        }

        return addEventListener.call(self, eventName, callback, options);
      };
    } else {
      var eventsToCatch = ['message'];
      eventsToCatch.forEach(function (eventName) {
        var eventQueue = [];

        var eventCallback = event => {
          eventQueue.push(event);
        };

        self.addEventListener(eventName, eventCallback);
        firstRegisterCallbacks.push(function () {
          self.removeEventListener(eventName, eventCallback);
          eventQueue.forEach(function (event) {
            self.dispatchEvent(event);
          });
          eventQueue.length = 0;
        });
      });
    } // auto import first register


    var register = System.register;

    System.register = function (deps, declare) {
      System.register = register;
      System.registerRegistry[self.location.href] = [deps, declare];
      return System.import(self.location.href).then(result => {
        firstRegisterCallbacks.forEach(firstRegisterCallback => {
          firstRegisterCallback();
        });
        firstRegisterCallbacks.length = 0;
        return result;
      });
    };
  }
})();
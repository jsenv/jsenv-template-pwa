System.register([], function (_export, _context) {
  "use strict";

  var loadCSSAndFonts, injectCSS, nextIDLEPromise, loadApp, importApp, loadBannana, loadGorilla, loadJungle;

  function _async$1(f) {
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

  function _await$1(value, then, direct) {
    if (direct) {
      return then ? then(value) : value;
    }

    if (!value || !value.then) {
      value = Promise.resolve(value);
    }

    return then ? value.then(then) : value;
  }

  function _empty$1() {}

  function _invokeIgnored(body) {
    var result = body();

    if (result && result.then) {
      return result.then(_empty$1);
    }
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

  function _continueIgnored(value) {
    if (value && value.then) {
      return value.then(_empty$1);
    }
  }

  /**
   * This is where you can orchestrate the loading of your application
   */
  function _call(body, then, direct) {
    if (direct) {
      return then ? then(body()) : body();
    }

    try {
      var result = Promise.resolve(body());
      return then ? result.then(then) : result;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  function _await(value, then, direct) {
    if (direct) {
      return then ? then(value) : value;
    }

    if (!value || !value.then) {
      value = Promise.resolve(value);
    }

    return then ? value.then(then) : value;
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

  function _empty() {}

  function _callIgnored(body, direct) {
    return _call(body, _empty, direct);
  }

  return {
    setters: [],
    execute: function () {
      loadCSSAndFonts = _async$1(function (cssUrl) {
        let _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref$timeout = _ref.timeout,
            timeout = _ref$timeout === void 0 ? 1000 : _ref$timeout,
            _ref$onCssReady = _ref.onCssReady,
            onCssReady = _ref$onCssReady === void 0 ? () => {} : _ref$onCssReady,
            _ref$onFontsReady = _ref.onFontsReady,
            onFontsReady = _ref$onFontsReady === void 0 ? () => {} : _ref$onFontsReady;

        const loadedPromise = _async$1(function () {
          return _continueIgnored(_catch(function () {
            return _await$1(injectCSS(cssUrl), function () {
              onCssReady();
              return _invokeIgnored(function () {
                if (onFontsReady) {
                  return _await$1(document.fonts.ready, function () {
                    onFontsReady();
                  });
                }
              });
            });
          }, function () {}));
        })();

        return Promise.race([loadedPromise, new Promise(resolve => {
          setTimeout(resolve, timeout);
        })]);
      });

      injectCSS = function injectCSS(cssUrl) {
        let _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            crossOrigin = _ref2.crossOrigin;

        return new Promise((resolve, reject) => {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.onload = resolve;
          link.onerror = reject;
          link.href = cssUrl;
          link.crossOrigin = crossOrigin;
          document.head.appendChild(link);
        });
      };

      nextIDLEPromise = window.requestIdleCallback ? function () {
        let _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref3$timeout = _ref3.timeout,
            timeout = _ref3$timeout === void 0 ? 60 : _ref3$timeout;

        return new Promise(resolve => {
          window.requestIdleCallback(resolve, {
            timeout
          });
        });
      } : () => {
        return new Promise(resolve => {
          window.requestAnimationFrame(resolve);
        });
      };

      _export("loadApp", loadApp = _async(function (_ref) {
        let appNode = _ref.appNode;
        performance.measure("loading app"); // try to load CSS + get the main fonts before displaying any text
        // to avoid font swapping if possible
        // give max 400ms for this

        const appLoaderCssPromise = loadCSSAndFonts(new URL(__v__("/css/app_loader.css"), _context.meta.url), {
          timeout: 400,
          onCssReady: () => {
            performance.measure("app_loader.css ready");
          },
          onFontsReady: () => {
            performance.measure("fonts ready");
          }
        }); // start importing app right away

        const appPromise = importApp({
          onJsReady: () => {
            performance.measure("app.js ready");
          }
        });
        const appCSSPromise = loadCSSAndFonts(new URL(__v__("/css/app.css"), _context.meta.url), {
          onCssReady: () => {
            performance.measure("app.css ready");
          }
        });
        return _await(appLoaderCssPromise, function () {
          return _call(loadBannana, function () {
            return _await(appPromise, function (app) {
              performance.measure("rendering app");
              app.render({
                appNode
              });
              performance.measure("app rendered");
              return _await(appCSSPromise, function () {
                // app.render() can be very expensive so we wait a bit
                // to let navigator an opportunity to cooldown
                // This should help to save battery power and RAM
                return _call(nextIDLEPromise, function () {
                  performance.measure("app displayed");
                });
              });
            });
          });
        });
      }));

      importApp = _async(function (_ref2) {
        let _ref2$onJsReady = _ref2.onJsReady,
            onJsReady = _ref2$onJsReady === void 0 ? () => {} : _ref2$onJsReady;
        return _await(_context.import(__v__("/js/app.es5.js")), function (app) {
          onJsReady();
          return app;
        });
      }); // The 3 functions below simulates the app needs to load 3 things
      // before being ready to be displayed.
      // To keep them generic the functions are just doing a setTimeout
      // in practice you would:
      // - perform http request
      // - load assets
      // - preload external libraries
      // - etc...

      loadBannana = _async(function () {
        return _await(new Promise(resolve => {
          setTimeout(resolve, 20);
        }), function () {
          performance.measure("\"loading bannana...\" done");
          return _callIgnored(loadGorilla);
        });
      });
      loadGorilla = _async(function () {
        return _await(new Promise(resolve => {
          setTimeout(resolve, 30);
        }), function () {
          performance.measure("\"loading gorilla...\" done");
          return _callIgnored(loadJungle);
        });
      });
      loadJungle = _async(function () {
        return _await(new Promise(resolve => {
          setTimeout(resolve, 20);
        }), function () {
          performance.measure("\"loading jungle...\" done");
        });
      });
    }
  };
});
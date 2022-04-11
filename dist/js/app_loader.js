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

function _empty() {}

function _invokeIgnored(body) {
  var result = body();

  if (result && result.then) {
    return result.then(_empty);
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
    return value.then(_empty);
  }
}

const loadCSSAndFonts = _async$1(function (cssUrl) {
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

const injectCSS = function injectCSS(cssUrl) {
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

const nextIDLEPromise = window.requestIdleCallback ? function () {
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

const loadApp = _async(function (_ref) {
  let updateSplashscreenText = _ref.updateSplashscreenText;
  // to avoid font swapping if possible
  // give max 400ms for this


  const appLoaderCssPromise = loadCSSAndFonts(new URL(__v__("/css/app_loader.css"), import.meta.url), {
    timeout: 400,
    onCssReady: () => {
    },
    onFontsReady: () => {
    }
  }); // start importing app right away

  const appPromise = importApp({
    onJsReady: () => {
    }
  });
  const appCSSPromise = loadCSSAndFonts(new URL(__v__("/css/app.css"), import.meta.url), {
    onCssReady: () => {
    }
  });
  return _await(appLoaderCssPromise, function () {
    return _await(updateSplashscreenText("Loading banana..."), function () {

      return _await(new Promise(resolve => {
        setTimeout(resolve, 800);
      }), function () {
        updateSplashscreenText("Loading gorilla...");

        return _await(new Promise(resolve => {
          setTimeout(resolve, 1000);
        }), function () {
          updateSplashscreenText("Loading the entire jungle...");

          return _await(new Promise(resolve => {
            setTimeout(resolve, 1200);
          }), function () {
            return _await(appPromise, function (app) {

              app.render();
              return _await(appCSSPromise, function () {
                // app.render() can be very expensive so we wait a bit
                // to let navigator an opportunity to cooldown
                // This should help to save battery power and RAM
                return _call(nextIDLEPromise, function () {
                });
              });
            });
          });
        });
      });
    });
  });
});

const importApp = _async(function (_ref2) {
  let _ref2$onJsReady = _ref2.onJsReady,
      onJsReady = _ref2$onJsReady === void 0 ? () => {} : _ref2$onJsReady;
  return _await(import(__v__("/js/app.js")), function (app) {
    onJsReady();
    return app;
  });
});

export { loadApp };

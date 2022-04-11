function _empty() {}

/*
 * This file is inlined in the HTML file by [data-jsenv-force-inline]
 * Responsabilities:
 * - inject the dev ribbon in development mode
 * - Dynamic import of "app_loader.js" (fetch+parse+execute)
 *   - Catch error during the dynamic import
 *   - Display splashscreen during this dynamic import
 * - Call loadApp exported by "app_loader.js"
 *   - Provide an updateSplashscreenText
 *   - Hide splashscreen once app is ready to be displayed
 */
// When it take more than "BOOTING_SLOW"ms for loadApp to resolve or call updateSplashscreenText
// -> splashscreen displays <div id="booting_is_slow"> content
const BOOTING_SLOW = 2500; // When it takes less than "SPLASHIN_DELAY"ms for loadApp to resolve
// -> we won't even show the splashscreen (happens on user second visit because everything is in browser cache)

function _awaitIgnored(value, direct) {
  if (!direct) {
    return value && value.then ? value.then(_empty) : Promise.resolve();
  }
}

const SPLASHIN_DELAY = 300; // When less than "SPLASHOUT_MIN_INTERVAL"ms have ellapsed since splashin animation started
// -> code ensures "SPLASHOUT_MIN_INTERVAL"ms ellapses before playing the splashout animation
// This is to prevent a disturbing blink when loadApp resolves shortly after splashin animation

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

const SPLASHOUT_MIN_INTERVAL = 650;

function _invoke(body, then) {
  var result = body();

  if (result && result.then) {
    return result.then(then);
  }

  return then(result);
}

const appNode = document.querySelector("#app");

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

const splashscreenNode = document.querySelector("#splashscreen");

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

const BOOTING_START = "booting_start";

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

const BOOTING_IS_SLOW = "booting_is_slow";

function _callIgnored(body, direct) {
  return _call(body, _empty, direct);
}

const BOOTING_ERROR = "booting_error";

function _invokeIgnored(body) {
  var result = body();

  if (result && result.then) {
    return result.then(_empty);
  }
}

const boot = _async(function () {

  const bootStartMs = Date.now();
  let splashIsVisible = false;

  const splashin = () => {
    splashscreenNode.setAttribute("data-splashin", "");
    splashIsVisible = true;
  };

  const splashout = _async(function () {
    splashscreenNode.setAttribute("data-splashout", "");
    return _awaitIgnored(new Promise(resolve => {
      setTimeout(() => {
        splashIsVisible = false;
        resolve();
      }, 300);
    }));
  });

  const killSplashscreen = () => {
    // Here splashscreen is "killed" with display: 'none' but it could also
    // be removed from the DOM
    splashscreenNode.style.display = "none";
    splashIsVisible = false;
  };

  const splashInTimeout = setTimeout(splashin, SPLASHIN_DELAY);
  const bootingIsSlowTimeout = setTimeout(() => {
    setBootingState(BOOTING_IS_SLOW);
  }, BOOTING_SLOW);
  return _catch(function () {
    setBootingState(BOOTING_START);
    return _await(import(__v__("/js/app_loader.js")), function (_ref) {
      let loadApp = _ref.loadApp;
      return _await(loadApp({
        updateSplashscreenText: message => {
          clearTimeout(bootingIsSlowTimeout);
          const splashscreenMessageNode = document.querySelector("#splashscreen_message");
          splashscreenMessageNode.innerHTML = message;
        }
      }), function () {
        clearTimeout(splashInTimeout);
        clearTimeout(bootingIsSlowTimeout);

        if (!splashIsVisible) {
          appNode.removeAttribute("data-booting"); // app was super fast to load, splashscreen was not even displayed, cool

          killSplashscreen();
          return;
        }

        const splashInMs = bootStartMs + SPLASHIN_DELAY;
        const msEllapsedSinceSplashIn = Date.now() - splashInMs;
        return _invoke(function () {
          if (msEllapsedSinceSplashIn < SPLASHOUT_MIN_INTERVAL) {
            const msToWaitToPreventBlink = SPLASHOUT_MIN_INTERVAL - msEllapsedSinceSplashIn;
            return _awaitIgnored(new Promise(resolve => {
              setTimeout(resolve, msToWaitToPreventBlink);
            }));
          }
        }, function () {
          appNode.removeAttribute("data-booting"); // Wait the end of the "splashout" animation before killing splashscreen entirely

          return _call(splashout, function () {
            killSplashscreen();
          });
        });
      });
    });
  }, function (error) {
    clearTimeout(bootingIsSlowTimeout);
    setBootingState(BOOTING_ERROR, {
      errorStack: error.stack || "<No stack associated with this error> (Check devtools to get more info)"
    });
    throw error;
  });
});

const setBootingState = function setBootingState(nextBootingState) {
  let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const splashscreenMessageNode = document.querySelector("#splashscreen_message");
  splashscreenMessageNode.innerHTML = "";
  const variantModel = document.querySelector("#".concat(nextBootingState));
  const variantInstance = variantModel.cloneNode(true);
  replaceNodeVariables(variantInstance, data);
  splashscreenMessageNode.appendChild(variantInstance);
};

const replaceNodeVariables = (node, data) => {
  if (node.nodeName === "#text") {
    node.textContent = node.textContent.replace(/\${(\w*)}/g, (_, key) => {
      return data.hasOwnProperty(key) ? data[key] : "";
    });
    return;
  }

  Array.from(node.childNodes).forEach(node => {
    replaceNodeVariables(node, data);
  });
};

_invokeIgnored(function () {
  if (window.browserIsSupported) {
    _callIgnored(boot);
  }
});

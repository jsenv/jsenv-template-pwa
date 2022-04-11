const listenEvent = (objectWithEventEmitter, event, callback) => {
  objectWithEventEmitter.addEventListener(event, callback);
  return () => {
    objectWithEventEmitter.removeEventListener(event, callback);
  };
};

/**
 * - User can decide by himself to install the application from the browser toolbar.
 * - Or application code is allowed to prompt user to do so on a user interaction such
 * as after clicking on a button.
 * In these scenarios when user clicks install on that prompt displayed by the browser,
 * browser dispatch an "appinstalled" event.
 */
const listenAppInstalled = callback => {
  window.addEventListener("appinstalled", callback);
  return () => {
    window.removeEventListener("appinstalled", callback);
  };
}; // listenAppInstalled(() => {
//   document.querySelector("#install").disabled = true
// })

/**
 * displayModeStandalone can be used to know the current displayMode of
 * our web page is standalone (PWA)
 */
const displayModeStandalone = {
  get: () => window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches,
  listen: callback => {
    const media = window.matchMedia("(display-mode: standalone)");
    media.addListener(callback);
    return () => {
      media.removeListener(callback);
    };
  }
};

/**
  The following scenario is working:

  - user click install button -> browser shows add to home screen prompt
  - user click cancel on browser prompt
  - user click again install button -> browser shows again add to home screen prompt

  It's very easy to break this so that subsequent click does nothing.
  Nothing means browser always returns a "dimissed" user choice without asking user.
  I suspect chrome is trying to prevent malicious script to annoy user
  by calling prompt() many times.

  It's currently working because we don't hide beforeinstallpromptEvent behind a function.
  It would be hidden behind a function if we put it into react state or
  just by using a curried funciton like:

  beforeinstallpromptEvent
  const curriedFunction = () => {
    beforeinstallpromptEvent.prompt()
  }

  If we do so, chrome will always dismiss subsequent click on install button. (until page is reloaded).
  To avoid that we store the event on window.beforeinstallpromptEvent.
*/

function _await$1(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

let appInstalledEvent = false;

function _async$2(f) {
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

listenAppInstalled(() => {
  // prompt "becomes" unavailable if user installs app
  // it can happen if user installs app manually from browser toolbar
  // in that case there is no point showing the install
  // button in the ui
  appInstalledEvent = true;
});
const addToHomescreen = {
  isAvailable: () => {
    if (!window.beforeinstallpromptEvent) {
      return false;
    }

    if (displayModeStandalone.get()) {
      return false;
    }

    if (appInstalledEvent) {
      return false;
    }

    return true;
  },
  listenAvailabilityChange: callback => {
    let availablePrevious = addToHomescreen.isAvailable();

    const checkAvailabilityChange = () => {
      const available = addToHomescreen.isAvailable();

      if (available !== availablePrevious) {
        availablePrevious = available;
        callback(available);
      }
    };

    const removeBeforeInstallPromptListener = listenBeforeInstallPrompt(beforeinstallpromptEvent => {
      window.beforeinstallpromptEvent = beforeinstallpromptEvent;
      checkAvailabilityChange();
    });
    const removeDisplayModeListener = displayModeStandalone.listen(() => {
      checkAvailabilityChange();
    });
    const removeAppInstalledListener = listenAppInstalled(() => {
      // prompt "becomes" unavailable if user installs app
      // it can happen if user installs app manually from browser toolbar
      // in that case there is no point showing the install
      // button in the ui
      appInstalledEvent = true;
      checkAvailabilityChange();
    });
    return () => {
      removeBeforeInstallPromptListener();
      removeDisplayModeListener();
      removeAppInstalledListener();
    };
  },
  prompt: _async$2(function () {
    if (!window.beforeinstallpromptEvent) {
      console.warn("cannot prompt add to home screen: window.beforeinstallpromptEvent is missing");
      return false;
    }

    window.beforeinstallpromptEvent.prompt();
    return _await$1(window.beforeinstallpromptEvent.userChoice, function (choiceResult) {
      return choiceResult.outcome === "accepted" ? true : false;
    });
  })
};

const listenBeforeInstallPrompt = callback => listenEvent(window, "beforeinstallprompt", callback);

const createSignal = () => {
  let listeners = [];

  const listen = function listen(callback) {
    let _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$once = _ref.once,
        once = _ref$once === void 0 ? false : _ref$once;

    if (once) {
      const callbackOriginal = callback;

      callback = function callback() {
        stopListening();
        callbackOriginal(...arguments);
      };
    }

    listeners = [...listeners, callback];
    let removed = false;

    const stopListening = () => {
      if (removed) return;
      removed = true;
      const listenersWithoutCallback = [];
      let i = listeners.length;
      let searching = true;

      while (i--) {
        const listenerCandidate = listeners[i];

        if (searching) {
          if (listenerCandidate === callback) {
            searching = false;
          } else {
            listenersWithoutCallback.push(listenerCandidate);
          }
        } else {
          listenersWithoutCallback.push(listenerCandidate);
        }
      }

      listeners = listenersWithoutCallback;
    };

    return stopListening;
  };

  const emit = function emit() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(listener => {
      listener(...args);
    });
  };

  return {
    listen,
    emit
  };
};

// https://felixgerschau.com/how-to-communicate-with-service-workers/
const sendMessageUsingChannel = (objectWithPostMessage, message) => {
  const _MessageChannel = new MessageChannel(),
        port1 = _MessageChannel.port1,
        port2 = _MessageChannel.port2;

  return new Promise((resolve, reject) => {
    port1.onmessage = function (event) {
      if (event.data.status === "rejected") {
        reject(event.data.value);
      } else {
        resolve(event.data.value);
      }
    };

    objectWithPostMessage.postMessage(message, [port2]);
  });
};

// do not forget error handling: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/onerror

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

const serviceWorkerAPI = window.navigator.serviceWorker;

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

function _call$1(body, then, direct) {
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

const log = function log() {
};

function _invoke(body, then) {
  var result = body();

  if (result && result.then) {
    return result.then(then);
  }

  return then(result);
}
const canUseServiceWorker = Boolean(serviceWorkerAPI) && document.location.protocol === "https:"; // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

let registrationPromise = null;

let serviceWorkerUpdating = null;
const serviceWorkerUpdatingChangeSignal = createSignal();

const serviceWorkerUpdatingSetter = worker => {
  if (serviceWorkerUpdating && serviceWorkerUpdating === worker) {
    return;
  }

  if (worker) {
    log("found a worker updating (worker state is: ".concat(worker.state, ")"));
  }

  serviceWorkerUpdating = worker;
  serviceWorkerUpdatingChangeSignal.emit();
};
const registerServiceWorker = (url, options) => {
  if (!canUseServiceWorker) {
    return () => {};
  }

  let unregistered = false;

  let unregister = () => {};

  let removeUpdateFoundListener = () => {};

  registrationPromise = serviceWorkerAPI.register(url, options);

  (function () {
    return _await(registrationPromise, function (registration) {
      unregister = () => {
        registration.unregister();
      };

      if (unregistered) {
        unregister();
        return;
      }

      const installing = registration.installing;
            registration.waiting;
            registration.active;
      removeUpdateFoundListener = listenEvent(registration, "updatefound", () => {

        if (registration.installing === installing) {
          return;
        }

        serviceWorkerUpdatingSetter(registration.installing);
      });
    });
  })();

  return () => {
    unregistered = true;
    removeUpdateFoundListener();
    unregister();
  };
}; // export const getServiceWorkerState = () => {
const getServiceWorkerUpdate = () => {
  return serviceWorkerUpdating ? {
    shouldBecomeNavigatorController: Boolean(serviceWorkerAPI.controller),
    navigatorWillReload: autoReloadEnabled
  } : null;
};
const listenServiceWorkerUpdate = callback => {
  return serviceWorkerUpdatingChangeSignal.listen(callback);
};
const checkServiceWorkerUpdate = _async$1(function () {
  if (!registrationPromise) {
    console.warn("registerServiceWorker must be called before checkServiceWorkerUpdate can be used");
    return false;
  }

  return _await(registrationPromise, function (registration) {
    // await for the registration promise above can take some time
    // especially when the service worker is installing for the first time
    // because it is fetching a lot of urls to put into cache.
    // In that scenario we might want to display something different ?
    // Without this UI seems to take ages to check for an update
    return _await(registration.update(), function (updateRegistration) {
      const installing = updateRegistration.installing;

      if (installing) {
        serviceWorkerUpdatingSetter(installing);
        return true;
      }

      const waiting = updateRegistration.waiting;

      if (waiting) {
        serviceWorkerUpdatingSetter(waiting);
        return true;
      }
      return false;
    });
  });
});
const sendMessageToServiceWorkerUpdate = message => {
  if (!serviceWorkerUpdating) {
    console.warn("no service worker updating to send message to");
    return undefined;
  }

  return sendMessageUsingChannel(serviceWorkerUpdating, message);
};
const activateServiceWorkerUpdate = _async$1(function (params) {
  if (!serviceWorkerUpdating) {
    throw new Error("no service worker update to activate");
  }

  return sendSkipWaitingToWorker(serviceWorkerUpdating, params);
});

const sendSkipWaitingToWorker = _async$1(function (worker) {
  let _exit = false;

  let _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$onActivating = _ref.onActivating,
      onActivating = _ref$onActivating === void 0 ? () => {} : _ref$onActivating,
      _ref$onActivated = _ref.onActivated,
      onActivated = _ref$onActivated === void 0 ? () => {} : _ref$onActivated,
      _ref$onBecomesNavigat = _ref.onBecomesNavigatorController,
      onBecomesNavigatorController = _ref$onBecomesNavigat === void 0 ? () => {} : _ref$onBecomesNavigat;

  const state = worker.state;

  const waitUntilActivated = () => {
    return new Promise(resolve => {
      const removeStateChangeListener = listenEvent(worker, "statechange", () => {
        if (worker.state === "activating") {
          onActivating();
        }

        if (worker.state === "activated") {
          onActivated();
          removeStateChangeListener();
          resolve();
        }
      });
    });
  }; // worker must be waiting (meaning state must be "installed")
  // to be able to call skipWaiting on it.
  // If it's installing it's an error.
  // If it's activating, we'll just skip the skipWaiting call
  // If it's activated, we'll just return early


  return _invoke(function () {
    if (state === "installed" || state === "activating") {
      if (state === "installed") {
        sendMessageToServiceWorkerUpdate({
          action: "skipWaiting"
        });
      }

      return _call$1(waitUntilActivated, function () {
        if (serviceWorkerAPI.controller) {
          const removeControllerChangeListener = listenEvent(serviceWorkerAPI, "controllerchange", () => {
            removeControllerChangeListener();
            onBecomesNavigatorController();
            serviceWorkerUpdatingSetter(null);
            reload();
          });
        } else {
          serviceWorkerUpdatingSetter(null);
          reload();
        }

        _exit = true;
      });
    }
  }, function (_result) {
    if (_exit) return _result;
    onBecomesNavigatorController();
    serviceWorkerUpdatingSetter(null);
    reload();
  });
});

let autoReloadEnabled = true;
let refreshing = false;

const reload = () => {
  if (refreshing) {
    return;
  }

  refreshing = true;
  window.location.reload();
};

if (canUseServiceWorker) {
  listenEvent(serviceWorkerAPI, "controllerchange", reload);
} // const navigatorIsControlledByAServiceWorker = () => {
//   return canUseServiceWorker ? Boolean(serviceWorkerAPI.controller) : false
// }
// const getServiceWorkerControllingNavigator = () => {
//   return navigatorIsControlledByAServiceWorker() ? serviceWorkerAPI.controller : null
// }

const initAddToHomeScreen = app => {
  const buttonAddToHomescreen = document.createElement("button");
  buttonAddToHomescreen.disabled = !addToHomescreen.isAvailable();
  buttonAddToHomescreen.innerHTML = "Add to home screen";
  app.appendChild(buttonAddToHomescreen);

  buttonAddToHomescreen.onclick = () => {
    addToHomescreen.prompt();
  };

  addToHomescreen.listenAvailabilityChange(() => {
    buttonAddToHomescreen.disabled = !addToHomescreen.isAvailable();
  });
};

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

const serviceWorkerUrl = new URL(__v__("/js/service_worker.js"), import.meta.url);

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

const initServiceWorker = app => {
  if (!canUseServiceWorker) {
    return;
  } // wait a bit that browser is less busy to register the service worker


  const callLater = window.requestIdleCallback || requestAnimationFrame;
  callLater(() => {
    registerServiceWorker(serviceWorkerUrl, {
      type: "module"
    });
  });
  installServiceWorkerUpdateUI(app);
};

const installServiceWorkerUpdateUI = app => {
  const buttonCheckUpdate = document.createElement("button");
  buttonCheckUpdate.innerHTML = "Check update";
  const paragraph = document.createElement("p");
  app.appendChild(buttonCheckUpdate);
  app.appendChild(paragraph);
  buttonCheckUpdate.onclick = _async(function () {
    buttonCheckUpdate.disabled = true;
    paragraph.innerHTML = "checking for update";
    return _call(checkServiceWorkerUpdate, function (found) {
      if (found) ; else {
        buttonCheckUpdate.disabled = false;
        paragraph.innerHTML = "No update available";
      }
    });
  });
  listenServiceWorkerUpdate(() => {
    const available = Boolean(getServiceWorkerUpdate());

    if (available) {
      paragraph.innerHTML = "Update available <button>Activate update</button>";
      paragraph.querySelector("button").onclick = _async(function () {
        paragraph.querySelector("button").disabled = true;
        return _callIgnored(activateServiceWorkerUpdate);
      });
    } else {
      paragraph.innerHTML = "";
    }
  });
};

const initPwa = app => {
  initAddToHomeScreen(app);
  initServiceWorker(app);
};

const greet = () => {
  return "Welcome";
};

/**
 * The actual app UI, very simplified of course
 */
const app = document.querySelector("#app");
const render = () => {
  const logoUrl = new URL(__v__("/assets/logo.png"), import.meta.url);
  app.innerHTML = "\n<img src=".concat(logoUrl, " width=\"64\" height=\"64\" alt=\"jsenv logo\" />\n<p>").concat(greet(), "</p>");
  initPwa(app);
};

export { render };

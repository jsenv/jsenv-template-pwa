const createSignal = () => {
  let listeners = [];

  const listen = (callback, {
    once = false
  } = {}) => {
    if (once) {
      const callbackOriginal = callback;

      callback = (...args) => {
        stopListening();
        callbackOriginal(...args);
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

  const emit = (...args) => {
    listeners.forEach(listener => {
      listener(...args);
    });
  };

  return {
    listen,
    emit
  };
};

const listenEvent = (objectWithEventEmitter, event, callback) => {
  objectWithEventEmitter.addEventListener(event, callback);
  return () => {
    objectWithEventEmitter.removeEventListener(event, callback);
  };
};

// https://felixgerschau.com/how-to-communicate-with-service-workers/
const sendMessageUsingChannel = (objectWithPostMessage, message) => {
  const {
    port1,
    port2
  } = new MessageChannel();
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

const serviceWorkerAPI = window.navigator.serviceWorker;
const canUseServiceWorkers = Boolean(serviceWorkerAPI) && document.location.protocol === "https:";
const createServiceWorkerScript = ({
  logsEnabled = false,
  autoReloadAfterUpdate = true
} = {}) => {
  const log = (...args) => {
    if (logsEnabled) {
      console.log(...args);
    }
  };

  if (!canUseServiceWorkers) {
    return {
      hasRegistered: () => false,
      setRegistrationPromise: () => {},
      unregister: () => {},
      sendMessage: () => {},
      getUpdate: () => null,
      listenUpdateChange: () => {},
      checkForUpdate: () => {}
    };
  }
  /*
   * The current service worker used by the browser
   * As soon as a service worker is found (installing, waiting, activating or activated)
   * serviceWorker is stored to be able to communicate with it for instance
   *
   * For the record, as soon as a new version of the service worker starts to activate
   * browser kills the old service worker
   */


  let registered = null;

  const registeredSetter = worker => {
    registered = worker;
  }; // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration


  let registrationPromise = null;
  const unregisterRef = {
    current: () => {}
  }; // An updating service worker

  let updating = null;
  const updatingSignal = createSignal();

  const updatingSetter = worker => {
    if (updating && updating === worker) {
      // we already know about this worker, no need to listen state changes.
      // it happens for manual updates where we bot detect it
      // from registration.update() return value
      // and "updatefound" event
      log("we already know this service worker is updating");
      return;
    }

    if (worker) {
      log("found a worker updating (worker state is: ".concat(worker.state, ")"));
    } else {
      log("set update to null");
    }

    updating = worker;
    updatingSignal.emit();
  };

  if (autoReloadAfterUpdate) {
    listenEvent(serviceWorkerAPI, "controllerchange", reload);
  }

  return {
    hasRegistered: () => {
      return Boolean(registrationPromise);
    },
    setRegistrationPromise: async promise => {
      if (registered) {
        throw new Error("setRegistrationPromise already called");
      }

      let unregisterCalled = false;

      unregisterRef.current = () => {
        unregisterCalled = true;
      };

      registrationPromise = promise;
      const registration = await registrationPromise;
      const {
        installing,
        waiting,
        active
      } = registration;
      registeredSetter(installing || waiting || active);
      const removeUpdateFoundListener = listenEvent(registration, "updatefound", () => {
        log("browser notifies use an worker is installing");

        if (registration.installing === installing) {
          log("it's not an worker update, it's first time worker registers");
          return;
        }

        updatingSetter(registration.installing);
      });

      if (unregisterCalled) {
        registration.unregister();
        removeUpdateFoundListener();
      } else {
        unregisterRef.current = () => {
          registration.unregister();
          removeUpdateFoundListener();
        };
      }
    },
    unregister: () => {
      registeredSetter(null);
      updatingSetter(null);
      registrationPromise = null;
      unregisterRef.current();
    },
    sendMessage: message => {
      if (!registered) {
        console.warn("no service worker script to send message to");
        return undefined;
      }

      return sendMessageUsingChannel(registered, message);
    },
    getUpdate: () => {
      if (!updating) {
        return null;
      }

      const sendMessage = message => {
        if (!updating) {
          console.warn("ignore sendMessage call because service worker script is no longer updating");
          return undefined;
        }

        return sendMessageUsingChannel(updating, message);
      };

      return {
        shouldBecomeNavigatorController: serviceWorkerAPI.controller === updating,
        navigatorWillReload: autoReloadAfterUpdate,
        sendMessage,
        activate: async ({
          onActivating = () => {},
          onActivated = () => {},
          onBecomesNavigatorController = () => {}
        } = {}) => {
          const {
            state
          } = updating;

          const waitUntilActivated = () => {
            return new Promise(resolve => {
              const removeStateChangeListener = listenEvent(updating, "statechange", () => {
                if (updating.state === "activating") {
                  registeredSetter(updating);
                  onActivating();
                }

                if (updating.state === "activated") {
                  registeredSetter(updating);
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


          if (state === "installed" || state === "activating") {
            if (state === "installed") {
              sendMessage({
                action: "skipWaiting"
              });
            }

            if (state === "activating") {
              registeredSetter(updating);
            }

            await waitUntilActivated();

            if (serviceWorkerAPI.controller === registered) {
              const removeControllerChangeListener = listenEvent(serviceWorkerAPI, "controllerchange", () => {
                removeControllerChangeListener();
                onBecomesNavigatorController();
              });
            }

            updatingSetter(null);

            if (autoReloadAfterUpdate) {
              reload();
            }

            return;
          }

          registeredSetter(updating);
          onBecomesNavigatorController();
          updatingSetter(null);

          if (autoReloadAfterUpdate) {
            reload();
          }
        }
      };
    },
    listenUpdateChange: callback => {
      return updatingSignal.listen(callback);
    },
    checkForUpdate: async () => {
      if (!registrationPromise) {
        console.warn("\"setRegistrationPromise\" must be called before \"checkForUpdate\"");
        return false;
      }

      const registration = await registrationPromise; // await for the registration promise above can take some time
      // especially when the service worker is installing for the first time
      // because it is fetching a lot of urls to put into cache.
      // In that scenario we might want to display something different ?
      // Without this, UI seems to take ages to check for an update

      try {
        const updateRegistration = await registration.update();
        const {
          installing
        } = updateRegistration;

        if (installing) {
          log("a service worker script is installing");
          updatingSetter(installing);
          return true;
        }

        const {
          waiting
        } = updateRegistration;

        if (waiting) {
          log("a service worker script is waiting to activate");
          updatingSetter(waiting);
          return true;
        }

        log("no update found");
        return false;
      } catch (e) {
        log("error while updating service worker script. Script will be unregistered.\n--- error stack ---\n".concat(e.stack));
        registration.unregister();
        return false;
      }
    }
  };
};
let refreshing = false;

const reload = () => {
  if (refreshing) {
    return;
  }

  refreshing = true;
  window.location.reload();
}; // const navigatorIsControlledByAServiceWorker = () => {
//   return canUseServiceWorker ? Boolean(serviceWorkerAPI.controller) : false
// }
// const getServiceWorkerControllingNavigator = () => {
//   return navigatorIsControlledByAServiceWorker() ? serviceWorkerAPI.controller : null
// }

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
let appInstalledEvent = false;
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
  prompt: async () => {
    if (!window.beforeinstallpromptEvent) {
      console.warn("cannot prompt add to home screen: window.beforeinstallpromptEvent is missing");
      return false;
    }

    window.beforeinstallpromptEvent.prompt();
    const choiceResult = await window.beforeinstallpromptEvent.userChoice;

    if (choiceResult.outcome === "accepted") {
      return true;
    }

    return false;
  }
};

const listenBeforeInstallPrompt = callback => listenEvent(window, "beforeinstallprompt", callback);

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

const script = createServiceWorkerScript();
const initServiceWorker = app => {
  if (!canUseServiceWorkers) {
    return;
  } // wait a bit that browser is less busy to register the service worker


  const callLater = window.requestIdleCallback || requestAnimationFrame;
  callLater(() => {
    script.setRegistrationPromise(window.navigator.serviceWorker.register(new URL("/service_worker.es5.js", import.meta.url), {
      type: "classic"
    }));
  });
  installServiceWorkerUpdateUI(app);
};

const installServiceWorkerUpdateUI = app => {
  const buttonCheckUpdate = document.createElement("button");
  buttonCheckUpdate.innerHTML = "Check update";
  const paragraph = document.createElement("p");
  app.appendChild(buttonCheckUpdate);
  app.appendChild(paragraph);

  buttonCheckUpdate.onclick = async () => {
    buttonCheckUpdate.disabled = true;
    paragraph.innerHTML = "checking for update";
    const found = await script.checkForUpdate();

    if (found) ; else {
      buttonCheckUpdate.disabled = false;
      paragraph.innerHTML = "No update available";
    }
  };

  script.listenUpdateChange(() => {
    const update = script.getUpdate();

    if (update) {
      paragraph.innerHTML = "Update available <button>Activate update</button>";

      paragraph.querySelector("button").onclick = () => {
        paragraph.querySelector("button").disabled = true;
        update.activate();
      };
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
const render = ({
  appNode
}) => {
  const logoUrl = new URL(__v__("/other/logo.png"), import.meta.url);
  appNode.innerHTML = "\n<img src=".concat(logoUrl, " width=\"64\" height=\"64\" alt=\"jsenv logo\" />\n<p>").concat(greet(), "</p>");
  initPwa(appNode);
};

export { render };

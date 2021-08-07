System.register(['./unsupportedIterableToArray.js'], function (exports, module) {
  'use strict';

  var arrayLikeToArray, unsupportedIterableToArray;
  return {
    setters: [function (module) {
      arrayLikeToArray = module.a;
      unsupportedIterableToArray = module.u;
    }],
    execute: function execute() {
      var listenEvent = function listenEvent(objectWithEventEmitter, event, callback) {
        objectWithEventEmitter.addEventListener(event, callback);
        return function () {
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


      var listenAppInstalled = function listenAppInstalled(callback) {
        window.addEventListener("appinstalled", callback);
        return function () {
          window.removeEventListener("appinstalled", callback);
        };
      }; // listenAppInstalled(() => {
      //   document.querySelector("#install").disabled = true
      // })

      /**
       * displayModeStandalone can be used to know the current displayMode of
       * our web page is standalone (PWA)
       */


      var displayModeStandalone = {
        get: function get() {
          return window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches;
        },
        listen: function listen(callback) {
          var media = window.matchMedia("(display-mode: standalone)");
          media.addListener(callback);
          return function () {
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

      var appInstalledEvent = false;

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

      listenAppInstalled(function () {
        // prompt "becomes" unavailable if user installs app
        // it can happen if user installs app manually from browser toolbar
        // in that case there is no point showing the install
        // button in the ui
        appInstalledEvent = true;
      });
      var addToHomescreen = {
        isAvailable: function isAvailable() {
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
        listenAvailabilityChange: function listenAvailabilityChange(callback) {
          var availablePrevious = addToHomescreen.isAvailable();

          var checkAvailabilityChange = function checkAvailabilityChange() {
            var available = addToHomescreen.isAvailable();

            if (available !== availablePrevious) {
              availablePrevious = available;
              callback(available);
            }
          };

          var removeBeforeInstallPromptListener = listenBeforeInstallPrompt(function (beforeinstallpromptEvent) {
            window.beforeinstallpromptEvent = beforeinstallpromptEvent;
            checkAvailabilityChange();
          });
          var removeDisplayModeListener = displayModeStandalone.listen(function () {
            checkAvailabilityChange();
          });
          var removeAppInstalledListener = listenAppInstalled(function () {
            // prompt "becomes" unavailable if user installs app
            // it can happen if user installs app manually from browser toolbar
            // in that case there is no point showing the install
            // button in the ui
            appInstalledEvent = true;
            checkAvailabilityChange();
          });
          return function () {
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

      var listenBeforeInstallPrompt = function listenBeforeInstallPrompt(callback) {
        return listenEvent(window, "beforeinstallprompt", callback);
      };

      var arrayWithoutHoles = function arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return arrayLikeToArray(arr);
      };

      function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
      }

      var nonIterableSpread = function nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      };

      var _toConsumableArray = function _toConsumableArray(arr) {
        return arrayWithoutHoles(arr) || _iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
      };

      var createSignal = function createSignal() {
        var listeners = [];

        var listen = function listen(callback) {
          var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
              _ref$once = _ref.once,
              once = _ref$once === void 0 ? false : _ref$once;

          if (once) {
            var callbackOriginal = callback;

            callback = function callback() {
              stopListening();
              callbackOriginal.apply(void 0, arguments);
            };
          }

          listeners = [].concat(_toConsumableArray(listeners), [callback]);
          var removed = false;

          var stopListening = function stopListening() {
            if (removed) return;
            removed = true;
            var listenersWithoutCallback = [];
            var i = listeners.length;
            var searching = true;

            while (i--) {
              var listenerCandidate = listeners[i];

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

        var emit = function emit() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          listeners.forEach(function (listener) {
            listener.apply(void 0, args);
          });
        };

        return {
          listen: listen,
          emit: emit
        };
      }; // https://felixgerschau.com/how-to-communicate-with-service-workers/


      var sendMessageUsingChannel = function sendMessageUsingChannel(objectWithPostMessage, message) {
        var _MessageChannel = new MessageChannel(),
            port1 = _MessageChannel.port1,
            port2 = _MessageChannel.port2;

        return new Promise(function (resolve, reject) {
          port1.onmessage = function (event) {
            if (event.data.status === "rejected") {
              reject(event.data.value);
            } else {
              resolve(event.data.value);
            }
          };

          objectWithPostMessage.postMessage(message, [port2]);
        });
      }; // do not forget error handling: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/onerror


      function _await(value, then, direct) {
        if (direct) {
          return then ? then(value) : value;
        }

        if (!value || !value.then) {
          value = Promise.resolve(value);
        }

        return then ? value.then(then) : value;
      }

      var serviceWorkerAPI = window.navigator.serviceWorker;

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

      var log = function log() {};

      function _invoke(body, then) {
        var result = body();

        if (result && result.then) {
          return result.then(then);
        }

        return then(result);
      }

      var canUseServiceWorker = Boolean(serviceWorkerAPI) && document.location.protocol === "https:"; // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

      var registrationPromise = null;
      var serviceWorkerUpdating = null;
      var serviceWorkerUpdatingChangeSignal = createSignal();

      var serviceWorkerUpdatingSetter = function serviceWorkerUpdatingSetter(worker) {
        if (serviceWorkerUpdating && serviceWorkerUpdating === worker) {
          return;
        }

        if (worker) {
          log("found a worker updating (worker state is: ".concat(worker.state, ")"));
        }

        serviceWorkerUpdating = worker;
        serviceWorkerUpdatingChangeSignal.emit();
      };

      var registerServiceWorker = function registerServiceWorker(url) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            scope = _ref.scope;

        if (!canUseServiceWorker) {
          return function () {};
        }

        var unregistered = false;

        var unregister = function unregister() {};

        var removeUpdateFoundListener = function removeUpdateFoundListener() {};

        registrationPromise = serviceWorkerAPI.register(url, {
          scope: scope
        });

        (function () {
          return _await(registrationPromise, function (registration) {
            unregister = function unregister() {
              registration.unregister();
            };

            if (unregistered) {
              unregister();
              return;
            }

            var installing = registration.installing;
            registration.waiting;
            registration.active;
            removeUpdateFoundListener = listenEvent(registration, "updatefound", function () {
              if (registration.installing === installing) {
                return;
              }

              serviceWorkerUpdatingSetter(registration.installing);
            });
          });
        })();

        return function () {
          unregistered = true;
          removeUpdateFoundListener();
          unregister();
        };
      }; // export const getServiceWorkerState = () => {


      var getServiceWorkerUpdate = function getServiceWorkerUpdate() {
        return serviceWorkerUpdating ? {
          shouldBecomeNavigatorController: Boolean(serviceWorkerAPI.controller),
          navigatorWillReload: autoReloadEnabled
        } : null;
      };

      var listenServiceWorkerUpdate = function listenServiceWorkerUpdate(callback) {
        return serviceWorkerUpdatingChangeSignal.listen(callback);
      };

      var checkServiceWorkerUpdate = _async$1(function () {
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
            var installing = updateRegistration.installing;

            if (installing) {
              serviceWorkerUpdatingSetter(installing);
              return true;
            }

            var waiting = updateRegistration.waiting;

            if (waiting) {
              serviceWorkerUpdatingSetter(waiting);
              return true;
            }

            return false;
          });
        });
      });

      var sendMessageToServiceWorkerUpdate = function sendMessageToServiceWorkerUpdate(message) {
        if (!serviceWorkerUpdating) {
          console.warn("no service worker updating to send message to");
          return undefined;
        }

        return sendMessageUsingChannel(serviceWorkerUpdating, message);
      };

      var activateServiceWorkerUpdate = _async$1(function (params) {
        if (!serviceWorkerUpdating) {
          throw new Error("no service worker update to activate");
        }

        return sendSkipWaitingToWorker(serviceWorkerUpdating, params);
      });

      var sendSkipWaitingToWorker = _async$1(function (worker) {
        var _exit = false;

        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref2$onActivating = _ref2.onActivating,
            onActivating = _ref2$onActivating === void 0 ? function () {} : _ref2$onActivating,
            _ref2$onActivated = _ref2.onActivated,
            onActivated = _ref2$onActivated === void 0 ? function () {} : _ref2$onActivated,
            _ref2$onBecomesNaviga = _ref2.onBecomesNavigatorController,
            onBecomesNavigatorController = _ref2$onBecomesNaviga === void 0 ? function () {} : _ref2$onBecomesNaviga;

        var state = worker.state;

        var waitUntilActivated = function waitUntilActivated() {
          return new Promise(function (resolve) {
            var removeStateChangeListener = listenEvent(worker, "statechange", function () {
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
                var removeControllerChangeListener = listenEvent(serviceWorkerAPI, "controllerchange", function () {
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

      var autoReloadEnabled = true;
      var refreshing = false;

      var reload = function reload() {
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


      var buttonAddToHomescreen = document.createElement("button");
      buttonAddToHomescreen.disabled = !addToHomescreen.isAvailable();
      buttonAddToHomescreen.innerHTML = "Add to home screen";
      document.body.appendChild(buttonAddToHomescreen);

      buttonAddToHomescreen.onclick = function () {
        addToHomescreen.prompt();
      };

      addToHomescreen.listenAvailabilityChange(function () {
        buttonAddToHomescreen.disabled = !addToHomescreen.isAvailable();
      });
      var callLater = requestIdleCallback ? requestIdleCallback : requestAnimationFrame;
      callLater(function () {
        registerServiceWorker("/service_worker.js");
      });

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

      var installServiceWorkerUpdateUI = function installServiceWorkerUpdateUI() {
        var buttonCheckUpdate = document.createElement("button");
        buttonCheckUpdate.innerHTML = "Check update";
        var paragraph = document.createElement("p");
        document.body.appendChild(buttonCheckUpdate);
        document.body.appendChild(paragraph);
        buttonCheckUpdate.onclick = _async(function () {
          buttonCheckUpdate.disabled = true;
          paragraph.innerHTML = "checking for update";
          return _call(checkServiceWorkerUpdate, function (found) {
            if (found) ;else {
              buttonCheckUpdate.disabled = false;
              paragraph.innerHTML = "No update available";
            }
          });
        });
        listenServiceWorkerUpdate(function () {
          var available = Boolean(getServiceWorkerUpdate());

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

      if (canUseServiceWorker) {
        installServiceWorkerUpdateUI();
      }

      var greet = function greet() {
        return "Welcome";
      };
      /**
       * The actual app UI, very simplified of course.
       * Don't forget to call window.splashscreen.appIsReady() at some point
       * or the splashscreen will stay forever on top of the app UI
       */


      var render = exports('render', function render() {
        document.querySelector("#app").innerHTML = "\n\n<img src=".concat(new URL(System.resolve("./assets/logo-25e95a00.png", module.meta.url), module.meta.url), " width=\"64\" />\n\n<p>").concat(greet(), "</p>");
      });
    }
  };
});
//# sourceMappingURL=aapp-16dff977.js.map
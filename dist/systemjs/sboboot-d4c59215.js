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

function _await2(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

System.register(['./unsupportedIterableToArray.js'], function (exports, module) {
  'use strict';

  var unsupportedIterableToArray;
  return {
    setters: [function (module) {
      unsupportedIterableToArray = module.u;
    }],
    execute: function execute() {
      try {
        var _await$Promise$all, _await$Promise$all2, app;

        var _iterableToArrayLimit = function _iterableToArrayLimit(arr, i) {
          // this is an expanded form of \`for...of\` that properly supports abrupt completions of
          // iterators etc. variable names have been minimised to reduce the size of this massive
          // helper. sometimes spec compliance is annoying :(
          //
          // _n = _iteratorNormalCompletion
          // _d = _didIteratorError
          // _e = _iteratorError
          // _i = _iterator
          // _s = _step
          var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

          if (_i == null) return;
          var _arr = [];
          var _n = true;
          var _d = false;

          var _s, _e;

          try {
            for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);

              if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"] != null) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }

          return _arr;
        };

        var _empty = function _empty() {};

        var _awaitIgnored = function _awaitIgnored(value, direct) {
          if (!direct) {
            return value && value.then ? value.then(_empty) : Promise.resolve();
          }
        };

        var _await3 = function _await3(value, then, direct) {
          if (direct) {
            return then ? then(value) : value;
          }

          if (!value || !value.then) {
            value = Promise.resolve(value);
          }

          return then ? value.then(then) : value;
        };

        // eslint-disable-next-line consistent-return
        var arrayWithHoles = function arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr;
        };

        var nonIterableRest = function nonIterableRest() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        };

        var _slicedToArray = function _slicedToArray(arr, i) {
          return arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
        };

        var injectCSS = function injectCSS(cssUrl) {
          var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
              crossOrigin = _ref.crossOrigin;

          return new Promise(function (resolve, reject) {
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.onload = resolve;
            link.onerror = reject;
            link.href = cssUrl;
            link.crossOrigin = crossOrigin;
            document.head.appendChild(link);
          });
        };

        var nextIDLEPromise = window.requestIdleCallback ? function () {
          var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              _ref2$timeout = _ref2.timeout,
              timeout = _ref2$timeout === void 0 ? 60 : _ref2$timeout;

          return new Promise(function (resolve) {
            window.requestIdleCallback(resolve, {
              timeout: timeout
            });
          });
        } : function () {
          return new Promise(function (resolve) {
            window.requestAnimationFrame(resolve);
          });
        };

        var prepareApp = _async(function () {
          return _await3(injectCSS(new URL(System.resolve("./assets/boot-a54dc422.css", module.meta.url), module.meta.url), {
            crossOrigin: true
          }).catch(function () {}), function () {
            return _await3(document.fonts.ready, function () {
              // window.splashscreen.takeOver() means this code is taking responsability of the splashscreen.
              // It prevents main.html to display <div id="booting_is_slow"></div> to the user
              window.splashscreen.takeOver();

              var updateSplascreenText = function updateSplascreenText(message) {
                var splashscreenMessageNode = document.querySelector("#splashscreen_message");
                splashscreenMessageNode.innerHTML = message;
              };

              updateSplascreenText("Loading banana...");
              return _await3(new Promise(function (resolve) {
                setTimeout(resolve, 600);
              }), function () {
                updateSplascreenText("Loading gorilla...");
                return _await3(new Promise(function (resolve) {
                  setTimeout(resolve, 800);
                }), function () {
                  updateSplascreenText("Loading the entire jungle...");
                  return _awaitIgnored(new Promise(function (resolve) {
                    setTimeout(resolve, 1200);
                  }));
                });
              });
            });
          });
        });

        var loadApp = function loadApp() {
          return module.import('./aapp.js');
        };

        return _await2(Promise.all([prepareApp(), loadApp()]), function (_Promise$all) {
          _await$Promise$all = _Promise$all;
          _await$Promise$all2 = _slicedToArray(_await$Promise$all, 2);

          // app.render() can be very expensive so we wait a bit
          // to let navigator an opportunity to cooldown.
          // This should help to save battery power and RAM
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

          app = _await$Promise$all2[1];
          return _call(nextIDLEPromise, function () {
            app.render();
            window.splashscreen.appIsReady();
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
});
//# sourceMappingURL=sboboot-d4c59215.js.map
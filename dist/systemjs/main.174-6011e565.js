System.register([], function (exports, module) {
  'use strict';

  return {
    execute: function execute() {
      function _empty() {}

      function _awaitIgnored(value, direct) {
        if (!direct) {
          return value && value.then ? value.then(_empty) : Promise.resolve();
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

      function _await(value, then, direct) {
        if (direct) {
          return then ? then(value) : value;
        }

        if (!value || !value.then) {
          value = Promise.resolve(value);
        }

        return then ? value.then(then) : value;
      }

      window.splashscreen = {
        /*
         * takeOver is implemented later in this script.
         * takeOver is meant to be called by code that want to take responsability
         * of what is displayed in the splashscreen
         *
         * It is used by boot/boot.js once it starts to render a different UI in the splashscreen
         */
        takeOver: function takeOver() {},

        /*
         * appIsReady is implemented later in this script.
         * appIsReady is meant to be called once the app inside <div id="app"></div>
         * is ready to be displayed to the user (HTML rendered and CSS, images, fonts, ... are loaded).
         *
         * It is used by app/app.js once it has rendered the HTML and font is loaded
         */
        appIsReady: function appIsReady() {}
      };
      var appNode = document.querySelector("#app");
      var splashscreenNode = document.querySelector("#splashscreen");
      var BOOTING_START = "booting_start";
      var BOOTING_IS_SLOW = "booting_is_slow";
      var BOOTING_ERROR = "booting_error";

      var boot = _async(function () {
        // In case page takes more than 2,5s to boot
        var bootingIsSlowTimeout = setTimeout(function () {
          setBootingState(BOOTING_IS_SLOW);
        }, 2500); // De-comment the await below to test the case where boot is slow
        // await new Promise((resolve) => {
        //   setTimeout(resolve, 3500)
        // })

        window.splashscreen.takeOver = function () {
          clearTimeout(bootingIsSlowTimeout);
        }; // In case boot main file loads and execute fast, splashscreen would
        // fadein + fadeout too soon creating a blink.
        // -> To prevent the blink we wait at leat 700ms before actually removing the splashscreen
        // Other strategies are valid and could be preferred instead of this one.


        var minMsEllapsed = new Promise(function (resolve) {
          setTimeout(resolve, 700);
        });
        window.splashscreen.appIsReady = _async(function () {
          clearTimeout(bootingIsSlowTimeout);
          appNode.removeAttribute("data-booting");
          return _await(minMsEllapsed, function () {
            splashscreenNode.setAttribute("data-booting-done", ""); // Wait the end of the "splashout" animation before killing splashscreen entirely

            setTimeout(function () {
              // Here splashscreen is "killed" with display: 'none' but it could also
              // be removed from the DOM
              splashscreenNode.style.display = "none";
            }, 300);
          });
        });
        return _catch(function () {
          setBootingState(BOOTING_START);
          return _awaitIgnored(module.import('./sboboot.js'));
        }, function (error) {
          clearTimeout(bootingIsSlowTimeout);
          setBootingState(BOOTING_ERROR, {
            errorStack: error.stack || "<No stack associated with this error> (Check devtools to get more info)"
          });
          throw error;
        });
      });

      var setBootingState = function setBootingState(nextBootingState) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}; //  bootingState = nextBootingState

        var splashscreenMessageNode = document.querySelector("#splashscreen_message");
        splashscreenMessageNode.innerHTML = "";
        var variantModel = document.querySelector("#".concat(nextBootingState));
        var variantInstance = variantModel.cloneNode(true);
        replaceNodeVariables(variantInstance, data);
        splashscreenMessageNode.appendChild(variantInstance);
      };

      var replaceNodeVariables = function replaceNodeVariables(node, data) {
        if (node.nodeName === "#text") {
          node.textContent = node.textContent.replace(/\${(\w*)}/g, function (_, key) {
            return data.hasOwnProperty(key) ? data[key] : "";
          });
          return;
        }

        Array.from(node.childNodes).forEach(function (node) {
          replaceNodeVariables(node, data);
        });
      };

      boot();
    }
  };
});
//# sourceMappingURL=main.174-6011e565.js.map
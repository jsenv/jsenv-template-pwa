System.register([], function (_export, _context) {
  "use strict";

  var inlineContent, stylesheet, loadApp, loadAppJs, loadAppCss, loadAppDependencies, loadBannana, loadGorilla, loadJungle;

  function InlineContent(content, _ref) {
    let _ref$type = _ref.type,
        type = _ref$type === void 0 ? "text/plain" : _ref$type;
    this.text = content;
    this.type = type;
  }

  function _empty() {}

  function _awaitIgnored(value, direct) {
    if (!direct) {
      return value && value.then ? value.then(_empty) : Promise.resolve();
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

  function _callIgnored(body, direct) {
    return _call(body, _empty, direct);
  }

  return {
    setters: [],
    execute: function () {
      /* eslint-disable */
      (function () {
        if (typeof document === "undefined" || "adoptedStyleSheets" in document) {
          return;
        }

        var hasShadyCss = "ShadyCSS" in window && !ShadyCSS.nativeShadow;
        var bootstrapper = document.implementation.createHTMLDocument("");
        var closedShadowRootRegistry = new WeakMap();

        var _DOMException = typeof DOMException === "object" ? Error : DOMException;

        var defineProperty = Object.defineProperty;
        var forEach = Array.prototype.forEach;

        var hasBrokenRules = function () {
          var style = bootstrapper.createElement("style");
          style.textContent = '.x{content:"y"}';
          bootstrapper.body.appendChild(style);
          return style.sheet.cssRules[0].style.content !== '"y"';
        }();

        var brokenRulePatterns = [/content:\s*["']/gm];

        function fixBrokenRules(content) {
          return brokenRulePatterns.reduce(function (acc, pattern) {
            return acc.replace(pattern, "$&%%%");
          }, content);
        }

        var placeholderPatterns = [/(content:\s*["'])%%%/gm];
        var getCssText = hasBrokenRules ? function (rule) {
          return placeholderPatterns.reduce(function (acc, pattern) {
            return acc.replace(pattern, "$1");
          }, rule.cssText);
        } : function (rule) {
          return rule.cssText;
        };
        var importPattern = /@import.+?;?$/gm;

        function rejectImports(contents) {
          var _contents = contents.replace(importPattern, "");

          if (_contents !== contents) {
            console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418");
          }

          return _contents.trim();
        }

        function clearRules(sheet) {
          for (var i = 0; i < sheet.cssRules.length; i++) {
            sheet.deleteRule(0);
          }
        }

        function insertAllRules(from, to) {
          forEach.call(from.cssRules, function (rule, i) {
            to.insertRule(getCssText(rule), i);
          });
        }

        function isElementConnected(element) {
          return "isConnected" in element ? element.isConnected : document.contains(element);
        }

        function unique(arr) {
          return arr.filter(function (value, index) {
            return arr.indexOf(value) === index;
          });
        }

        function diff(arr1, arr2) {
          return arr1.filter(function (value) {
            return arr2.indexOf(value) === -1;
          });
        }

        function removeNode(node) {
          node.parentNode.removeChild(node);
        }

        function getShadowRoot(element) {
          return element.shadowRoot || closedShadowRootRegistry.get(element);
        }

        var cssStyleSheetMethods = ["addRule", "deleteRule", "insertRule", "removeRule"];
        var NonConstructedStyleSheet = CSSStyleSheet;
        var nonConstructedProto = NonConstructedStyleSheet.prototype;

        nonConstructedProto.replace = function () {
          return Promise.reject(new _DOMException("Can't call replace on non-constructed CSSStyleSheets."));
        };

        nonConstructedProto.replaceSync = function () {
          throw new _DOMException("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.");
        };

        function isCSSStyleSheetInstance(instance) {
          return typeof instance === "object" ? proto$1.isPrototypeOf(instance) || nonConstructedProto.isPrototypeOf(instance) : false;
        }

        function isNonConstructedStyleSheetInstance(instance) {
          return typeof instance === "object" ? nonConstructedProto.isPrototypeOf(instance) : false;
        }

        var $basicStyleSheet = new WeakMap();
        var $locations = new WeakMap();
        var $adoptersByLocation = new WeakMap();

        function addAdopterLocation(sheet, location) {
          var adopter = document.createElement("style");
          $adoptersByLocation.get(sheet).set(location, adopter);
          $locations.get(sheet).push(location);
          return adopter;
        }

        function getAdopterByLocation(sheet, location) {
          return $adoptersByLocation.get(sheet).get(location);
        }

        function removeAdopterLocation(sheet, location) {
          $adoptersByLocation.get(sheet).delete(location);
          $locations.set(sheet, $locations.get(sheet).filter(function (_location) {
            return _location !== location;
          }));
        }

        function restyleAdopter(sheet, adopter) {
          requestAnimationFrame(function () {
            clearRules(adopter.sheet);
            insertAllRules($basicStyleSheet.get(sheet), adopter.sheet);
          });
        }

        function checkInvocationCorrectness(self) {
          if (!$basicStyleSheet.has(self)) {
            throw new TypeError("Illegal invocation");
          }
        }

        function ConstructedStyleSheet() {
          var self = this;
          var style = document.createElement("style");
          bootstrapper.body.appendChild(style);
          $basicStyleSheet.set(self, style.sheet);
          $locations.set(self, []);
          $adoptersByLocation.set(self, new WeakMap());
        }

        var proto$1 = ConstructedStyleSheet.prototype;

        proto$1.replace = function replace(contents) {
          try {
            this.replaceSync(contents);
            return Promise.resolve(this);
          } catch (e) {
            return Promise.reject(e);
          }
        };

        proto$1.replaceSync = function replaceSync(contents) {
          checkInvocationCorrectness(this);

          if (typeof contents === "string") {
            var self_1 = this;
            var style = $basicStyleSheet.get(self_1).ownerNode;
            style.textContent = hasBrokenRules ? fixBrokenRules(rejectImports(contents)) : rejectImports(contents);
            $basicStyleSheet.set(self_1, style.sheet);
            $locations.get(self_1).forEach(function (location) {
              if (location.isConnected()) {
                restyleAdopter(self_1, getAdopterByLocation(self_1, location));
              }
            });
          }
        };

        defineProperty(proto$1, "cssRules", {
          configurable: true,
          enumerable: true,
          get: function cssRules() {
            checkInvocationCorrectness(this);
            return $basicStyleSheet.get(this).cssRules;
          }
        });
        cssStyleSheetMethods.forEach(function (method) {
          proto$1[method] = function () {
            var self = this;
            checkInvocationCorrectness(self);
            var args = arguments;
            $locations.get(self).forEach(function (location) {
              if (location.isConnected()) {
                var sheet = getAdopterByLocation(self, location).sheet;
                sheet[method].apply(sheet, args);
              }
            });

            if (hasBrokenRules) {
              if (method === "insertRule") {
                args[0] = fixBrokenRules(args[0]);
              }

              if (method === "addRule") {
                args[1] = fixBrokenRules(args[1]);
              }
            }

            var basic = $basicStyleSheet.get(self);
            return basic[method].apply(basic, args);
          };
        });
        defineProperty(ConstructedStyleSheet, Symbol.hasInstance, {
          configurable: true,
          value: isCSSStyleSheetInstance
        });
        var defaultObserverOptions = {
          childList: true,
          subtree: true
        };
        var locations = new WeakMap();

        function getAssociatedLocation(element) {
          var location = locations.get(element);

          if (!location) {
            location = new Location(element);
            locations.set(element, location);
          }

          return location;
        }

        function attachAdoptedStyleSheetProperty(constructor) {
          defineProperty(constructor.prototype, "adoptedStyleSheets", {
            configurable: true,
            enumerable: true,
            get: function get() {
              return getAssociatedLocation(this).sheets;
            },
            set: function set(sheets) {
              getAssociatedLocation(this).update(sheets);
            }
          });
        }

        function traverseWebComponents(node, callback) {
          var iter = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT, function (foundNode) {
            return getShadowRoot(foundNode) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          }, null, false);

          for (var next = void 0; next = iter.nextNode();) {
            callback(getShadowRoot(next));
          }
        }

        var $element = new WeakMap();
        var $uniqueSheets = new WeakMap();
        var $observer = new WeakMap();

        function isExistingAdopter(self, element) {
          return element instanceof HTMLStyleElement && $uniqueSheets.get(self).some(function (sheet) {
            return getAdopterByLocation(sheet, self);
          });
        }

        function getAdopterContainer(self) {
          var element = $element.get(self);
          return element instanceof Document ? element.body : element;
        }

        function adopt(self) {
          var styleList = document.createDocumentFragment();
          var sheets = $uniqueSheets.get(self);
          var observer = $observer.get(self);
          var container = getAdopterContainer(self);
          observer.disconnect();
          sheets.forEach(function (sheet) {
            styleList.appendChild(getAdopterByLocation(sheet, self) || addAdopterLocation(sheet, self));
          });
          container.insertBefore(styleList, null);
          observer.observe(container, defaultObserverOptions);
          sheets.forEach(function (sheet) {
            restyleAdopter(sheet, getAdopterByLocation(sheet, self));
          });
        }

        function Location(element) {
          var self = this;
          self.sheets = [];
          $element.set(self, element);
          $uniqueSheets.set(self, []);
          $observer.set(self, new MutationObserver(function (mutations, observer) {
            if (!document) {
              observer.disconnect();
              return;
            }

            mutations.forEach(function (mutation) {
              if (!hasShadyCss) {
                forEach.call(mutation.addedNodes, function (node) {
                  if (!(node instanceof Element)) {
                    return;
                  }

                  traverseWebComponents(node, function (root) {
                    getAssociatedLocation(root).connect();
                  });
                });
              }

              forEach.call(mutation.removedNodes, function (node) {
                if (!(node instanceof Element)) {
                  return;
                }

                if (isExistingAdopter(self, node)) {
                  adopt(self);
                }

                if (!hasShadyCss) {
                  traverseWebComponents(node, function (root) {
                    getAssociatedLocation(root).disconnect();
                  });
                }
              });
            });
          }));
        }

        Location.prototype = {
          isConnected: function isConnected() {
            var element = $element.get(this);
            return element instanceof Document ? element.readyState !== "loading" : isElementConnected(element.host);
          },
          connect: function connect() {
            var container = getAdopterContainer(this);
            $observer.get(this).observe(container, defaultObserverOptions);

            if ($uniqueSheets.get(this).length > 0) {
              adopt(this);
            }

            traverseWebComponents(container, function (root) {
              getAssociatedLocation(root).connect();
            });
          },
          disconnect: function disconnect() {
            $observer.get(this).disconnect();
          },
          update: function update(sheets) {
            var self = this;
            var locationType = $element.get(self) === document ? "Document" : "ShadowRoot";

            if (!Array.isArray(sheets)) {
              throw new TypeError("Failed to set the 'adoptedStyleSheets' property on " + locationType + ": Iterator getter is not callable.");
            }

            if (!sheets.every(isCSSStyleSheetInstance)) {
              throw new TypeError("Failed to set the 'adoptedStyleSheets' property on " + locationType + ": Failed to convert value to 'CSSStyleSheet'");
            }

            if (sheets.some(isNonConstructedStyleSheetInstance)) {
              throw new TypeError("Failed to set the 'adoptedStyleSheets' property on " + locationType + ": Can't adopt non-constructed stylesheets");
            }

            self.sheets = sheets;
            var oldUniqueSheets = $uniqueSheets.get(self);
            var uniqueSheets = unique(sheets);
            var removedSheets = diff(oldUniqueSheets, uniqueSheets);
            removedSheets.forEach(function (sheet) {
              removeNode(getAdopterByLocation(sheet, self));
              removeAdopterLocation(sheet, self);
            });
            $uniqueSheets.set(self, uniqueSheets);

            if (self.isConnected() && uniqueSheets.length > 0) {
              adopt(self);
            }
          }
        };
        window.CSSStyleSheet = ConstructedStyleSheet;
        attachAdoptedStyleSheetProperty(Document);

        if ("ShadowRoot" in window) {
          attachAdoptedStyleSheetProperty(ShadowRoot);
          var proto = Element.prototype;
          var attach_1 = proto.attachShadow;

          proto.attachShadow = function attachShadow(init) {
            var root = attach_1.call(this, init);

            if (init.mode === "closed") {
              closedShadowRootRegistry.set(this, root);
            }

            return root;
          };
        }

        var documentLocation = getAssociatedLocation(document);

        if (documentLocation.isConnected()) {
          documentLocation.connect();
        } else {
          document.addEventListener("DOMContentLoaded", documentLocation.connect.bind(documentLocation));
        }
      })();

      inlineContent = new InlineContent('@font-face {\n  font-family: Roboto;\n  font-style: normal;\n  font-weight: 400;\n  src: local(Roboto), url('+__v__("/other/roboto_v27_latin_regular.woff2")+') format("woff2");\n  font-display: swap;\n}\n\n#splashscreen {\n  font-family: Roboto;\n}\n', {
        type: "text/css"
      });
      stylesheet = new CSSStyleSheet();
      stylesheet.replaceSync(inlineContent.text);

      _export("loadApp", loadApp = _async(function (_ref) {
        let appNode = _ref.appNode;
        performance.measure("loading app");
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
        const appJsPromise = loadAppJs();
        const appCssPromise = loadAppCss(new URL(__v__("/css/app.css"), _context.meta.url));
        const appDepsPromise = loadAppDependencies();
        return _await(appDepsPromise, function () {
          return _await(appJsPromise, function (app) {
            performance.measure("rendering app");
            app.render({
              appNode
            });
            performance.measure("app rendered");
            return _await(Promise.all([// wait for CSS to be loaded before displaying the app
            appCssPromise, // app.render() can be very expensive so we wait a bit
            // to let navigator an opportunity to cooldown
            // This should help to save battery power and RAM
            new Promise(resolve => {
              if (window.requestIdleCallback) {
                window.requestIdleCallback(resolve, {
                  timeout: 60
                });
              } else {
                window.requestAnimationFrame(resolve);
              }
            })]), function () {
              return _awaitIgnored(performance.measure("app displayed"));
            });
          });
        });
      }));

      loadAppJs = _async(function () {
        return _await(_context.import(__v__("/js/app.es5.js")), function (app) {
          performance.measure("app.js ready");
          return app;
        });
      });
      loadAppCss = _async(function (cssUrl) {
        let _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            crossOrigin = _ref2.crossOrigin;

        const cssPromise = new Promise((resolve, reject) => {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.onload = resolve;
          link.onerror = reject;
          link.href = cssUrl;
          link.crossOrigin = crossOrigin;
          document.head.appendChild(link);
        });
        return _await(cssPromise, function () {
          performance.measure("app.css ready");
        });
      }); // loadAppDependencies below simulates the app needs to load 3 things
      // before being ready to be displayed.
      // To keep them generic the functions are just doing a setTimeout
      // in practice you would:
      // - perform http request
      // - load assets
      // - preload external libraries
      // - etc...

      loadAppDependencies = _async(function () {
        return _callIgnored(loadBannana);
      });
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
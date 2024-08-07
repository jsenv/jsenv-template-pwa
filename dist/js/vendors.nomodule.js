System.register([], function (_export, _context) {
  "use strict";

  var globalObject, logLevel, logBackgroundColor, logColor, pwaLogger, injectLogStyles, l$3, t$2, t$1, r$1, u$1, i$1, o$1, f$1, c$1, e$1, a$1, v$1, l$2, m, s$2, k, i, o, h, s$1, f, v, s, isDev, sigi, mutateValues, PLACEHOLDER, createStateProxy, getPreciseType, toString, isObject, sigref, serviceWorkerAPI, serviceWorkerUnavailabilityReason, canUseServiceWorkers, inspectServiceWorker, requestSkipWaitingOnServiceWorker, requestClaimOnServiceWorker, postMessageToServiceWorker, navigatorControllerRef, navigatorControllerSetter, applyControllerEffect, createServiceWorkerHotReplacer, createServiceWorkerFacade, ensureIsControllingNavigator, listenEvent, listenAppInstalled, get, displayModeStandaloneRef, displayModeStandaloneSetter, media, appInstalledEvent, listenBeforeInstallPrompt, isAvailable, availableRef, availableSetter, checkAvailabilityChange, addToHomescreen;
  function d$2(n, t) {
    c$1.__h && c$1.__h(r$1, n, o$1 || t), o$1 = 0;
    var u = r$1.__H || (r$1.__H = {
      __: [],
      __h: []
    });
    return n >= u.__.length && u.__.push({}), u.__[n];
  }
  function T(n, r) {
    var u = d$2(t$1++, 7);
    return C(u.__H, r) && (u.__ = n(), u.__H = r, u.__h = n), u.__;
  }
  function j() {
    for (var n; n = f$1.shift();) if (n.__P && n.__H) try {
      n.__H.__h.forEach(z), n.__H.__h.forEach(B), n.__H.__h = [];
    } catch (t) {
      n.__H.__h = [], c$1.__e(t, n.__v);
    }
  }
  function w$1(n) {
    var t,
      r = function () {
        clearTimeout(u), k && cancelAnimationFrame(t), setTimeout(n);
      },
      u = setTimeout(r, 100);
    k && (t = requestAnimationFrame(r));
  }
  function z(n) {
    var t = r$1,
      u = n.__c;
    "function" == typeof u && (n.__c = void 0, u()), r$1 = t;
  }
  function B(n) {
    var t = r$1;
    n.__c = n.__(), r$1 = t;
  }
  function C(n, t) {
    return !n || n.length !== t.length || t.some(function (t, r) {
      return t !== n[r];
    });
  }
  function t() {
    if (!(s$1 > 1)) {
      var i,
        t = !1;
      while (void 0 !== h) {
        var r = h;
        h = void 0;
        f++;
        while (void 0 !== r) {
          var o = r.o;
          r.o = void 0;
          r.f &= -3;
          if (!(8 & r.f) && c(r)) try {
            r.c();
          } catch (r) {
            if (!t) {
              i = r;
              t = !0;
            }
          }
          r = o;
        }
      }
      f = 0;
      s$1--;
      if (t) throw i;
    } else s$1--;
  }
  function r(i) {
    if (s$1 > 0) return i();
    s$1++;
    try {
      return i();
    } finally {
      t();
    }
  }
  function e(i) {
    if (void 0 !== o) {
      var t = i.n;
      if (void 0 === t || t.t !== o) {
        t = {
          i: 0,
          S: i,
          p: o.s,
          n: void 0,
          t: o,
          e: void 0,
          x: void 0,
          r: t
        };
        if (void 0 !== o.s) o.s.n = t;
        o.s = t;
        i.n = t;
        if (32 & o.f) i.S(t);
        return t;
      } else if (-1 === t.i) {
        t.i = 0;
        if (void 0 !== t.n) {
          t.n.p = t.p;
          if (void 0 !== t.p) t.p.n = t.n;
          t.p = o.s;
          t.n = void 0;
          o.s.n = t;
          o.s = t;
        }
        return t;
      }
    }
  }
  function u(i) {
    this.v = i;
    this.i = 0;
    this.n = void 0;
    this.t = void 0;
  }
  function d$1(i) {
    return new u(i);
  }
  function c(i) {
    for (var t = i.s; void 0 !== t; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
    return !1;
  }
  function a(i) {
    for (var t = i.s; void 0 !== t; t = t.n) {
      var r = t.S.n;
      if (void 0 !== r) t.r = r;
      t.S.n = t;
      t.i = -1;
      if (void 0 === t.n) {
        i.s = t;
        break;
      }
    }
  }
  function l$1(i) {
    var t = i.s,
      r = void 0;
    while (void 0 !== t) {
      var o = t.p;
      if (-1 === t.i) {
        t.S.U(t);
        if (void 0 !== o) o.n = t.n;
        if (void 0 !== t.n) t.n.p = o;
      } else r = t;
      t.S.n = t.r;
      if (void 0 !== t.r) t.r = void 0;
      t = o;
    }
    i.s = r;
  }
  function y(i) {
    u.call(this, void 0);
    this.x = i;
    this.s = void 0;
    this.g = v - 1;
    this.f = 4;
  }
  function w(i) {
    return new y(i);
  }
  function _$1(i) {
    var r = i.u;
    i.u = void 0;
    if ("function" == typeof r) {
      s$1++;
      var n = o;
      o = void 0;
      try {
        r();
      } catch (t) {
        i.f &= -2;
        i.f |= 8;
        g(i);
        throw t;
      } finally {
        o = n;
        t();
      }
    }
  }
  function g(i) {
    for (var t = i.s; void 0 !== t; t = t.n) t.S.U(t);
    i.x = void 0;
    i.s = void 0;
    _$1(i);
  }
  function p$1(i) {
    if (o !== this) throw new Error("Out-of-order effect");
    l$1(this);
    o = i;
    this.f &= -2;
    if (8 & this.f) g(this);
    t();
  }
  function b(i) {
    this.x = i;
    this.u = void 0;
    this.s = void 0;
    this.o = void 0;
    this.f = 32;
  }
  function E(i) {
    var t = new b(i);
    try {
      t.c();
    } catch (i) {
      t.d();
      throw i;
    }
    return t.d.bind(t);
  }
  function l(n, i) {
    l$3[n] = i.bind(null, l$3[n] || function () {});
  }
  function d(n) {
    if (s) s();
    s = n && n.S();
  }
  function p(n) {
    var r = this,
      f = n.data,
      o = useSignal(f);
    o.value = f;
    var e = T(function () {
      var n = r.__v;
      while (n = n.__) if (n.__c) {
        n.__c.__$f |= 4;
        break;
      }
      r.__$u.c = function () {
        var n;
        if (!t$2(e.peek()) && 3 === (null == (n = r.base) ? void 0 : n.nodeType)) r.base.data = e.peek();else {
          r.__$f |= 1;
          r.setState({});
        }
      };
      return w(function () {
        var n = o.value.value;
        return 0 === n ? 0 : !0 === n ? "" : n || "";
      });
    }, []);
    return e.value;
  }
  function _(n, r, i, t) {
    var f = r in n && void 0 === n.ownerSVGElement,
      o = d$1(i);
    return {
      o: function (n, r) {
        o.value = n;
        t = r;
      },
      d: E(function () {
        var i = o.value.value;
        if (t[r] !== i) {
          t[r] = i;
          if (f) n[r] = i;else if (i) n.setAttribute(r, i);else n.removeAttribute(r);
        }
      })
    };
  }
  function useSignal(n) {
    return T(function () {
      return d$1(n);
    }, []);
  }

  /*
   * https://github.com/preactjs/signals/blob/main/packages/core/src/index.ts
   * TOOD: "fix" array being objects
   */
  return {
    setters: [],
    execute: function () {
      /* eslint-disable */
      // construct-style-sheets-polyfill@3.1.0
      // to keep in sync with https://github.com/calebdwilliams/construct-style-sheets
      // copy pasted into jsenv codebase to inject this code with more ease
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
        var importPattern = /@import.+?;?$/gm;
        function rejectImports(contents) {
          var _contents = contents.replace(importPattern, "");
          if (_contents !== contents) {
            console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418");
          }
          return _contents.trim();
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
        var $basicStyleElement = new WeakMap();
        var $locations = new WeakMap();
        var $adoptersByLocation = new WeakMap();
        var $appliedMethods = new WeakMap();
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
            adopter.textContent = $basicStyleElement.get(sheet).textContent;
            $appliedMethods.get(sheet).forEach(function (command) {
              return adopter.sheet[command.method].apply(adopter.sheet, command.args);
            });
          });
        }
        function checkInvocationCorrectness(self) {
          if (!$basicStyleElement.has(self)) {
            throw new TypeError("Illegal invocation");
          }
        }
        function ConstructedStyleSheet() {
          var self = this;
          var style = document.createElement("style");
          bootstrapper.body.appendChild(style);
          $basicStyleElement.set(self, style);
          $locations.set(self, []);
          $adoptersByLocation.set(self, new WeakMap());
          $appliedMethods.set(self, []);
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
            $basicStyleElement.get(self_1).textContent = rejectImports(contents);
            $appliedMethods.set(self_1, []);
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
            return $basicStyleElement.get(this).sheet.cssRules;
          }
        });
        defineProperty(proto$1, "media", {
          configurable: true,
          enumerable: true,
          get: function media() {
            checkInvocationCorrectness(this);
            return $basicStyleElement.get(this).sheet.media;
          }
        });
        cssStyleSheetMethods.forEach(function (method) {
          proto$1[method] = function () {
            var self = this;
            checkInvocationCorrectness(self);
            var args = arguments;
            $appliedMethods.get(self).push({
              method: method,
              args: args
            });
            $locations.get(self).forEach(function (location) {
              if (location.isConnected()) {
                var sheet = getAdopterByLocation(self, location).sheet;
                sheet[method].apply(sheet, args);
              }
            });
            var basicSheet = $basicStyleElement.get(self).sheet;
            return basicSheet[method].apply(basicSheet, args);
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
            get: function () {
              return getAssociatedLocation(this).sheets;
            },
            set: function (sheets) {
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
          isConnected: function () {
            var element = $element.get(this);
            return element instanceof Document ? element.readyState !== "loading" : isElementConnected(element.host);
          },
          connect: function () {
            var container = getAdopterContainer(this);
            $observer.get(this).observe(container, defaultObserverOptions);
            if ($uniqueSheets.get(this).length > 0) {
              adopt(this);
            }
            traverseWebComponents(container, function (root) {
              getAssociatedLocation(root).connect();
            });
          },
          disconnect: function () {
            $observer.get(this).disconnect();
          },
          update: function (sheets) {
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

      /* eslint-env browser,node */

      /*
       * This file does not use export const InlineContent = function() {} on purpose:
       * - An export would be renamed by rollup,
       *   making it harder to statically detect new InlineContent() calls
       * - An export would be renamed by terser
       *   here again it becomes hard to detect new InlineContent() calls
       * Instead it sets "__InlineContent__" on the global object and terser is configured by jsenv
       * to preserve the __InlineContent__ global variable name
       */
      globalObject = typeof self === "object" ? self : process;
      globalObject.__InlineContent__ = function (content, {
        type = "text/plain"
      }) {
        this.text = content;
        this.type = type;
      };
      logLevel = "warn";
      logBackgroundColor = "green";
      logColor = "black";
      _export("pwaLogger", pwaLogger = {
        setOptions: options => {
          logLevel = options.logLevel || logLevel;
          logBackgroundColor = options.logBackgroundColor || logBackgroundColor;
          logColor = options.logColor || logColor;
        },
        debug: (...args) => {
          if (logLevel === "debug") {
            console.debug(...injectLogStyles(args));
          }
        },
        info: (...args) => {
          if (logLevel === "debug" || logLevel === "info") {
            console.info(...injectLogStyles(args));
          }
        },
        warn: (...args) => {
          if (logLevel === "debug" || logLevel === "info" || logLevel === "warn") {
            console.warn(...injectLogStyles(args));
          }
        },
        error: (...args) => {
          if (logLevel === "debug" || logLevel === "info" || logLevel === "warn" || logLevel === "error") {
            console.error(...injectLogStyles(args));
          }
        },
        infoGroupCollapsed: (...args) => {
          if (logLevel === "debug" || logLevel === "info") {
            console.group(...injectLogStyles(args));
          }
        },
        debugGroupCollapsed: (...args) => {
          if (logLevel === "debug") {
            console.group(...injectLogStyles(args));
          }
        },
        groupEnd: () => console.groupEnd()
      });
      injectLogStyles = args => {
        return ["%cjsenv%cpwa", "background: orange; color: rgb(55, 7, 7); padding: 1px 3px; margin: 0 1px", "background: ".concat(logBackgroundColor, "; color: ").concat(logColor, "; padding: 1px 3px; margin: 0 1px"), ...args];
      };
      l$3 = {
        __e: function (n, l, u, t) {
          for (var i, o, r; l = l.__;) if ((i = l.__c) && !i.__) try {
            if ((o = i.constructor) && null != o.getDerivedStateFromError && (i.setState(o.getDerivedStateFromError(n)), r = i.__d), null != i.componentDidCatch && (i.componentDidCatch(n, t || {}), r = i.__d), r) return i.__E = i;
          } catch (l) {
            n = l;
          }
          throw n;
        }
      }, t$2 = function (n) {
        return null != n && null == n.constructor;
      }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;
      o$1 = 0;
      f$1 = [];
      c$1 = l$3;
      e$1 = c$1.__b;
      a$1 = c$1.__r;
      v$1 = c$1.diffed;
      l$2 = c$1.__c;
      m = c$1.unmount;
      s$2 = c$1.__;
      c$1.__b = function (n) {
        r$1 = null, e$1 && e$1(n);
      }, c$1.__ = function (n, t) {
        n && t.__k && t.__k.__m && (n.__m = t.__k.__m), s$2 && s$2(n, t);
      }, c$1.__r = function (n) {
        a$1 && a$1(n), t$1 = 0;
        var i = (r$1 = n.__c).__H;
        i && (u$1 === r$1 ? (i.__h = [], r$1.__h = [], i.__.forEach(function (n) {
          n.__N && (n.__ = n.__N), n.i = n.__N = void 0;
        })) : (i.__h.forEach(z), i.__h.forEach(B), i.__h = [], t$1 = 0)), u$1 = r$1;
      }, c$1.diffed = function (n) {
        v$1 && v$1(n);
        var t = n.__c;
        t && t.__H && (t.__H.__h.length && (1 !== f$1.push(t) && i$1 === c$1.requestAnimationFrame || ((i$1 = c$1.requestAnimationFrame) || w$1)(j)), t.__H.__.forEach(function (n) {
          n.i && (n.__H = n.i), n.i = void 0;
        })), u$1 = r$1 = null;
      }, c$1.__c = function (n, t) {
        t.some(function (n) {
          try {
            n.__h.forEach(z), n.__h = n.__h.filter(function (n) {
              return !n.__ || B(n);
            });
          } catch (r) {
            t.some(function (n) {
              n.__h && (n.__h = []);
            }), t = [], c$1.__e(r, n.__v);
          }
        }), l$2 && l$2(n, t);
      }, c$1.unmount = function (n) {
        m && m(n);
        var t,
          r = n.__c;
        r && r.__H && (r.__H.__.forEach(function (n) {
          try {
            z(n);
          } catch (n) {
            t = n;
          }
        }), r.__H = void 0, t && c$1.__e(t, r.__v));
      };
      k = "function" == typeof requestAnimationFrame;
      i = Symbol.for("preact-signals");
      o = void 0;
      h = void 0;
      s$1 = 0;
      f = 0;
      v = 0;
      u.prototype.brand = i;
      u.prototype.h = function () {
        return !0;
      };
      u.prototype.S = function (i) {
        if (this.t !== i && void 0 === i.e) {
          i.x = this.t;
          if (void 0 !== this.t) this.t.e = i;
          this.t = i;
        }
      };
      u.prototype.U = function (i) {
        if (void 0 !== this.t) {
          var t = i.e,
            r = i.x;
          if (void 0 !== t) {
            t.x = r;
            i.e = void 0;
          }
          if (void 0 !== r) {
            r.e = t;
            i.x = void 0;
          }
          if (i === this.t) this.t = r;
        }
      };
      u.prototype.subscribe = function (i) {
        var t = this;
        return E(function () {
          var r = t.value,
            n = o;
          o = void 0;
          try {
            i(r);
          } finally {
            o = n;
          }
        });
      };
      u.prototype.valueOf = function () {
        return this.value;
      };
      u.prototype.toString = function () {
        return this.value + "";
      };
      u.prototype.toJSON = function () {
        return this.value;
      };
      u.prototype.peek = function () {
        var i = o;
        o = void 0;
        try {
          return this.value;
        } finally {
          o = i;
        }
      };
      Object.defineProperty(u.prototype, "value", {
        get: function () {
          var i = e(this);
          if (void 0 !== i) i.i = this.i;
          return this.v;
        },
        set: function (i) {
          if (i !== this.v) {
            if (f > 100) throw new Error("Cycle detected");
            this.v = i;
            this.i++;
            v++;
            s$1++;
            try {
              for (var r = this.t; void 0 !== r; r = r.x) r.t.N();
            } finally {
              t();
            }
          }
        }
      });
      (y.prototype = new u()).h = function () {
        this.f &= -3;
        if (1 & this.f) return !1;
        if (32 == (36 & this.f)) return !0;
        this.f &= -5;
        if (this.g === v) return !0;
        this.g = v;
        this.f |= 1;
        if (this.i > 0 && !c(this)) {
          this.f &= -2;
          return !0;
        }
        var i = o;
        try {
          a(this);
          o = this;
          var t = this.x();
          if (16 & this.f || this.v !== t || 0 === this.i) {
            this.v = t;
            this.f &= -17;
            this.i++;
          }
        } catch (i) {
          this.v = i;
          this.f |= 16;
          this.i++;
        }
        o = i;
        l$1(this);
        this.f &= -2;
        return !0;
      };
      y.prototype.S = function (i) {
        if (void 0 === this.t) {
          this.f |= 36;
          for (var t = this.s; void 0 !== t; t = t.n) t.S.S(t);
        }
        u.prototype.S.call(this, i);
      };
      y.prototype.U = function (i) {
        if (void 0 !== this.t) {
          u.prototype.U.call(this, i);
          if (void 0 === this.t) {
            this.f &= -33;
            for (var t = this.s; void 0 !== t; t = t.n) t.S.U(t);
          }
        }
      };
      y.prototype.N = function () {
        if (!(2 & this.f)) {
          this.f |= 6;
          for (var i = this.t; void 0 !== i; i = i.x) i.t.N();
        }
      };
      Object.defineProperty(y.prototype, "value", {
        get: function () {
          if (1 & this.f) throw new Error("Cycle detected");
          var i = e(this);
          this.h();
          if (void 0 !== i) i.i = this.i;
          if (16 & this.f) throw this.v;
          return this.v;
        }
      });
      b.prototype.c = function () {
        var i = this.S();
        try {
          if (8 & this.f) return;
          if (void 0 === this.x) return;
          var t = this.x();
          if ("function" == typeof t) this.u = t;
        } finally {
          i();
        }
      };
      b.prototype.S = function () {
        if (1 & this.f) throw new Error("Cycle detected");
        this.f |= 1;
        this.f &= -9;
        _$1(this);
        a(this);
        s$1++;
        var i = o;
        o = this;
        return p$1.bind(this, i);
      };
      b.prototype.N = function () {
        if (!(2 & this.f)) {
          this.f |= 2;
          this.o = h;
          h = this;
        }
      };
      b.prototype.d = function () {
        this.f |= 8;
        if (!(1 & this.f)) g(this);
      };
      p.displayName = "_st";
      Object.defineProperties(u.prototype, {
        constructor: {
          configurable: !0,
          value: void 0
        },
        type: {
          configurable: !0,
          value: p
        },
        props: {
          configurable: !0,
          get: function () {
            return {
              data: this
            };
          }
        },
        __b: {
          configurable: !0,
          value: 1
        }
      });
      l("__b", function (n, r) {
        if ("string" == typeof r.type) {
          var i,
            t = r.props;
          for (var f in t) if ("children" !== f) {
            var o = t[f];
            if (o instanceof u) {
              if (!i) r.__np = i = {};
              i[f] = o;
              t[f] = o.peek();
            }
          }
        }
        n(r);
      });
      l("__r", function (n, r) {
        d();
        var i,
          t = r.__c;
        if (t) {
          t.__$f &= -2;
          if (void 0 === (i = t.__$u)) t.__$u = i = function (n) {
            var r;
            E(function () {
              r = this;
            });
            r.c = function () {
              t.__$f |= 1;
              t.setState({});
            };
            return r;
          }();
        }
        d(i);
        n(r);
      });
      l("__e", function (n, r, i, t) {
        d();
        n(r, i, t);
      });
      l("diffed", function (n, r) {
        d();
        var i;
        if ("string" == typeof r.type && (i = r.__e)) {
          var t = r.__np,
            f = r.props;
          if (t) {
            var o = i.U;
            if (o) for (var e in o) {
              var u = o[e];
              if (void 0 !== u && !(e in t)) {
                u.d();
                o[e] = void 0;
              }
            } else i.U = o = {};
            for (var a in t) {
              var c = o[a],
                s = t[a];
              if (void 0 === c) {
                c = _(i, a, s, f);
                o[a] = c;
              } else c.o(s, f);
            }
          }
        }
        n(r);
      });
      l("unmount", function (n, r) {
        if ("string" == typeof r.type) {
          var i = r.__e;
          if (i) {
            var t = i.U;
            if (t) {
              i.U = void 0;
              for (var f in t) {
                var o = t[f];
                if (o) o.d();
              }
            }
          }
        } else {
          var e = r.__c;
          if (e) {
            var u = e.__$u;
            if (u) {
              e.__$u = void 0;
              u.d();
            }
          }
        }
        n(r);
      });
      l("__h", function (n, r, i, t) {
        if (t < 3 || 9 === t) r.__$f |= 2;
        n(r, i, t);
      });
      isDev = typeof process === "object" && process.execArgv.includes("--conditions=development");
      sigi = (rootStateObject, {
        strict = false
      } = {}) => {
        if (!isObject(rootStateObject)) {
          throw new Error("sigi first argument must be a basic object, got ".concat(rootStateObject));
        }
        const rootPropertiesMetaMap = new Map();
        // stateProxy is the public way to interact with the state
        // - it register dependencies (of callbacks passed to subscribe) dynamically
        //   thanks to a get handler
        // - it ensure state cannot be mutated from outside (throw when trying to set/define/delete
        //   a property
        const rootStateProxy = createStateProxy(rootStateObject, rootPropertiesMetaMap);
        const isExtensible = Object.isExtensible(rootStateObject);
        mutateValues({
          toValues: rootStateObject,
          propertiesMetaMap: rootPropertiesMetaMap,
          stateObject: rootStateObject,
          isExtensible: true,
          strict: false
        });
        const subscribe = callback => {
          return E(() => {
            callback(rootStateProxy);
          });
        };
        const mutate = toValues => {
          r(() => {
            mutateValues({
              toValues,
              propertiesMetaMap: rootPropertiesMetaMap,
              stateObject: rootStateObject,
              isExtensible,
              strict
            });
          });
        };
        return {
          state: rootStateProxy,
          mutate,
          subscribe
        };
      };
      mutateValues = ({
        toValues,
        propertiesMetaMap,
        stateObject,
        isExtensible,
        strict,
        trace
      }) => {
        const propertyNames = Object.getOwnPropertyNames(toValues);
        let i = 0;
        const j = propertyNames.length;
        while (i < j) {
          const propertyName = propertyNames[i];
          const propertyDescriptor = Object.getOwnPropertyDescriptor(toValues, propertyName);
          i++;
          if (propertyDescriptor.get || propertyDescriptor.set) {
            throw new Error("Cannot set \"".concat(propertyName, "\", property must not use getter/setter"));
          }
          if (!propertyDescriptor.configurable) {
            throw new Error("Cannot set \"".concat(propertyName, "\", property must be configurable"));
          }
          if (!propertyDescriptor.enumerable) {
            throw new Error("Cannot set \"".concat(propertyName, "\", property must be enumerable"));
          }
          if (!propertyDescriptor.writable) {
            throw new Error("Cannot set \"".concat(propertyName, "\", property must be writable"));
          }
          if (isDev) {
            trace = trace ? [...trace, propertyName] : [propertyName];
          }
          const existingPropertyMeta = propertiesMetaMap.get(propertyName);
          const fromUnset = !existingPropertyMeta;
          const fromSet = Boolean(existingPropertyMeta);
          const fromValue = fromSet ? existingPropertyMeta.signal.peek() : undefined;
          const fromObject = fromSet && existingPropertyMeta.type === "object";
          const fromPrimitive = fromSet && !fromObject;
          const toValue = propertyDescriptor.value;
          const toObject = isObject(toValue);
          const toPrimitive = !toObject;

          // warn when property type changes (dev only)
          if (fromSet && isDev && strict &&
          // it's ok for PLACEHOLDER to go from undefined to something else
          fromValue !== PLACEHOLDER) {
            const fromValueType = fromValue === null ? "null" : typeof fromValue;
            const toValueType = toValue === null ? "null" : typeof toValue;
            if (fromValueType !== toValueType) {
              console.warn("A value type will change from \"".concat(fromValueType, "\" to \"").concat(toValueType, "\" at state.").concat(trace.join(".")));
            }
          }
          if (fromUnset && !isExtensible) {
            throw new Error("Cannot add property \"".concat(propertyName, "\", state is not extensible"));
          }

          // from unset to object
          if (fromUnset && toObject) {
            const childPropertiesMetaMap = new Map();
            const childProxy = createStateProxy(toValue, childPropertiesMetaMap);
            const childIsExtensible = Object.isExtensible(toValue);
            const propertyMeta = {
              type: "object",
              signal: d$1(childProxy),
              propertiesMetaMap: childPropertiesMetaMap,
              isExtensible: childIsExtensible
            };
            propertiesMetaMap.set(propertyName, propertyMeta);
            mutateValues({
              toValues: toValue,
              propertiesMetaMap: childPropertiesMetaMap,
              stateObject: toValue,
              isExtensible: true,
              strict,
              trace
            });
            stateObject[propertyName] = toValue;
            continue;
          }
          // from unset to primitive
          if (fromUnset && toPrimitive) {
            const propertyMeta = {
              type: "primitive",
              signal: d$1(toValue),
              propertiesMetaMap: null,
              isExtensible: null
            };
            propertiesMetaMap.set(propertyName, propertyMeta);
            stateObject[propertyName] = toValue;
            continue;
          }
          // from object to object
          if (fromObject && toObject) {
            mutateValues({
              toValues: toValue,
              propertiesMetaMap: existingPropertyMeta.propertiesMetaMap,
              stateObject: stateObject[propertyName],
              isExtensible: existingPropertyMeta.isExtensible,
              strict,
              trace
            });
            continue;
          }
          // from object to primitive
          if (fromObject && toPrimitive) {
            existingPropertyMeta.type = "primitive";
            existingPropertyMeta.signal.value = toValue;
            existingPropertyMeta.propertiesMetaMap = null;
            existingPropertyMeta.isExtensible = null;
            stateObject[propertyName] = toValue;
            continue;
          }
          // from primitive to object
          if (fromPrimitive && toObject) {
            const childPropertiesMetaMap = new Map();
            const childProxy = createStateProxy(toValue, childPropertiesMetaMap);
            const childIsExtensible = Object.isExtensible(toValue);
            existingPropertyMeta.type = "object";
            existingPropertyMeta.signal.value = childProxy;
            existingPropertyMeta.propertiesMetaMap = childPropertiesMetaMap;
            existingPropertyMeta.isExtensible = childIsExtensible;
            mutateValues({
              toValues: toValue,
              propertiesMetaMap: childPropertiesMetaMap,
              stateObject: toValue,
              isExtensible: true,
              strict,
              trace
            });
            stateObject[propertyName] = toValue;
            continue;
          }
          // from primitive to primitive
          existingPropertyMeta.signal.value = toValue;
          stateObject[propertyName] = toValue;
        }
      };
      PLACEHOLDER = Symbol.for("signal_placeholder");
      createStateProxy = (stateObject, propertiesMetaMap) => {
        const isExtensible = Object.isExtensible(stateObject);
        const stateProxy = new Proxy(stateObject, {
          // has is not required, we can use the original state
          // has: (_, key) => {},
          // same for getOwnPropertyDescriptor, let's just return the original descriptor
          // getOwnPropertyDescriptor: (_, key) => {
          //   const propertyMeta = propertiesMetaMap.get(key)
          //   if (!propertyMeta) {
          //     return undefined
          //   }
          //   const propertyProxy = propertyMeta.proxy
          //   if (propertyProxy) {
          //     return {
          //       value: propertyProxy,
          //       writable: true,
          //       configurable: true,
          //       enumerable: true,
          //     }
          //   }
          //   const propertySignal = propertyMeta.signal
          //   const value = propertySignal.value
          //   if (value === PLACEHOLDER) {
          //     return undefined
          //   }
          //   return {
          //     value,
          //     writable: true,
          //     configurable: true,
          //     enumerable: true,
          //   }
          // },
          get: (_, key) => {
            let propertyMeta = propertiesMetaMap.get(key);
            if (!propertyMeta) {
              if (!isExtensible) {
                if (isDev) {
                  console.warn("no property named \"".concat(key, "\" exists on state and state is not extensible"));
                }
                return undefined;
              }
              const propertySignal = d$1(PLACEHOLDER);
              propertyMeta = {
                signal: propertySignal
              };
              propertiesMetaMap.set(key, propertyMeta);
              // eslint-disable-next-line no-unused-expressions
              propertySignal.value;
              return undefined;
            }
            // if there is a proxy it means it's an object
            const propertyProxy = propertyMeta.proxy;
            if (propertyProxy) {
              return propertyProxy;
            }
            // otherwise it's a primitive
            const propertySignal = propertyMeta.signal;
            const propertyValue = propertySignal.value;
            if (propertyValue === PLACEHOLDER) return undefined;
            return propertyValue;
          },
          defineProperty: (_, key) => {
            throw new Error("Invalid attempt to define \"".concat(key, "\", cannot mutate state from outside"));
          },
          deleteProperty: (_, key) => {
            throw new Error("Invalid attempt to delete \"".concat(key, "\", cannot mutate state from outside"));
          },
          set: (_, key) => {
            throw new Error("Invalid attempt to set \"".concat(key, "\", cannot mutate state from outside"));
          }
        });
        return stateProxy;
      };
      getPreciseType = value => {
        if (value === null) {
          return "null";
        }
        if (value === undefined) {
          return "undefined";
        }
        const type = typeof value;
        if (type === "object") {
          const toStringResult = toString.call(value);
          // returns format is '[object ${tagName}]';
          // and we want ${tagName}
          const tagName = toStringResult.slice("[object ".length, -1);
          if (tagName === "Object") {
            if (!value.constructor) return "object"; // Object.create(null)
            const objectConstructorName = value.constructor.name;
            if (objectConstructorName === "Object") {
              return "object";
            }
            return objectConstructorName;
          }
          return tagName;
        }
        return type;
      };
      ({
        toString
      } = Object.prototype);
      isObject = value => {
        return getPreciseType(value) === "object";
      };
      sigref = initialValue => {
        const valueSignal = d$1(initialValue);
        const ref = {
          value: initialValue,
          subscribe: callback => {
            return E(() => {
              callback(valueSignal.value);
            });
          }
        };
        const set = newValue => {
          ref.value = newValue;
          valueSignal.value = newValue;
        };
        return [ref, set];
      };
      serviceWorkerAPI = window.navigator.serviceWorker;
      if (!serviceWorkerAPI) {
        serviceWorkerUnavailabilityReason = "api_not_found_on_navigator";
      } else if (document.location.protocol !== "https:") {
        serviceWorkerUnavailabilityReason = "protocol_must_be_https";
      }
      canUseServiceWorkers = !serviceWorkerUnavailabilityReason;
      inspectServiceWorker = async serviceWorker => {
        let serviceWorkerResponse;
        const inspectPromise = postMessageToServiceWorker(serviceWorker, {
          action: "inspect"
        }).then(info => {
          if (typeof info !== "object") {
            throw new TypeError("service worker script must send an object in response to inspect");
          }
          serviceWorkerResponse = info;
        });
        let timeout;
        let timeoutReached = false;
        const timeoutPromise = new Promise(resolve => {
          timeout = setTimeout(() => {
            timeoutReached = true;
            resolve();
          }, 1000);
        });
        await Promise.race([inspectPromise, timeoutPromise]);
        clearTimeout(timeout);
        if (timeoutReached) {
          return {};
        }
        return serviceWorkerResponse;
      };
      requestSkipWaitingOnServiceWorker = serviceWorker => {
        return postMessageToServiceWorker(serviceWorker, {
          action: "skipWaiting"
        });
      };
      requestClaimOnServiceWorker = serviceWorker => {
        return postMessageToServiceWorker(serviceWorker, {
          action: "claim"
        });
      }; // https://felixgerschau.com/how-to-communicate-with-service-workers/
      postMessageToServiceWorker = (serviceWorker, message) => {
        const {
          port1,
          port2
        } = new MessageChannel();
        return new Promise((resolve, reject) => {
          port1.onmessage = messageEvent => {
            const {
              data
            } = messageEvent;
            if (data && typeof data === "object" && typeof data.actionResultStatus === "string") {
              if (data.actionResultStatus === "rejected") {
                reject(data.actionResultValue);
              } else {
                resolve(data.actionResultValue);
              }
            } else {
              resolve(data);
            }
          };
          serviceWorker.postMessage(message, [port2]);
        });
      };
      [navigatorControllerRef, navigatorControllerSetter] = sigref(null);
      applyControllerEffect = async () => {
        if (!canUseServiceWorkers) {
          navigatorControllerSetter(null);
          return;
        }
        const {
          controller
        } = serviceWorkerAPI;
        if (!controller) {
          navigatorControllerSetter(null);
          return;
        }
        const meta = await inspectServiceWorker(serviceWorkerAPI.controller);
        navigatorControllerSetter({
          meta
        });
      };
      applyControllerEffect();
      if (canUseServiceWorkers) {
        serviceWorkerAPI.addEventListener("controllerchange", applyControllerEffect);
      }
      createServiceWorkerHotReplacer = ({
        resourceUpdateHandlers,
        fromScriptMeta,
        toScriptMeta
      }) => {
        const actions = [];
        if (!fromScriptMeta || !fromScriptMeta.resources) {
          pwaLogger.debug("current sw script does not expose resources");
          return null;
        }
        if (!toScriptMeta || !toScriptMeta.resources) {
          pwaLogger.debug("new sw script does not expose resources");
          return null;
        }
        const fromVersion = fromScriptMeta.version;
        const toVersion = toScriptMeta.version;
        if (fromVersion !== toVersion) {
          pwaLogger.debug("script version changed ".concat(fromVersion, "->").concat(toVersion));
          return null;
        }
        const fromResources = fromScriptMeta.resources;
        const toResources = toScriptMeta.resources;
        const getResourceUpdateHandler = url => {
          const resourceUpdateHandler = resourceUpdateHandlers[url];
          if (resourceUpdateHandler) {
            return resourceUpdateHandler;
          }
          // defineResourceUpdateHandler might be called with the versioned url (in case import.meta.url is used)
          // so we'll try to find the non versioned url instead
          const fromVersionedUrl = fromResources[url] ? fromResources[url].versionedUrl : "";
          if (fromVersionedUrl) {
            const fromHandler = resourceUpdateHandlers[fromVersionedUrl];
            if (fromHandler) {
              resourceUpdateHandlers[url] = fromHandler;
              return fromHandler;
            }
          }
          const toVersionedUrl = toResources[url] ? toResources[url].versionedUrl : "";
          if (toVersionedUrl) {
            const toHandler = resourceUpdateHandlers[toVersionedUrl];
            if (toHandler) {
              return toHandler;
            }
          }
          return null;
        };
        const getOneUpdateHotHandler = ({
          url,
          fromUrl,
          toUrl,
          fromVersion,
          toVersion
        }) => {
          let resourceUpdateHandler = getResourceUpdateHandler(url);
          if (typeof resourceUpdateHandler === "function") {
            resourceUpdateHandler = resourceUpdateHandler({
              fromUrl,
              toUrl,
              fromVersion,
              toVersion
            });
            if (typeof resourceUpdateHandler !== "object") {
              throw new TypeError("resource uupdate hanler must be an object, got ".concat(resourceUpdateHandler));
            }
          }
          if (resourceUpdateHandler === null || resourceUpdateHandler === undefined) {
            return null;
          }
          if (!toUrl) {
            if (resourceUpdateHandler.remove) {
              return () => resourceUpdateHandler.remove({
                fromUrl,
                toUrl,
                fromVersion,
                toVersion
              });
            }
            return null;
          }
          if (!fromUrl) {
            if (resourceUpdateHandler.add) {
              return () => resourceUpdateHandler.add({
                fromUrl,
                toUrl,
                fromVersion,
                toVersion
              });
            }
            return null;
          }
          if (resourceUpdateHandler.replace) {
            return () => resourceUpdateHandler.replace({
              fromUrl,
              toUrl,
              fromVersion,
              toVersion
            });
          }
          return null;
        };
        const fromUrls = Object.keys(fromResources);
        const toUrls = Object.keys(toResources);
        for (const fromUrl of fromUrls) {
          const fromUrlMeta = fromResources[fromUrl];
          const toUrlMeta = toResources[fromUrl];
          // remove
          if (!toUrlMeta) {
            const updateHandler = getOneUpdateHotHandler({
              url: fromUrl,
              fromUrl: fromUrlMeta.versionedUrl || fromUrl,
              toUrl: null,
              fromVersion: fromUrlMeta.version || null,
              toVersion: null
            });
            if (!updateHandler) {
              pwaLogger.debug("nothing capable to handle removal of ".concat(fromUrl));
              return null;
            }
            actions.push({
              type: "remove",
              url: fromUrl,
              fn: updateHandler
            });
            continue;
          }
          // replace
          if (toUrlMeta.version !== fromUrlMeta.version) {
            const updateHandler = getOneUpdateHotHandler({
              url: fromUrl,
              fromUrl: fromUrlMeta.versionedUrl || fromUrl,
              toUrl: toUrlMeta.versionedUrl || fromUrl,
              fromVersion: fromUrlMeta.version || null,
              toVersion: toUrlMeta.version || null
            });
            if (!updateHandler) {
              console.log({
                fromScriptMeta,
                toScriptMeta,
                fromUrl,
                fromResources,
                toResources,
                availableHandlers: Object.keys(resourceUpdateHandlers)
              });
              pwaLogger.debug("nothing capable to handle update of ".concat(fromUrl));
              return null;
            }
            actions.push({
              type: "replace",
              url: fromUrl,
              fn: updateHandler
            });
          }
        }
        // add
        for (const toUrl of toUrls) {
          if (fromUrls.includes(toUrl)) {
            continue; // already handled in previous loop
          }
          const toUrlMeta = toResources[toUrl];
          const updateHandler = getOneUpdateHotHandler({
            url: toUrl,
            fromUrl: null,
            toUrl: toUrlMeta.versionedUrl || toUrl,
            fromVersion: null,
            toVersion: toUrlMeta.version || null
          });
          if (!updateHandler) {
            pwaLogger.debug("nothing capable to handle introduction of ".concat(toUrl));
            return null;
          }
          actions.push({
            type: "add",
            url: toUrl,
            fn: updateHandler
          });
        }

        // if nothing has changed it means it's the worker implementation (the code)
        // that has changed, so we need to reload
        if (actions.length === 0) {
          pwaLogger.debug("resources are the same");
          return null;
        }
        return async () => {
          await Promise.all(actions.map(async action => {
            pwaLogger.debug("call \"".concat(action.type, "\" handler for ").concat(action.url));
            await action.fn();
          }));
        };
      };
      /*
       * https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
       */
      _export("createServiceWorkerFacade", createServiceWorkerFacade = ({
        scope,
        autoclaimOnFirstActivation = false
      } = {}) => {
        let fromInspectPromise = null;
        const {
          state,
          subscribe,
          mutate
        } = sigi({
          error: null,
          readyState: "",
          // registering, installing, installed, activating, activated
          meta: {},
          update: {
            error: null,
            readyState: "",
            // installing, installed, activating, activated
            meta: {},
            reloadRequired: true
          }
        });
        const resourceUpdateHandlers = {};
        const getCurrentServiceWorker = async () => {
          const {
            controller
          } = serviceWorkerAPI;
          if (controller) {
            return controller;
          }
          const reg = await serviceWorkerAPI.getRegistration();
          return reg.waiting || reg.installing;
        };
        const onUpdateFound = async toServiceWorker => {
          const fromServiceWorker = await getCurrentServiceWorker();
          const [fromScriptMeta, toScriptMeta] = await Promise.all([inspectServiceWorker(fromServiceWorker), inspectServiceWorker(toServiceWorker)]);
          pwaLogger.info("update from", fromScriptMeta, "to", toScriptMeta);
          const serviceWorkerHotReplacer = createServiceWorkerHotReplacer({
            resourceUpdateHandlers,
            fromScriptMeta,
            toScriptMeta
          });
          mutate({
            meta: fromScriptMeta,
            update: {
              meta: toScriptMeta,
              reloadRequired: !serviceWorkerHotReplacer
            }
          });
          const onUpdateError = errorEvent => {
            mutate({
              error: errorEvent
            });
          };
          toServiceWorker.addEventListener("error", onUpdateError);
          const applyUpdateStateEffects = async () => {
            const effects = {
              installing: () => {
                mutate({
                  update: {
                    readyState: "installing"
                  }
                });
              },
              installed: () => {
                mutate({
                  update: {
                    readyState: "installed"
                  }
                });
              },
              activating: () => {
                mutate({
                  update: {
                    readyState: "activating"
                  }
                });
              },
              activated: async () => {
                mutate({
                  update: {
                    readyState: "activated"
                  }
                });
                await ensureIsControllingNavigator(toServiceWorker);
                pwaLogger.info("update is controlling navigator");
                if (serviceWorkerHotReplacer) {
                  pwaLogger.info("hot replace service worker");
                  serviceWorkerHotReplacer();
                } else {
                  pwaLogger.info("post reload after update to clients");
                  postMessageToServiceWorker(toServiceWorker, {
                    action: "postReloadAfterUpdateToClients"
                  });
                }
              },
              redundant: () => {
                toServiceWorker.removeEventListener("error", onUpdateError);
                toServiceWorker.removeEventListener("statechange", applyUpdateStateEffects);
                mutate({
                  update: {
                    readyState: "redundant"
                  }
                });
              }
            };
            await effects[toServiceWorker.state]();
          };
          applyUpdateStateEffects();
          toServiceWorker.addEventListener("statechange", applyUpdateStateEffects);
        };
        const watchRegistration = async registration => {
          const {
            installing,
            waiting,
            active
          } = registration;
          const fromServiceWorker = installing || waiting || active;
          registration.onupdatefound = () => {
            // https://github.com/w3c/ServiceWorker/issues/515
            // and listening onupdatefound after a setTimeout is not enough
            // as firefox will trigger "updatefound" when the worker is activating as well
            if (registration.installing === fromServiceWorker) {
              return;
            }
            onUpdateFound(registration.installing);
          };
          serviceWorkerAPI.startMessages(); // is it useful?
          fromInspectPromise = inspectServiceWorker(fromServiceWorker);
          const fromScriptMeta = await fromInspectPromise;
          const onError = errorEvent => {
            mutate({
              error: errorEvent
            });
          };
          fromServiceWorker.addEventListener("error", onError);
          const applyStateChangeEffect = () => {
            const effects = {
              installing: () => {
                mutate({
                  readyState: "installing",
                  meta: fromScriptMeta
                });
              },
              installed: () => {
                mutate({
                  readyState: "installed",
                  meta: fromScriptMeta
                });
              },
              activating: () => {
                mutate({
                  readyState: "activating",
                  meta: fromScriptMeta
                });
              },
              activated: () => {
                mutate({
                  readyState: "activated",
                  meta: fromScriptMeta
                });
                if (autoclaimOnFirstActivation && !serviceWorkerAPI.controller) {
                  requestClaimOnServiceWorker(fromServiceWorker);
                }
              },
              redundant: () => {
                fromServiceWorker.removeEventListener("statechange", applyStateChangeEffect);
                fromServiceWorker.removeEventListener("error", onError);
                mutate({
                  readyState: "redundant",
                  meta: fromScriptMeta
                });
              }
            };
            effects[fromServiceWorker.state]();
          };
          applyStateChangeEffect();
          fromServiceWorker.addEventListener("statechange", applyStateChangeEffect);
        };
        const init = async () => {
          serviceWorkerAPI.addEventListener("controllerchange", async () => {
            const controller = serviceWorkerAPI.controller;
            // happens when an other tab register the service worker and
            // make it control the navigator (when autoclaimOnFirstActivation is true)
            if (controller && state.readyState === "") {
              const registration = await serviceWorkerAPI.getRegistration();
              watchRegistration(registration);
            }
          });
          const registration = await serviceWorkerAPI.getRegistration(scope);
          if (registration) {
            watchRegistration(registration);
          }
        };
        if (canUseServiceWorkers) {
          init();
        }
        return {
          state,
          subscribe,
          setRegistrationPromise: async registrationPromise => {
            try {
              mutate({
                error: null,
                readyState: "registering"
              });
              const registration = await registrationPromise;
              watchRegistration(registration);
            } catch (e) {
              mutate({
                error: e
              });
            }
          },
          unregister: async () => {
            if (!canUseServiceWorkers) {
              pwaLogger.debug("service worker API not available");
              return false;
            }
            const registration = await serviceWorkerAPI.getRegistration(scope);
            if (!registration) {
              pwaLogger.debug("nothing to unregister");
              return false;
            }
            const unregistered = await registration.unregister();
            if (unregistered) {
              pwaLogger.info("registration.unregister() done");
              return true;
            }
            pwaLogger.info("registration.unregister() failed");
            return false;
          },
          checkForUpdates: async () => {
            if (!canUseServiceWorkers) {
              pwaLogger.debug("service worker API not available");
              return false;
            }
            const registration = await serviceWorkerAPI.getRegistration(scope);
            if (!registration) {
              pwaLogger.info("nothing to update");
              return false;
            }
            mutate({
              update: {
                error: null,
                readyState: ""
              }
            });
            let updateRegistration;
            try {
              updateRegistration = await registration.update();
            } catch (e) {
              mutate({
                update: {
                  error: e
                }
              });
              return false;
            }
            if (updateRegistration.waiting) {
              pwaLogger.info("registration.update() -> found on registration.waiting");
              onUpdateFound(updateRegistration.waiting);
              return true;
            }
            // when installing, no need to call onUpdateFound, browser does it for us
            if (updateRegistration.installing) {
              pwaLogger.info("registration.update() -> found on registration.installing");
              return true;
            }
            pwaLogger.info("registration.update() -> no update found");
            return false;
          },
          activateUpdate: async () => {
            if (!canUseServiceWorkers) {
              pwaLogger.debug("service worker API not available");
              return;
            }
            const registration = await serviceWorkerAPI.getRegistration(scope);
            if (!registration) {
              pwaLogger.warn("nothing to activate");
              return;
            }
            const serviceWorker = registration.installing || registration.waiting;
            if (!serviceWorker) {
              pwaLogger.warn("no update to activate");
              return;
            }
            if (serviceWorker.state === "installing") {
              pwaLogger.info("an update is installing, wait for it to be installed");
              await new Promise(resolve => {
                serviceWorker.onstatechange = () => {
                  if (serviceWorker.state === "installed") {
                    serviceWorker.onstatechange = null;
                    resolve();
                  }
                };
              });
            } else {
              pwaLogger.info("an update is waiting to activate");
            }
            const activatedPromise = new Promise(resolve => {
              serviceWorker.onstatechange = () => {
                if (serviceWorker.state === "activated") {
                  serviceWorker.onstatechange = null;
                  resolve();
                }
              };
            });
            pwaLogger.info("send skipWaiting");
            await requestSkipWaitingOnServiceWorker(serviceWorker);
            pwaLogger.info("skipWaiting done, wait for update to switch to activated");
            await activatedPromise;
            pwaLogger.info("update is activated");
            await ensureIsControllingNavigator(serviceWorker);
            pwaLogger.info("update is controlling navigator");
          },
          sendMessage: async message => {
            if (!canUseServiceWorkers) {
              pwaLogger.debug("service worker API not available");
              return undefined;
            }
            const registration = await serviceWorkerAPI.getRegistration(scope);
            if (!registration) {
              pwaLogger.warn("no service worker script to communicate with");
              return undefined;
            }
            const serviceWorker = registration.installing || registration.waiting || registration.active;
            // registration.active || registration.waiting || registration.installing
            pwaLogger.info("postMessage(".concat(JSON.stringify(message), ") on ").concat(serviceWorker.scriptURL));
            return postMessageToServiceWorker(serviceWorker, message);
          },
          defineResourceUpdateHandler: (url, handler) => {
            if (typeof handler !== "function" && typeof handler !== "object") {
              throw new TypeError("handle must be a function or an object, got ".concat(handler));
            }
            const urlResolved = new URL(url, document.location).href;
            resourceUpdateHandlers[urlResolved] = handler;
          }
        };
      });
      ensureIsControllingNavigator = serviceWorker => {
        if (serviceWorkerAPI.controller === serviceWorker) {
          return null;
        }
        const becomesControllerPromise = new Promise(resolve => {
          const oncontrollerchange = () => {
            if (serviceWorkerAPI.controller === serviceWorker) {
              serviceWorkerAPI.removeEventListener("controllerchange", oncontrollerchange);
              resolve();
            }
          };
          serviceWorkerAPI.addEventListener("controllerchange", oncontrollerchange);
        });
        pwaLogger.info("request claim");
        requestClaimOnServiceWorker(serviceWorker);
        return becomesControllerPromise;
      };
      if (canUseServiceWorkers) {
        // https://github.com/GoogleChrome/workbox/issues/1120
        let reloading = false;
        const reloadPage = () => {
          if (reloading) {
            return;
          }
          reloading = true;
          window.location.reload();
        };
        serviceWorkerAPI.addEventListener("message", event => {
          if (event.data === "reload_after_update") {
            pwaLogger.info('"reload_after_update" received from service worker -> reload page');
            reloadPage();
          }
        });
      }
      listenEvent = (objectWithEventEmitter, event, callback) => {
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
      listenAppInstalled = callback => {
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
      get = () => {
        return window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches;
      };
      [displayModeStandaloneRef, displayModeStandaloneSetter] = sigref(get());
      media = window.matchMedia("(display-mode: standalone)");
      media.addEventListener("change", () => {
        displayModeStandaloneSetter(get());
      });

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
      appInstalledEvent = false;
      listenBeforeInstallPrompt = callback => listenEvent(window, "beforeinstallprompt", callback);
      isAvailable = () => {
        if (!window.beforeinstallpromptEvent) {
          return false;
        }
        if (displayModeStandaloneRef.value) {
          return false;
        }
        if (appInstalledEvent) {
          return false;
        }
        return true;
      };
      [availableRef, availableSetter] = sigref(isAvailable());
      checkAvailabilityChange = () => {
        availableSetter(isAvailable());
      };
      listenAppInstalled(() => {
        // prompt "becomes" unavailable if user installs app
        // it can happen if user installs app manually from browser toolbar
        // in that case there is no point showing the install
        // button in the ui
        appInstalledEvent = true;
        checkAvailabilityChange();
      });
      listenBeforeInstallPrompt(beforeinstallpromptEvent => {
        window.beforeinstallpromptEvent = beforeinstallpromptEvent;
        checkAvailabilityChange();
      });
      displayModeStandaloneRef.subscribe(() => {
        checkAvailabilityChange();
      });
      _export("addToHomescreen", addToHomescreen = {
        availableRef,
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
      });
    }
  };
});
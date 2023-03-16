System.register([], function (_export, _context) {
  "use strict";

  var logLevel, logBackgroundColor, logColor, pwaLogger, injectLogStyles, l$3, t$1, r$1, u$1, i$1, o$1, f$1, c$1, e$1, a$1, v$2, l$2, m, g$1, o, r, s$1, n, f, v, isDev, sigi, mutateValues, PLACEHOLDER, createStateProxy, getPreciseType, toString, isObject, sigref, serviceWorkerAPI, inspectServiceWorker, requestSkipWaitingOnServiceWorker, requestClaimOnServiceWorker, postMessageToServiceWorker, navigatorControllerRef, navigatorControllerSetter, applyControllerEffect, createServiceWorkerHotReplacer, createServiceWorkerFacade, ensureIsControllingNavigator, reloading, reloadPage, listenEvent, listenAppInstalled, get, displayModeStandaloneRef, displayModeStandaloneSetter, media, appInstalledEvent, listenBeforeInstallPrompt, isAvailable, availableRef, availableSetter, checkAvailabilityChange, addToHomescreen, initAddToHomeScreen, swFacade, initServiceWorker, installServiceWorkerUpdateUI, greet, appNode, render;
  function d$2(t, u) {
    l$3.__h && l$3.__h(r$1, t, o$1 || u), o$1 = 0;
    var i = r$1.__H || (r$1.__H = {
      __: [],
      __h: []
    });
    return t >= i.__.length && i.__.push({
      __V: c$1
    }), i.__[t];
  }
  function F(n, r) {
    var u = d$2(t$1++, 7);
    return z(u.__H, r) ? (u.__V = n(), u.i = r, u.__h = n, u.__V) : u.__;
  }
  function b$1() {
    for (var t; t = f$1.shift();) if (t.__P && t.__H) try {
      t.__H.__h.forEach(k), t.__H.__h.forEach(w$1), t.__H.__h = [];
    } catch (r) {
      t.__H.__h = [], l$3.__e(r, t.__v);
    }
  }
  function j(n) {
    var t,
      r = function () {
        clearTimeout(u), g$1 && cancelAnimationFrame(t), setTimeout(n);
      },
      u = setTimeout(r, 100);
    g$1 && (t = requestAnimationFrame(r));
  }
  function k(n) {
    var t = r$1,
      u = n.__c;
    "function" == typeof u && (n.__c = void 0, u()), r$1 = t;
  }
  function w$1(n) {
    var t = r$1;
    n.__c = n.__(), r$1 = t;
  }
  function z(n, t) {
    return !n || n.length !== t.length || t.some(function (t, r) {
      return t !== n[r];
    });
  }
  function i() {
    throw new Error("Cycle detected");
  }
  function t() {
    if (!(s$1 > 1)) {
      var i,
        t = !1;
      while (void 0 !== r) {
        var h = r;
        r = void 0;
        n++;
        while (void 0 !== h) {
          var o = h.o;
          h.o = void 0;
          h.f &= -3;
          if (!(8 & h.f) && d$1(h)) try {
            h.c();
          } catch (h) {
            if (!t) {
              i = h;
              t = !0;
            }
          }
          h = o;
        }
      }
      n = 0;
      s$1--;
      if (t) throw i;
    } else s$1--;
  }
  function h(i) {
    if (s$1 > 0) return i();
    s$1++;
    try {
      return i();
    } finally {
      t();
    }
  }
  function v$1(i) {
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
  function e(i) {
    this.v = i;
    this.i = 0;
    this.n = void 0;
    this.t = void 0;
  }
  function u(i) {
    return new e(i);
  }
  function d$1(i) {
    for (var t = i.s; void 0 !== t; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
    return !1;
  }
  function c(i) {
    for (var t = i.s; void 0 !== t; t = t.n) {
      var h = t.S.n;
      if (void 0 !== h) t.r = h;
      t.S.n = t;
      t.i = -1;
      if (void 0 === t.n) {
        i.s = t;
        break;
      }
    }
  }
  function a(i) {
    var t = i.s,
      h = void 0;
    while (void 0 !== t) {
      var o = t.p;
      if (-1 === t.i) {
        t.S.U(t);
        if (void 0 !== o) o.n = t.n;
        if (void 0 !== t.n) t.n.p = o;
      } else h = t;
      t.S.n = t.r;
      if (void 0 !== t.r) t.r = void 0;
      t = o;
    }
    i.s = h;
  }
  function l$1(i) {
    e.call(this, void 0);
    this.x = i;
    this.s = void 0;
    this.g = f - 1;
    this.f = 4;
  }
  function w(i) {
    return new l$1(i);
  }
  function y(i) {
    var h = i.u;
    i.u = void 0;
    if ("function" == typeof h) {
      s$1++;
      var r = o;
      o = void 0;
      try {
        h();
      } catch (t) {
        i.f &= -2;
        i.f |= 8;
        _(i);
        throw t;
      } finally {
        o = r;
        t();
      }
    }
  }
  function _(i) {
    for (var t = i.s; void 0 !== t; t = t.n) t.S.U(t);
    i.x = void 0;
    i.s = void 0;
    y(i);
  }
  function g(i) {
    if (o !== this) throw new Error("Out-of-order effect");
    a(this);
    o = i;
    this.f &= -2;
    if (8 & this.f) _(this);
    t();
  }
  function b(i) {
    this.x = i;
    this.u = void 0;
    this.s = void 0;
    this.o = void 0;
    this.f = 32;
  }
  function p$1(i) {
    var t = new b(i);
    try {
      t.c();
    } catch (i) {
      t.d();
      throw i;
    }
    return t.d.bind(t);
  }
  function s(n, i) {
    l$3[n] = i.bind(null, l$3[n] || function () {});
  }
  function l(n) {
    if (v) v();
    v = n && n.S();
  }
  function d(n) {
    var r = this,
      t = n.data,
      f = useSignal(t);
    f.value = t;
    var o = F(function () {
      var n = r.__v;
      while (n = n.__) if (n.__c) {
        n.__c.__$f |= 4;
        break;
      }
      r.__$u.c = function () {
        r.base.data = o.peek();
      };
      return w(function () {
        var n = f.value.value;
        return 0 === n ? 0 : !0 === n ? "" : n || "";
      });
    }, []);
    return o.value;
  }
  function p(n, r, i, t) {
    var f = r in n && void 0 === n.ownerSVGElement,
      o = u(i);
    return {
      o: function (n, r) {
        o.value = n;
        t = r;
      },
      d: p$1(function () {
        var i = o.value.value;
        if (t[r] !== i) {
          t[r] = i;
          if (f) n[r] = i;else if (i) n.setAttribute(r, i);else n.removeAttribute(r);
        }
      })
    };
  }
  function useSignal(n) {
    return F(function () {
      return u(n);
    }, []);
  }

  /*
   * https://github.com/preactjs/signals/blob/main/packages/core/src/index.ts
   * TOOD: "fix" array being objects
   */
  return {
    setters: [],
    execute: function () {
      logLevel = "warn";
      logBackgroundColor = "green";
      logColor = "black";
      pwaLogger = {
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
      };
      injectLogStyles = args => {
        return ["%cjsenv%cpwa", "background: orange; color: rgb(55, 7, 7); padding: 1px 3px; margin: 0 1px", "background: ".concat(logBackgroundColor, "; color: ").concat(logColor, "; padding: 1px 3px; margin: 0 1px"), ...args];
      };
      l$3 = {
        __e: function (n, l, u, i) {
          for (var t, r, o; l = l.__;) if ((t = l.__c) && !t.__) try {
            if ((r = t.constructor) && null != r.getDerivedStateFromError && (t.setState(r.getDerivedStateFromError(n)), o = t.__d), null != t.componentDidCatch && (t.componentDidCatch(n, i || {}), o = t.__d), o) return t.__E = t;
          } catch (l) {
            n = l;
          }
          throw n;
        }
      }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;
      o$1 = 0;
      f$1 = [];
      c$1 = [];
      e$1 = l$3.__b;
      a$1 = l$3.__r;
      v$2 = l$3.diffed;
      l$2 = l$3.__c;
      m = l$3.unmount;
      l$3.__b = function (n) {
        r$1 = null, e$1 && e$1(n);
      }, l$3.__r = function (n) {
        a$1 && a$1(n), t$1 = 0;
        var i = (r$1 = n.__c).__H;
        i && (u$1 === r$1 ? (i.__h = [], r$1.__h = [], i.__.forEach(function (n) {
          n.__N && (n.__ = n.__N), n.__V = c$1, n.__N = n.i = void 0;
        })) : (i.__h.forEach(k), i.__h.forEach(w$1), i.__h = [])), u$1 = r$1;
      }, l$3.diffed = function (t) {
        v$2 && v$2(t);
        var o = t.__c;
        o && o.__H && (o.__H.__h.length && (1 !== f$1.push(o) && i$1 === l$3.requestAnimationFrame || ((i$1 = l$3.requestAnimationFrame) || j)(b$1)), o.__H.__.forEach(function (n) {
          n.i && (n.__H = n.i), n.__V !== c$1 && (n.__ = n.__V), n.i = void 0, n.__V = c$1;
        })), u$1 = r$1 = null;
      }, l$3.__c = function (t, r) {
        r.some(function (t) {
          try {
            t.__h.forEach(k), t.__h = t.__h.filter(function (n) {
              return !n.__ || w$1(n);
            });
          } catch (u) {
            r.some(function (n) {
              n.__h && (n.__h = []);
            }), r = [], l$3.__e(u, t.__v);
          }
        }), l$2 && l$2(t, r);
      }, l$3.unmount = function (t) {
        m && m(t);
        var r,
          u = t.__c;
        u && u.__H && (u.__H.__.forEach(function (n) {
          try {
            k(n);
          } catch (n) {
            r = n;
          }
        }), u.__H = void 0, r && l$3.__e(r, u.__v));
      };
      g$1 = "function" == typeof requestAnimationFrame;
      o = void 0;
      r = void 0;
      s$1 = 0;
      n = 0;
      f = 0;
      e.prototype.h = function () {
        return !0;
      };
      e.prototype.S = function (i) {
        if (this.t !== i && void 0 === i.e) {
          i.x = this.t;
          if (void 0 !== this.t) this.t.e = i;
          this.t = i;
        }
      };
      e.prototype.U = function (i) {
        if (void 0 !== this.t) {
          var t = i.e,
            h = i.x;
          if (void 0 !== t) {
            t.x = h;
            i.e = void 0;
          }
          if (void 0 !== h) {
            h.e = t;
            i.x = void 0;
          }
          if (i === this.t) this.t = h;
        }
      };
      e.prototype.subscribe = function (i) {
        var t = this;
        return p$1(function () {
          var h = t.value,
            o = 32 & this.f;
          this.f &= -33;
          try {
            i(h);
          } finally {
            this.f |= o;
          }
        });
      };
      e.prototype.valueOf = function () {
        return this.value;
      };
      e.prototype.toString = function () {
        return this.value + "";
      };
      e.prototype.peek = function () {
        return this.v;
      };
      Object.defineProperty(e.prototype, "value", {
        get: function () {
          var i = v$1(this);
          if (void 0 !== i) i.i = this.i;
          return this.v;
        },
        set: function (h) {
          if (h !== this.v) {
            if (n > 100) i();
            this.v = h;
            this.i++;
            f++;
            s$1++;
            try {
              for (var o = this.t; void 0 !== o; o = o.x) o.t.N();
            } finally {
              t();
            }
          }
        }
      });
      (l$1.prototype = new e()).h = function () {
        this.f &= -3;
        if (1 & this.f) return !1;
        if (32 == (36 & this.f)) return !0;
        this.f &= -5;
        if (this.g === f) return !0;
        this.g = f;
        this.f |= 1;
        if (this.i > 0 && !d$1(this)) {
          this.f &= -2;
          return !0;
        }
        var i = o;
        try {
          c(this);
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
        a(this);
        this.f &= -2;
        return !0;
      };
      l$1.prototype.S = function (i) {
        if (void 0 === this.t) {
          this.f |= 36;
          for (var t = this.s; void 0 !== t; t = t.n) t.S.S(t);
        }
        e.prototype.S.call(this, i);
      };
      l$1.prototype.U = function (i) {
        if (void 0 !== this.t) {
          e.prototype.U.call(this, i);
          if (void 0 === this.t) {
            this.f &= -33;
            for (var t = this.s; void 0 !== t; t = t.n) t.S.U(t);
          }
        }
      };
      l$1.prototype.N = function () {
        if (!(2 & this.f)) {
          this.f |= 6;
          for (var i = this.t; void 0 !== i; i = i.x) i.t.N();
        }
      };
      l$1.prototype.peek = function () {
        if (!this.h()) i();
        if (16 & this.f) throw this.v;
        return this.v;
      };
      Object.defineProperty(l$1.prototype, "value", {
        get: function () {
          if (1 & this.f) i();
          var t = v$1(this);
          this.h();
          if (void 0 !== t) t.i = this.i;
          if (16 & this.f) throw this.v;
          return this.v;
        }
      });
      b.prototype.c = function () {
        var i = this.S();
        try {
          if (!(8 & this.f) && void 0 !== this.x) this.u = this.x();
        } finally {
          i();
        }
      };
      b.prototype.S = function () {
        if (1 & this.f) i();
        this.f |= 1;
        this.f &= -9;
        y(this);
        c(this);
        s$1++;
        var t = o;
        o = this;
        return g.bind(this, t);
      };
      b.prototype.N = function () {
        if (!(2 & this.f)) {
          this.f |= 2;
          this.o = r;
          r = this;
        }
      };
      b.prototype.d = function () {
        this.f |= 8;
        if (!(1 & this.f)) _(this);
      };
      d.displayName = "_st";
      Object.defineProperties(e.prototype, {
        constructor: {
          configurable: !0,
          value: void 0
        },
        type: {
          configurable: !0,
          value: d
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
      s("__b", function (n, r) {
        if ("string" == typeof r.type) {
          var i,
            t = r.props;
          for (var f in t) if ("children" !== f) {
            var e$1 = t[f];
            if (e$1 instanceof e) {
              if (!i) r.__np = i = {};
              i[f] = e$1;
              t[f] = e$1.peek();
            }
          }
        }
        n(r);
      });
      s("__r", function (n, r) {
        l();
        var i,
          t = r.__c;
        if (t) {
          t.__$f &= -2;
          if (void 0 === (i = t.__$u)) t.__$u = i = function (n) {
            var r;
            p$1(function () {
              r = this;
            });
            r.c = function () {
              t.__$f |= 1;
              t.setState({});
            };
            return r;
          }();
        }
        l(i);
        n(r);
      });
      s("__e", function (n, r, i, t) {
        l();
        n(r, i, t);
      });
      s("diffed", function (n, r) {
        l();
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
              var v = o[a],
                s = t[a];
              if (void 0 === v) {
                v = p(i, a, s, f);
                o[a] = v;
              } else v.o(s, f);
            }
          }
        }
        n(r);
      });
      s("unmount", function (n, r) {
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
      s("__h", function (n, r, i, t) {
        if (t < 3) r.__$f |= 2;
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
          return p$1(() => {
            callback(rootStateProxy);
          });
        };
        const mutate = toValues => {
          h(() => {
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
              signal: u(childProxy),
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
              signal: u(toValue),
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
              const propertySignal = u(PLACEHOLDER);
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
        const valueSignal = u(initialValue);
        const ref = {
          value: initialValue,
          subscribe: callback => {
            return p$1(() => {
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
      if (!serviceWorkerAPI) ;else if (document.location.protocol !== "https:") ;
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
        const {
          controller
        } = serviceWorkerAPI;
        if (controller) {
          const meta = await inspectServiceWorker(serviceWorkerAPI.controller);
          navigatorControllerSetter({
            meta
          });
        } else {
          navigatorControllerSetter(null);
        }
      };
      applyControllerEffect();
      serviceWorkerAPI.addEventListener("controllerchange", applyControllerEffect);
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
      createServiceWorkerFacade = ({
        scope = "/",
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
          const registration = await serviceWorkerAPI.getRegistration(scope);
          if (registration) {
            watchRegistration(registration);
          }
        };
        init();
        serviceWorkerAPI.addEventListener("controllerchange", async () => {
          const controller = serviceWorkerAPI.controller;
          // happens when an other tab register the service worker and
          // make it control the navigator (when autoclaimOnFirstActivation is true)
          if (controller && state.readyState === "") {
            const registration = await serviceWorkerAPI.getRegistration();
            watchRegistration(registration);
          }
        });
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
      };
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
      }; // https://github.com/GoogleChrome/workbox/issues/1120
      serviceWorkerAPI.addEventListener("message", event => {
        if (event.data === "reload_after_update") {
          pwaLogger.info('"reload_after_update" received from service worker -> reload page');
          reloadPage();
        }
      });
      reloading = false;
      reloadPage = () => {
        if (reloading) {
          return;
        }
        reloading = true;
        window.location.reload();
      };
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
      addToHomescreen = {
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
      };
      initAddToHomeScreen = appNode => {
        const buttonAddToHomescreen = document.createElement("button");
        buttonAddToHomescreen.disabled = !addToHomescreen.availableRef.value;
        buttonAddToHomescreen.innerHTML = "Add to home screen";
        appNode.appendChild(buttonAddToHomescreen);
        buttonAddToHomescreen.onclick = () => {
          addToHomescreen.prompt();
        };
        addToHomescreen.availableRef.subscribe(() => {
          buttonAddToHomescreen.disabled = !addToHomescreen.availableRef.value;
        });
      };
      pwaLogger.setOptions({
        logLevel: "debug"
      });
      swFacade = createServiceWorkerFacade();
      initServiceWorker = appNode => {
        // wait a bit that browser is less busy to register the service worker
        const callLater = window.requestIdleCallback || requestAnimationFrame;
        callLater(() => {
          swFacade.setRegistrationPromise(window.navigator.serviceWorker.register(new URL("/service_worker.js", _context.meta.url)));
        });
        installServiceWorkerUpdateUI(appNode);
      };
      installServiceWorkerUpdateUI = appNode => {
        const buttonCheckUpdate = document.createElement("button");
        buttonCheckUpdate.innerHTML = "Check update";
        const paragraph = document.createElement("p");
        appNode.appendChild(buttonCheckUpdate);
        appNode.appendChild(paragraph);
        buttonCheckUpdate.onclick = async () => {
          buttonCheckUpdate.disabled = true;
          paragraph.innerHTML = "checking for update";
          const found = await swFacade.checkForUpdates();
          if (found) ;else {
            buttonCheckUpdate.disabled = false;
            paragraph.innerHTML = "No update available";
          }
        };
        swFacade.subscribe(({
          update
        }) => {
          if (update.readyState) {
            paragraph.innerHTML = "Update available <button>Activate update</button>";
            paragraph.querySelector("button").onclick = () => {
              paragraph.querySelector("button").disabled = true;
              swFacade.activateUpdate();
            };
          } else {
            paragraph.innerHTML = "";
          }
        });
      };
      greet = () => {
        return "Welcome";
      };
      /**
       * The actual app UI, very simplified of course
       */
      appNode = document.querySelector("#app");
      _export("render", render = () => {
        const logoUrl = new URL(__v__("/other/logo.png"), _context.meta.url);
        appNode.innerHTML = "\n<img src=".concat(logoUrl, " width=\"64\" height=\"64\" alt=\"jsenv logo\" />\n<p>").concat(greet(), "</p>");
        initAddToHomeScreen(appNode);
        initServiceWorker(appNode);
      });
    }
  };
});
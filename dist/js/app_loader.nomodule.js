System.register([__v__("/js/babel_helpers.nomodule.js")], function (_export, _context) {
  "use strict";

  var inlineContent, stylesheet, loadApp, loadAppJs, loadAppCss, loadAppDependencies, loadBannana, loadGorilla, loadJungle;

  function InlineContent(content, _ref) {
    let _ref$type = _ref.type,
        type = _ref$type === void 0 ? "text/plain" : _ref$type;
    this.text = content;
    this.type = type;
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

  function _empty() {}

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
    setters: [function (_babel_helpersJs) {}],
    execute: function () {
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
              performance.measure("app displayed");
            });
          });
        });
      }));

      loadAppJs = _async(function () {
        return _await(_context.import(__v__("/js/app.nomodule.js")), function (app) {
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
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
System.register([__v__("/js/babel_helpers.nomodule.js")], function (_export, _context) {
  "use strict";

  var inlineContent, stylesheet, appJsPromise, appCssPromise, appRemainingDepsPromise, app;
  function InlineContent(content, {
    type = "text/plain"
  }) {
    this.text = content;
    this.type = type;
  }
  return {
    setters: [function (_babel_helpersJs) {}],
    execute: async function () {
      inlineContent = new InlineContent('@font-face {\n  font-family: Roboto;\n  font-style: normal;\n  font-weight: 400;\n  src: local(Roboto), url('+__v__("/other/roboto_v27_latin_regular.woff2")+') format("woff2");\n  font-display: swap;\n}\n', {
        type: "text/css"
      });
      stylesheet = new CSSStyleSheet();
      stylesheet.replaceSync(inlineContent.text);
      performance.measure("loading app");
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
      appJsPromise = (async () => {
        return _await(_context.import(__v__("/js/app.nomodule.js")), function (app) {
          performance.measure("app.js ready");
          return app;
        });
      })();
      appCssPromise = (async () => {
        const cssPromise = new Promise((resolve, reject) => {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.onload = resolve;
          link.onerror = reject;
          link.href = new URL(__v__("/css/app.css"), _context.meta.url);
          // link.crossOrigin = crossOrigin
          document.head.appendChild(link);
        });
        await cssPromise;
        performance.measure("app.css ready");
      })(); // code below simulates the app needs to load 3 things
      // before being ready to be displayed.
      // To keep them generic code is using a setTimeout
      // in practice code would:
      // - perform http request
      // - load assets
      // - preload external libraries
      // - etc...
      appRemainingDepsPromise = (async () => {
        // loading bannana
        await new Promise(resolve => {
          setTimeout(resolve, 20);
        });
        performance.measure("\"loading bannana...\" done");
        // loading gorilla
        await new Promise(resolve => {
          setTimeout(resolve, 30);
        });
        performance.measure("\"loading gorilla...\" done");
        // loading jungle
        await new Promise(resolve => {
          setTimeout(resolve, 20);
        });
        performance.measure("\"loading jungle...\" done");
      })();
      await appRemainingDepsPromise;
      app = await appJsPromise;
      performance.measure("rendering app");
      app.render();
      performance.measure("app rendered");
      await Promise.all([
      // wait for CSS to be loaded before displaying the app
      appCssPromise,
      // app.render() can be very expensive so we wait a bit
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
      })]);
      document.querySelector("#app").removeAttribute("data-hidden");
      performance.measure("app displayed");
    }
  };
});
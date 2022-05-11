const loadCSSAndFonts = async (cssUrl, {
  timeout = 1000,
  onCssReady = () => {},
  onFontsReady = () => {}
} = {}) => {
  const loadedPromise = (async () => {
    try {
      await injectCSS(cssUrl);
      onCssReady();

      if (onFontsReady) {
        await document.fonts.ready;
        onFontsReady();
      }
    } catch (e) {
      return;
    }
  })();

  return Promise.race([loadedPromise, new Promise(resolve => {
    setTimeout(resolve, timeout);
  })]);
};

const injectCSS = (cssUrl, {
  crossOrigin
} = {}) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.onload = resolve;
    link.onerror = reject;
    link.href = cssUrl;
    link.crossOrigin = crossOrigin;
    document.head.appendChild(link);
  });
};

const nextIDLEPromise = window.requestIdleCallback ? ({
  timeout = 60
} = {}) => {
  return new Promise(resolve => {
    window.requestIdleCallback(resolve, {
      timeout
    });
  });
} : () => {
  return new Promise(resolve => {
    window.requestAnimationFrame(resolve);
  });
};

/**
 * This is where you can orchestrate the loading of your application
 */
const loadApp = async ({
  appNode
}) => {
  // to avoid font swapping if possible
  // give max 400ms for this


  const appLoaderCssPromise = loadCSSAndFonts(new URL(__v__("/css/app_loader.css"), import.meta.url), {
    timeout: 400,
    ...(undefined ? {
      onCssReady: () => {
        performance.measure("app_loader.css ready");
      },
      onFontsReady: () => {
        performance.measure("fonts ready");
      }
    } : {})
  }); // start importing app right away

  const appPromise = importApp({ ...({})
  });
  const appCSSPromise = loadCSSAndFonts(new URL(__v__("/css/app.css"), import.meta.url), { ...(undefined ? {
      onCssReady: () => {
        performance.measure("app.css ready");
      }
    } : {})
  });
  await appLoaderCssPromise;

  await new Promise(resolve => {
    setTimeout(resolve, 800);
  });

  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });

  await new Promise(resolve => {
    setTimeout(resolve, 1200);
  });
  const app = await appPromise;

  app.render({
    appNode
  });
  await appCSSPromise; // app.render() can be very expensive so we wait a bit
  // to let navigator an opportunity to cooldown
  // This should help to save battery power and RAM

  await nextIDLEPromise();
};

const importApp = async ({
  onJsReady = () => {}
}) => {
  const app = await import(__v__("/js/app.js"));
  onJsReady();
  return app;
};

export { loadApp };

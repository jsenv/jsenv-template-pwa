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
  updateSplashscreenText
}) => {
  // to avoid font swapping if possible
  // give max 400ms for this


  const appLoaderCssPromise = loadCSSAndFonts(new URL(__v__("/css/app_loader.css"), import.meta.url), {
    timeout: 400,
    onCssReady: () => {
      if (undefined) ;
    },
    onFontsReady: () => {
      if (undefined) ;
    }
  }); // start importing app right away

  const appPromise = importApp({
    onJsReady: () => {
    }
  });
  const appCSSPromise = loadCSSAndFonts(new URL(__v__("/css/app.css"), import.meta.url), {
    onCssReady: () => {
      if (undefined) ;
    }
  });
  await appLoaderCssPromise;
  await updateSplashscreenText("Loading banana...");

  await new Promise(resolve => {
    setTimeout(resolve, 800);
  });
  updateSplashscreenText("Loading gorilla...");

  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
  updateSplashscreenText("Loading the entire jungle...");

  await new Promise(resolve => {
    setTimeout(resolve, 1200);
  });
  const app = await appPromise;

  app.render();
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

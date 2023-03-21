System.register([__v__("/js/vendors.nomodule.js")], function (_export, _context) {
  "use strict";

  var addToHomescreen, pwaLogger, createServiceWorkerFacade, initAddToHomeScreen, swFacade, initServiceWorker, installServiceWorkerUpdateUI, greet, appNode, render;
  return {
    setters: [function (_vendorsJs) {
      addToHomescreen = _vendorsJs.addToHomescreen;
      pwaLogger = _vendorsJs.pwaLogger;
      createServiceWorkerFacade = _vendorsJs.createServiceWorkerFacade;
    }],
    execute: function () {
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
      swFacade = createServiceWorkerFacade({
        scope: "/jsenv-template-pwa/"
      });
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
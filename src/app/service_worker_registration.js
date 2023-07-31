import { pwaLogger, createServiceWorkerFacade } from "@jsenv/pwa"

pwaLogger.setOptions({ logLevel: "debug" })

const swFacade = createServiceWorkerFacade()

export const initServiceWorker = (appNode) => {
  if (!window.navigator.serviceWorker) {
    return
  }
  // wait a bit that browser is less busy to register the service worker
  const callLater = window.requestIdleCallback || requestAnimationFrame
  callLater(() => {
    swFacade.setRegistrationPromise(
      window.navigator.serviceWorker.register(
        new URL("/service_worker.js", import.meta.url),
      ),
    )
  })
  installServiceWorkerUpdateUI(appNode)
}

const installServiceWorkerUpdateUI = (appNode) => {
  const buttonCheckUpdate = document.createElement("button")
  buttonCheckUpdate.innerHTML = "Check update"
  const paragraph = document.createElement("p")
  appNode.appendChild(buttonCheckUpdate)
  appNode.appendChild(paragraph)

  buttonCheckUpdate.onclick = async () => {
    buttonCheckUpdate.disabled = true
    paragraph.innerHTML = "checking for update"
    const found = await swFacade.checkForUpdates()
    if (found) {
      // when update is found, we already know from listenServiceWorkerUpdate
    } else {
      buttonCheckUpdate.disabled = false
      paragraph.innerHTML = "No update available"
    }
  }

  swFacade.subscribe(({ update }) => {
    if (update.readyState) {
      paragraph.innerHTML = `Update available <button>Activate update</button>`
      paragraph.querySelector("button").onclick = () => {
        paragraph.querySelector("button").disabled = true
        swFacade.activateUpdate()
      }
    } else {
      paragraph.innerHTML = ""
    }
  })
}

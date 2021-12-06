import {
  canUseServiceWorker,
  registerServiceWorker,
  getServiceWorkerUpdate,
  listenServiceWorkerUpdate,
  checkServiceWorkerUpdate,
  activateServiceWorkerUpdate,
} from "@jsenv/pwa"

const serviceWorkerUrl = new URL("../../service_worker.js", import.meta.url)

export const initServiceWorker = (app) => {
  if (!canUseServiceWorker) {
    return
  }

  // wait a bit that browser is less busy to register the service worker
  const callLater = window.requestIdleCallback || requestAnimationFrame
  callLater(() => {
    registerServiceWorker(serviceWorkerUrl)
  })

  installServiceWorkerUpdateUI(app)
}

const installServiceWorkerUpdateUI = (app) => {
  const buttonCheckUpdate = document.createElement("button")
  buttonCheckUpdate.innerHTML = "Check update"
  const paragraph = document.createElement("p")
  app.appendChild(buttonCheckUpdate)
  app.appendChild(paragraph)

  buttonCheckUpdate.onclick = async () => {
    buttonCheckUpdate.disabled = true
    paragraph.innerHTML = "checking for update"
    const found = await checkServiceWorkerUpdate()

    if (found) {
      // when update is found, we already know from listenServiceWorkerUpdate
    } else {
      buttonCheckUpdate.disabled = false
      paragraph.innerHTML = "No update available"
    }
  }

  listenServiceWorkerUpdate(() => {
    const available = Boolean(getServiceWorkerUpdate())
    if (available) {
      paragraph.innerHTML = `Update available <button>Activate update</button>`
      paragraph.querySelector("button").onclick = async () => {
        paragraph.querySelector("button").disabled = true
        await activateServiceWorkerUpdate()
      }
    } else {
      paragraph.innerHTML = ""
    }
  })
}

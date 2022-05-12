import { canUseServiceWorkers, createServiceWorkerScript } from "@jsenv/pwa"

const script = createServiceWorkerScript()

export const initServiceWorker = (app) => {
  if (!canUseServiceWorkers) {
    return
  }
  // wait a bit that browser is less busy to register the service worker
  const callLater = window.requestIdleCallback || requestAnimationFrame
  callLater(() => {
    script.setRegistrationPromise(
      window.navigator.serviceWorker.register(
        new URL("/src/service_worker.js", import.meta.url),
        {
          type: "module",
        },
      ),
    )
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
    const found = await script.checkForUpdate()

    if (found) {
      // when update is found, we already know from listenServiceWorkerUpdate
    } else {
      buttonCheckUpdate.disabled = false
      paragraph.innerHTML = "No update available"
    }
  }

  script.listenUpdateChange(() => {
    const update = script.getUpdate()
    if (update) {
      paragraph.innerHTML = `Update available <button>Activate update</button>`
      paragraph.querySelector("button").onclick = () => {
        paragraph.querySelector("button").disabled = true
        update.activate()
      }
    } else {
      paragraph.innerHTML = ""
    }
  })
}

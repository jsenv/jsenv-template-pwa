import {
  canUseServiceWorker,
  getServiceWorkerUpdate,
  listenServiceWorkerUpdate,
  checkServiceWorkerUpdate,
  activateServiceWorkerUpdate,
} from "@jsenv/pwa"

const installServiceWorkerUpdateUI = () => {
  const buttonCheckUpdate = document.createElement("button")
  buttonCheckUpdate.innerHTML = "Check update"
  const paragraph = document.createElement("p")
  document.body.appendChild(buttonCheckUpdate)
  document.body.appendChild(paragraph)

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

if (canUseServiceWorker) {
  installServiceWorkerUpdateUI()
}

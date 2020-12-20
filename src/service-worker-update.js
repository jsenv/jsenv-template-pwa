import {
  canUseServiceWorker,
  getServiceWorkerUpdate,
  listenServiceWorkerUpdate,
  checkServiceWorkerUpdate,
  activateServiceWorkerUpdate,
} from "@jsenv/pwa"
import { createDOM } from "src/dom.js"

if (canUseServiceWorker) {
  const serviceWorkerUpdateDocument = createDOM(`
<button>Check update</button>
<p></p>
`)
  const buttonCheckUpdate = serviceWorkerUpdateDocument.querySelector("button")
  const paragraph = serviceWorkerUpdateDocument.querySelector("p")
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

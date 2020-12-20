import "src/add-to-home-screen.js"
import "src/service-worker-registration.js"
import "src/service-worker-update.js"
import { greet } from "src/greet.js"

const faviconUrl = new URL("../icons/favicon.png", import.meta.url)

window.splashscreen.remove()

document.querySelector("#app").innerHTML = `

<img src=${faviconUrl} width="64" />

<p>${greet()}</p>`

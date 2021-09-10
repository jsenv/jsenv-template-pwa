/**
 * The actual app UI, very simplified of course.
 * Don't forget to call window.splashscreen.appIsReady() at some point
 * or the splashscreen will stay forever on top of the app UI
 */

import { initPwa } from "src/app/pwa/pwa.js"
import { greet } from "src/app/greet.js"

const app = document.querySelector("#app")

export const render = () => {
  app.innerHTML = `

<img src=${new URL("../logo.png", import.meta.url)} width="64" />

<p>${greet()}</p>`

  initPwa(app)
}

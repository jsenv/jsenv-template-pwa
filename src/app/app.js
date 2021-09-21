/**
 * The actual app UI, very simplified of course
 */

import { initPwa } from "root/src/app/pwa/pwa.js"
import { greet } from "root/src/app/greet.js"

const app = document.querySelector("#app")

export const render = () => {
  app.innerHTML = `

<img src=${new URL("../logo.png", import.meta.url)} width="64" />

<p>${greet()}</p>`

  initPwa(app)
}

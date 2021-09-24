/**
 * The actual app UI, very simplified of course
 */

import { initPwa } from "root/src/app/pwa/pwa.js"
import { greet } from "root/src/app/greet.js"

const app = document.querySelector("#app")

export const render = () => {
  const logoUrl = new URL("../logo.png", import.meta.url)

  app.innerHTML = `
<img src=${logoUrl} width="64" height="64" alt="jsenv logo" />
<p>${greet()}</p>`

  initPwa(app)
}

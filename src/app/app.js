/**
 * The actual app UI, very simplified of course
 */

import { initAddToHomeScreen } from "./add_to_home_screen.js"
import { initServiceWorker } from "./service_worker.js"

import { greet } from "./greet.js"

const appNode = document.querySelector("#app")

export const render = () => {
  const logoUrl = new URL("/src/logo.png", import.meta.url)

  appNode.innerHTML = `
<img src=${logoUrl} width="64" height="64" alt="jsenv logo" />
<p>${greet()}</p>`

  initAddToHomeScreen(appNode)
  initServiceWorker(appNode)
}

/**
 * The actual app UI, very simplified of course
 */

import { initPwa } from "./pwa/pwa.js"
import { greet } from "./greet.js"

export const render = ({ appNode }) => {
  const logoUrl = new URL("/src/logo.png", import.meta.url)

  appNode.innerHTML = `
<img src=${logoUrl} width="64" height="64" alt="jsenv logo" />
<p>${greet()}</p>`
  initPwa(appNode)
}

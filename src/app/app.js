/**
 * The actual app UI, very simplified of course.
 * Don't forget to call window.splashscreen.appIsReady() at some point
 * or the splashscreen will stay forever on top of the app UI
 */

import "src/app/pwa/pwa.js"
import { greet } from "src/app/greet.js"

export const render = () => {
  document.querySelector("#app").innerHTML = `

<img src=${new URL("../logo.png", import.meta.url)} width="64" />

<p>${greet()}</p>`
}

/**
 * This is where you can orchestrate the loading of your application
 */

import { injectCSS, nextIDLEPromise } from "./boot.utils.js"

const prepareApp = async () => {
  await injectCSS(new URL("./boot.css", import.meta.url), { crossOrigin: true }).catch(() => {})
  await document.fonts.ready
  // window.splashscreen.takeOver() means this code is taking responsability of the splashscreen.
  // It prevents main.html to display <div id="booting_is_slow"></div> to the user
  window.splashscreen.takeOver()

  const updateSplascreenText = (message) => {
    const splashscreenMessageNode = document.querySelector("#splashscreen_message")
    splashscreenMessageNode.innerHTML = message
  }

  updateSplascreenText(`Loading banana...`)
  await new Promise((resolve) => {
    setTimeout(resolve, 600)
  })

  updateSplascreenText(`Loading gorilla...`)
  await new Promise((resolve) => {
    setTimeout(resolve, 800)
  })

  updateSplascreenText(`Loading the entire jungle...`)
  await new Promise((resolve) => {
    setTimeout(resolve, 1200)
  })
}

const loadApp = () => {
  return import("../app/app.js")
}

const [, app] = await Promise.all([prepareApp(), loadApp()])
// app.render() can be very expensive so we wait a bit
// to let navigator an opportunity to cooldown.
// This should help to save battery power and RAM
await nextIDLEPromise()
app.render()
window.splashscreen.appIsReady()

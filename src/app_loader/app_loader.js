/**
 * This is where you can orchestrate the loading of your application
 */

import { DEV } from "#env"
import { injectCSS, nextIDLEPromise } from "./app_loader_utils.js"

export const loadApp = async () => {
  const [, app] = await Promise.all([prepareApp(), importApp()])
  // app.render() can be very expensive so we wait a bit
  // to let navigator an opportunity to cooldown.
  // This should help to save battery power and RAM
  await nextIDLEPromise()
  app.render()
  if (DEV) {
    performance.measure(`App displayed`)
  }
  window.splashscreen.appIsReady()
}

const prepareApp = async () => {
  // try to load CSS + get the main fonts before displaying any text
  // to avoid font swapping if possible
  // give max 400ms for this
  await Promise.race([
    loadCSSAndFonts(),
    new Promise((resolve) => setTimeout(resolve, 400)),
  ])

  const appCSSLoadedPromise = injectCSS(
    new URL("../app/app.css", import.meta.url),
    {
      crossOrigin: true,
    },
  )

  // De-comment the await below to test the case where load is slow
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 3500)
  // })

  // window.splashscreen.takeOver() means this code is taking responsability of the splashscreen.
  // It prevents main.html to display <div id="booting_is_slow"></div> to the user
  window.splashscreen.takeOver()

  const updateSplascreenText = (message) => {
    const splashscreenMessageNode = document.querySelector(
      "#splashscreen_message",
    )
    splashscreenMessageNode.innerHTML = message
  }

  updateSplascreenText(`Loading banana...`)
  if (DEV) {
    performance.measure(`"loading bannana..." displayed`)
  }
  await new Promise((resolve) => {
    setTimeout(resolve, 800)
  })

  updateSplascreenText(`Loading gorilla...`)
  if (DEV) {
    performance.measure(`"loading gorilla..." displayed`)
  }
  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })

  updateSplascreenText(`Loading the entire jungle...`)
  if (DEV) {
    performance.measure(`"entire jungle..." displayed`)
  }
  await new Promise((resolve) => {
    setTimeout(resolve, 1200)
  })

  await appCSSLoadedPromise
}

const loadCSSAndFonts = async () => {
  try {
    await injectCSS(new URL("./app_loader.css", import.meta.url), {
      crossOrigin: true,
    })
    if (DEV) {
      performance.measure(`app_loader.css loaded`)
    }
    await document.fonts.ready
    if (DEV) {
      performance.measure(`fonts ready`)
    }
  } catch (e) {
    return
  }
}

const importApp = async () => {
  const app = await import("../app/app.js")
  if (DEV) {
    performance.measure("app.js imported")
  }
  return app
}

/**
 * This is where you can orchestrate the loading of your application
 */

import { loadCSSAndFonts, nextIDLEPromise } from "./app_loader_utils.js"

export const loadApp = async ({ appNode }) => {
  performance.measure(`loading app`)

  // try to load CSS + get the main fonts before displaying any text
  // to avoid font swapping if possible
  // give max 400ms for this
  const appLoaderCssPromise = loadCSSAndFonts(
    new URL("./app_loader.css", import.meta.url),
    {
      timeout: 400,
      onCssReady: () => {
        performance.measure(`app_loader.css ready`)
      },
      onFontsReady: () => {
        performance.measure(`fonts ready`)
      },
    },
  )
  // start importing app right away
  const appPromise = importApp({
    onJsReady: () => {
      performance.measure("app.js ready")
    },
  })
  const appCSSPromise = loadCSSAndFonts(
    new URL("../app/app.css", import.meta.url),
    {
      onCssReady: () => {
        performance.measure(`app.css ready`)
      },
    },
  )

  await appLoaderCssPromise
  await loadBannana()

  const app = await appPromise

  performance.measure(`rendering app`)
  app.render({
    appNode,
  })
  performance.measure(`app rendered`)
  await appCSSPromise
  // app.render() can be very expensive so we wait a bit
  // to let navigator an opportunity to cooldown
  // This should help to save battery power and RAM
  await nextIDLEPromise()
  performance.measure(`app displayed`)
}

const importApp = async ({ onJsReady = () => {} }) => {
  const app = await import("../app/app.js")
  onJsReady()
  return app
}

// The 3 functions below simulates the app needs to load 3 things
// before being ready to be displayed.
// To keep them generic the functions are just doing a setTimeout
// in practice you would:
// - perform http request
// - load assets
// - preload external libraries
// - etc...
const loadBannana = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 20)
  })
  performance.measure(`"loading bannana..." done`)
  await loadGorilla()
}
const loadGorilla = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 30)
  })
  performance.measure(`"loading gorilla..." done`)
  await loadJungle()
}
const loadJungle = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 20)
  })
  performance.measure(`"loading jungle..." done`)
}

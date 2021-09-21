/**
 * This is where you can orchestrate the loading of your application
 */

import { DEV } from "#env"
import { injectCSS, nextIDLEPromise } from "./app_loader_utils.js"

export const loadApp = async ({ updateSplashscreenText }) => {
  // start importing app right away
  const appPromise = importApp()
  const appCSSPromise = loadCSSAndFonts(
    new URL("../app/app.css", import.meta.url),
    {
      onCssReady: () => {
        if (DEV) {
          performance.measure(`app.css ready`)
        }
      },
    },
  )

  // try to load CSS + get the main fonts before displaying any text
  // to avoid font swapping if possible
  // give max 400ms for this
  await loadCSSAndFonts(new URL("./app_loader.css", import.meta.url), {
    timeout: 400,
    onCssReady: () => {
      if (DEV) {
        performance.measure(`app_loader.css ready`)
      }
    },
    onFontsReady: () => {
      if (DEV) {
        performance.measure(`fonts ready`)
      }
    },
  })

  updateSplashscreenText(`Loading banana...`)
  if (DEV) {
    performance.measure(`"loading bannana..." displayed`)
  }
  await new Promise((resolve) => {
    setTimeout(resolve, 800)
  })

  updateSplashscreenText(`Loading gorilla...`)
  if (DEV) {
    performance.measure(`"loading gorilla..." displayed`)
  }
  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })

  updateSplashscreenText(`Loading the entire jungle...`)
  if (DEV) {
    performance.measure(`"entire jungle..." displayed`)
  }
  await new Promise((resolve) => {
    setTimeout(resolve, 1200)
  })

  const app = await appPromise
  app.render()
  await appCSSPromise
  // app.render() can be very expensive so we wait a bit
  // to let navigator an opportunity to cooldown
  // This should help to save battery power and RAM
  await nextIDLEPromise()
  if (DEV) {
    performance.measure(`App displayed`)
  }
}

const loadCSSAndFonts = async (
  cssUrl,
  { timeout = 1000, onCssReady = () => {}, onFontsReady = () => {} } = {},
) => {
  const loadedPromise = (async () => {
    try {
      await injectCSS(cssUrl)
      onCssReady()
      if (onFontsReady) {
        await document.fonts.ready
        onFontsReady()
      }
    } catch (e) {
      return
    }
  })()
  return Promise.race([
    loadedPromise,
    new Promise((resolve) => {
      setTimeout(resolve, timeout)
    }),
  ])
}

const importApp = async () => {
  const app = await import("../app/app.js")
  if (DEV) {
    performance.measure("app.js imported")
  }
  return app
}

/**
 * This is where you can orchestrate the loading of your application
 */

import { loadCSSAndFonts, nextIDLEPromise } from "./app_loader_utils.js"

export const loadApp = async ({ appNode }) => {
  if (import.meta.dev) {
    performance.measure(`loading app`)
  }

  // try to load CSS + get the main fonts before displaying any text
  // to avoid font swapping if possible
  // give max 400ms for this
  const appLoaderCssPromise = loadCSSAndFonts(
    new URL("./app_loader.css", import.meta.url),
    {
      timeout: 400,
      ...(import.meta.dev
        ? {
            onCssReady: () => {
              performance.measure(`app_loader.css ready`)
            },
            onFontsReady: () => {
              performance.measure(`fonts ready`)
            },
          }
        : {}),
    },
  )
  // start importing app right away
  const appPromise = importApp({
    ...(import.meta.dev
      ? {
          onJsReady: () => {
            performance.measure("app.js ready")
          },
        }
      : {}),
  })
  const appCSSPromise = loadCSSAndFonts(
    new URL("../app/app.css", import.meta.url),
    {
      ...(import.meta.dev
        ? {
            onCssReady: () => {
              performance.measure(`app.css ready`)
            },
          }
        : {}),
    },
  )

  await appLoaderCssPromise
  if (import.meta.dev) {
    performance.measure(`"loading bannana..." done`)
  }
  await new Promise((resolve) => {
    setTimeout(resolve, 800)
  })

  if (import.meta.dev) {
    performance.measure(`"loading gorilla..." done`)
  }
  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })

  if (import.meta.dev) {
    performance.measure(`"entire jungle..." done`)
  }
  await new Promise((resolve) => {
    setTimeout(resolve, 1200)
  })

  const app = await appPromise
  if (import.meta.dev) {
    performance.measure(`rendering app`)
  }
  app.render({
    appNode,
  })
  await appCSSPromise
  // app.render() can be very expensive so we wait a bit
  // to let navigator an opportunity to cooldown
  // This should help to save battery power and RAM
  await nextIDLEPromise()
  if (import.meta.dev) {
    performance.measure(`app rendered`)
  }
}

const importApp = async ({ onJsReady = () => {} }) => {
  const app = await import("../app/app.js")
  onJsReady()
  return app
}

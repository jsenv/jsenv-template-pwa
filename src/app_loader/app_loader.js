/**
 * This is where you can orchestrate the loading of your application
 */

import appLoaderStylesheet from "./app_loader.css" assert { type: "css" }

export const loadApp = async ({ appNode }) => {
  performance.measure(`loading app`)
  document.adoptedStyleSheets = [
    ...document.adoptedStyleSheets,
    appLoaderStylesheet,
  ]
  const appJsPromise = loadAppJs()
  const appCssPromise = loadAppCss(new URL("/src/app/app.css", import.meta.url))
  const appDepsPromise = loadAppDependencies()

  await appDepsPromise
  const app = await appJsPromise
  performance.measure(`rendering app`)
  app.render({ appNode })
  performance.measure(`app rendered`)
  await Promise.all([
    // wait for CSS to be loaded before displaying the app
    appCssPromise,
    // app.render() can be very expensive so we wait a bit
    // to let navigator an opportunity to cooldown
    // This should help to save battery power and RAM
    new Promise((resolve) => {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(resolve, { timeout: 60 })
      } else {
        window.requestAnimationFrame(resolve)
      }
    }),
  ])
  performance.measure(`app displayed`)
}

const loadAppJs = async () => {
  const app = await import("../app/app.js")
  performance.measure("app.js ready")
  return app
}

const loadAppCss = async (cssUrl, { crossOrigin } = {}) => {
  const cssPromise = new Promise((resolve, reject) => {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.onload = resolve
    link.onerror = reject
    link.href = cssUrl
    link.crossOrigin = crossOrigin
    document.head.appendChild(link)
  })
  await cssPromise
  performance.measure(`app.css ready`)
}

// loadAppDependencies below simulates the app needs to load 3 things
// before being ready to be displayed.
// To keep them generic the functions are just doing a setTimeout
// in practice you would:
// - perform http request
// - load assets
// - preload external libraries
// - etc...
const loadAppDependencies = async () => {
  await loadBannana()
}
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

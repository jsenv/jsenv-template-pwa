/**
 * This is where you can orchestrate the loading of your application
 */

import mainStylesheet from "./main.css" assert { type: "css" }

performance.measure(`loading app`)
document.adoptedStyleSheets = [...document.adoptedStyleSheets, mainStylesheet]
const appJsPromise = (async () => {
  const app = await import("./app/app.js")
  performance.measure("app.js ready")
  return app
})()
const appCssPromise = (async () => {
  const cssPromise = new Promise((resolve, reject) => {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.onload = resolve
    link.onerror = reject
    link.href = new URL("./app/app.css", import.meta.url)
    // link.crossOrigin = crossOrigin
    document.head.appendChild(link)
  })
  await cssPromise
  performance.measure(`app.css ready`)
})()
// code below simulates the app needs to load 3 things
// before being ready to be displayed.
// To keep them generic code is using a setTimeout
// in practice code would:
// - perform http request
// - load assets
// - preload external libraries
// - etc...
const appRemainingDepsPromise = (async () => {
  // loading bannana
  await new Promise((resolve) => {
    setTimeout(resolve, 20)
  })
  performance.measure(`"loading bannana..." done`)
  // loading gorilla
  await new Promise((resolve) => {
    setTimeout(resolve, 30)
  })
  performance.measure(`"loading gorilla..." done`)
  // loading jungle
  await new Promise((resolve) => {
    setTimeout(resolve, 20)
  })
  performance.measure(`"loading jungle..." done`)
})()

await appRemainingDepsPromise
const app = await appJsPromise
performance.measure(`rendering app`)
app.render()
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
document.querySelector("#app").removeAttribute("data-hidden")
performance.measure(`app displayed`)

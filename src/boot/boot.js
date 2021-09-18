// TODO: explain this file

import { DEV } from "#env"

if (DEV) {
  const { injectDevRibbon } = await import("./dev_ribbon.js")
  injectDevRibbon()
}

const splashscreen = {
  /*
   * takeOver is implemented later in this script.
   * takeOver is meant to be called by code that want to take responsability
   * of what is displayed in the splashscreen
   *
   * It is used by boot/boot.js once it starts to render a different UI in the splashscreen
   */
  takeOver: () => {},
  /*
   * appIsReady is implemented later in this script.
   * appIsReady is meant to be called once:
   * - Code has rendered html inside <div id="app"></div>
   * - This html is ready to be displayed (css ands fonts loaded for example)
   *
   * It is used by app/app.js once it has rendered the HTML and font is loaded
   */
  appIsReady: () => {},
}
window.splashscreen = splashscreen

// When it take more than "BOOTING_SLOW"ms for code to call window.splashscreen.takeOver()
// splashscreen displays <div id="booting_is_slow"> content
const BOOTING_SLOW = 2500
// When it takes less than "SPLASHIN_DELAY"ms for code to call window.splashscreen.appIsReady()
// we won't even show the splashscreen (happens on user second visit because everything is in browser cache)
const SPLASHIN_DELAY = 300
// When less than "SPLASHOUT_MIN_INTERVAL"ms have ellapsed since splashin animation started
// we will ensure "SPLASHOUT_MIN_INTERVAL"ms ellapses before playing the splashout animation
// This is to prevent a disturbing blink when code calls window.splashscreen.appIsReady() just after
// splashin animation
const SPLASHOUT_MIN_INTERVAL = 650

const appNode = document.querySelector("#app")
const splashscreenNode = document.querySelector("#splashscreen")

const BOOTING_START = "booting_start"
const BOOTING_IS_SLOW = "booting_is_slow"
const BOOTING_ERROR = "booting_error"

const boot = async () => {
  const bootStartMs = Date.now()

  let splashIsVisible = false
  const splashin = () => {
    splashscreenNode.setAttribute("data-splashin", "")
    splashIsVisible = true
  }

  const splashout = async () => {
    splashscreenNode.setAttribute("data-splashout", "")
    await new Promise((resolve) => {
      setTimeout(() => {
        splashIsVisible = false
        resolve()
      }, 300)
    })
  }

  const killSplashscreen = () => {
    appNode.removeAttribute("data-booting")
    // Here splashscreen is "killed" with display: 'none' but it could also
    // be removed from the DOM
    splashscreenNode.style.display = "none"
    splashIsVisible = false
  }

  const splashInTimeout = setTimeout(splashin, SPLASHIN_DELAY)

  const bootingIsSlowTimeout = setTimeout(() => {
    setBootingState(BOOTING_IS_SLOW)
  }, BOOTING_SLOW)

  window.splashscreen.takeOver = () => {
    clearTimeout(bootingIsSlowTimeout)
  }

  window.splashscreen.appIsReady = async () => {
    clearTimeout(splashInTimeout)
    clearTimeout(bootingIsSlowTimeout)

    if (!splashIsVisible) {
      // app was super fast to load, splashscreen was not even displayed, cool
      killSplashscreen()
      return
    }

    const splashInMs = bootStartMs + SPLASHIN_DELAY
    const msEllapsedSinceSplashIn = Date.now() - splashInMs

    if (msEllapsedSinceSplashIn < SPLASHOUT_MIN_INTERVAL) {
      const msToWaitToPreventBlink =
        SPLASHOUT_MIN_INTERVAL - msEllapsedSinceSplashIn
      await new Promise((resolve) => {
        setTimeout(resolve, msToWaitToPreventBlink)
      })
    }

    // Wait the end of the "splashout" animation before killing splashscreen entirely
    await splashout()
    killSplashscreen()
  }

  try {
    setBootingState(BOOTING_START)
    const { loadApp } = await import("../app_loader/app_loader.js")
    await loadApp()
  } catch (error) {
    clearTimeout(bootingIsSlowTimeout)

    setBootingState(BOOTING_ERROR, {
      errorStack:
        error.stack ||
        `<No stack associated with this error> (Check devtools to get more info)`,
    })
    throw error
  }
}

const setBootingState = (nextBootingState, data = {}) => {
  const splashscreenMessageNode = document.querySelector(
    "#splashscreen_message",
  )
  splashscreenMessageNode.innerHTML = ""
  const variantModel = document.querySelector(`#${nextBootingState}`)
  const variantInstance = variantModel.cloneNode(true)

  replaceNodeVariables(variantInstance, data)
  splashscreenMessageNode.appendChild(variantInstance)
}

const replaceNodeVariables = (node, data) => {
  if (node.nodeName === "#text") {
    node.textContent = node.textContent.replace(/\${(\w*)}/g, (_, key) => {
      return data.hasOwnProperty(key) ? data[key] : ""
    })
    return
  }

  Array.from(node.childNodes).forEach((node) => {
    replaceNodeVariables(node, data)
  })
}

if (window.browserIsSupported) {
  await boot()
}

/**
 * This is where you can provide a great loading experience in case app.js
 * takes time to load. You could display a nice loading screen
 * with information regarding the app loading progress
 */

const link = document.createElement("link")
link.rel = "stylesheet"
link.href = new URL("./boot.css", import.meta.url)
document.head.appendChild(link)

const logoImg = document.createElement("img")
logoImg.src = new URL("../logo.png", import.meta.url)
logoImg.style.maxHeight = "100px"
document.querySelector("#splashscreen_content").appendChild(logoImg)

// artifically wait a bit before calling takeOver(), this is to show that
// this file is allowed to take some time to actually render a loading screen
setTimeout(() => {
  window.splashscreen.takeOver()
}, 400)

await import("../app/app.js")

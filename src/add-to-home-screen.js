import { listenAddToHomescreenAvailable, promptAddToHomescreen } from "@jsenv/pwa"
import { createDOM } from "src/dom.js"

const addToHomeScreenDocument = createDOM(`<button disabled>Add to home screen</button>`)
const buttonAddToHomescreen = addToHomeScreenDocument.querySelector("button")
document.body.appendChild(buttonAddToHomescreen)

buttonAddToHomescreen.onclick = () => {
  promptAddToHomescreen()
}
listenAddToHomescreenAvailable((available) => {
  buttonAddToHomescreen.disabled = !available
})

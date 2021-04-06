import { listenAddToHomescreenAvailable, promptAddToHomescreen } from "@jsenv/pwa"

const buttonAddToHomescreen = document.createElement("button")
buttonAddToHomescreen.disabled = true
buttonAddToHomescreen.innerHTML = "Add to home screen"
document.body.appendChild(buttonAddToHomescreen)

buttonAddToHomescreen.onclick = () => {
  promptAddToHomescreen()
}
listenAddToHomescreenAvailable((available) => {
  buttonAddToHomescreen.disabled = !available
})

import { addToHomescreen } from "@jsenv/pwa"

const buttonAddToHomescreen = document.createElement("button")
buttonAddToHomescreen.disabled = !addToHomescreen.isAvailable()
buttonAddToHomescreen.innerHTML = "Add to home screen"
document.body.appendChild(buttonAddToHomescreen)

buttonAddToHomescreen.onclick = () => {
  addToHomescreen.prompt()
}
addToHomescreen.listenAvailabilityChange(() => {
  buttonAddToHomescreen.disabled = !addToHomescreen.isAvailable()
})

import { addToHomescreen } from "@jsenv/pwa"

export const initAddToHomeScreen = (app) => {
  const buttonAddToHomescreen = document.createElement("button")
  buttonAddToHomescreen.disabled = !addToHomescreen.isAvailable()
  buttonAddToHomescreen.innerHTML = "Add to home screen"
  app.appendChild(buttonAddToHomescreen)

  buttonAddToHomescreen.onclick = () => {
    addToHomescreen.prompt()
  }
  addToHomescreen.listenAvailabilityChange(() => {
    buttonAddToHomescreen.disabled = !addToHomescreen.isAvailable()
  })
}

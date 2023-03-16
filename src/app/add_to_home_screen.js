import { addToHomescreen } from "@jsenv/pwa"

export const initAddToHomeScreen = (appNode) => {
  const buttonAddToHomescreen = document.createElement("button")
  buttonAddToHomescreen.disabled = !addToHomescreen.availableRef.value
  buttonAddToHomescreen.innerHTML = "Add to home screen"
  appNode.appendChild(buttonAddToHomescreen)

  buttonAddToHomescreen.onclick = () => {
    addToHomescreen.prompt()
  }
  addToHomescreen.availableRef.subscribe(() => {
    buttonAddToHomescreen.disabled = !addToHomescreen.availableRef.value
  })
}

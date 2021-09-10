import { initAddToHomeScreen } from "./add_to_home_screen.js"
import { initServiceWorker } from "./service_worker.js"

export const initPwa = (app) => {
  initAddToHomeScreen(app)
  initServiceWorker(app)
}

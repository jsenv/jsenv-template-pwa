import { registerServiceWorker } from "@jsenv/pwa"

// wait a bit that browser is less busy to register the service worker
requestIdleCallback(() => {
  registerServiceWorker("/service-worker.js")
})

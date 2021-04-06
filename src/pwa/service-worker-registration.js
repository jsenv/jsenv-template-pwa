import { registerServiceWorker } from "@jsenv/pwa"

// wait a bit that browser is less busy to register the service worker
const callLater = requestIdleCallback ? requestIdleCallback : requestAnimationFrame
callLater(() => {
  registerServiceWorker("/service-worker.js")
})

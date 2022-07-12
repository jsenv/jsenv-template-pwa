import { chromium } from "playwright"

process.env.LOG_LEVEL = "warn" // discard logs related to build server
const { server } = await import("../build/start_build_server.mjs")
const browser = await chromium.launch()
const browserContext = await browser.newContext({
  ignoreHTTPSErrors: true,
})
const page = await browserContext.newPage()
await page.goto(server.origin)
const measures = await page.evaluate(
  /* eslint-disable no-undef */
  async () => {
    await window.appDisplayedPromise
    const { performance } = window
    const measures = {}
    const measurePerfEntries = performance.getEntriesByType("measure")
    measurePerfEntries.forEach((measurePerfEntry) => {
      measures[measurePerfEntry.name] = measurePerfEntry.duration
    })
    return measures
  },
  /* eslint-enable no-undef */
)
await browser.close()
await server.stop()

const metrics = {}
Object.keys(measures).forEach((measureName) => {
  metrics[measureName] = { value: measures[measureName], unit: "ms" }
})

export const bootMetrics = metrics

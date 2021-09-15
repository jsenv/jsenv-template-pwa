# PWA compatiblity

If you want to build a regular web application you can follow the [Steps to remove pwa](#Steps-to-remove-pwa)

# Steps to remove pwa

- Remove `<link rel="manifest">` from [main.html](../../main.html#L8)
- Remove `beforeinstallprompt` script from [main.html](../../main.html#L280)
- Remove [pwa.webmanifest](../../pwa.webmanifest) file
- Remove `initPwa` from [src/app/app.js](../../src/app/app.js)
- Remove [src/app/pwa/](../../src/app/pwa) directory
- Remove `serviceWorkers` and `serviceWorkerFinalizer` from [build script](../../script/build/build.mjs#L25)
- Remove `@jsenv/pwa` from `"dependencies"` in [package.json](../../package.json#L42)

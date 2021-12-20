# PWA compatiblity

A progressive web application is a regular website that meets some "installability requirements".
Once requirements are met the website can be "installed" on a device and provides a user experience similar to native application.

You can remove PWA compatibility as described in [Steps to remove pwa](#Steps-to-remove-pwa)

# Steps to remove pwa

- Remove `<link rel="manifest">` from [main.html](../../src/main.html#L8)
- Remove `beforeinstallprompt` script from [main.html](../../src/main.html#L280)
- Remove [pwa.webmanifest](../../src/pwa.webmanifest) file
- Remove `initPwa` from [src/app/app.js](../../src/app/app.js)
- Remove [src/app/pwa/](../../src/app/pwa) directory
- Remove `serviceWorkers` and `serviceWorkerFinalizer` from [build script](../../script/build/build.mjs#L25)
- Remove `@jsenv/pwa` from `"dependencies"` in [package.json](../../package.json#L42)

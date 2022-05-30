# PWA compatiblity

A progressive web application is a regular website that meets some "installability requirements".
Once requirements are met the website can be "installed" on a device and provides a user experience similar to native application.

You can remove PWA compatibility as described in [Steps to remove pwa](#Steps-to-remove-pwa)

# Steps to remove pwa

- Remove `<link rel="manifest">` from [main.html](../../src/main.html#L13)
- Remove `<link rel="apple-touch-icon">` from [main.html](../../src/main.html#L14)
- Remove _beforeinstallprompt_ script from [main.html](../../src/main.html#L106-L120)
- Remove [pwa.webmanifest](../../src/pwa.webmanifest) file
- Remove _initPwa_ from [src/app/app.js](../../src/app/app.js)
- Remove [src/app/pwa/](../../src/app/pwa) directory
- Remove _serviceWorkers_ and _serviceWorkerFinalizer_ from [build script](../../scripts/build/build.mjs#L24-L27)
- Remove `"@jsenv/pwa"` from `"dependencies"` in [package.json](../../package.json#L40)

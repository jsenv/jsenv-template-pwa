If you want to build a regular web application you can follow the [Steps to remove pwa](#Steps-to-remove-pwa)

# Steps to remove pwa

- Remove `<link rel="manifest">` from [main.html](./main.html#L8)
- Remove `beforeinstallprompt` script from [main.html](./main.html#L210)
- Remove [pwa.webmanifest](./pwa.webmanifest) file
- Remove [src/pwa](./src/pwa) directory
- Remove `import "src/pwa/pwa.js"` from [src/app.js](./src/app.js)
- Remove `serviceWorkers` and `serviceWorkerFinalizer` from [build script](./script/generate-systemjs-build/generate-systemjs-build.js)
- Remove `@jsenv/pwa` from dependencies in [package.json](./package.json#L52)

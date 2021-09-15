# Building

In order to optimize files for production use `npm run dist`.
This will write files into [dist/](./dist/) directory.

The build perform the following things:

- Code treeshaking
  - The code specific to development is removed. See [Production mode](../production_mode/readme.md#Production-mode)
  - Unused code is removed
- Minify js, css, json, html, and svg files
- Url versionning (replacing url with an hash to enable long term caching)
- Concatenation of js files
- Configure service worker to put all static urls into browser cache
- Use [systemjs format](https://github.com/systemjs/systemjs)
  - importmap support for old browsers
    - Enables accurate cache invalidation: 1 file modified -> 1 file to redownload for the browser
  - top level await support for old browsers
  - dynamic import support for old browsers

```console
> node ./script/build/build.mjs

building ./main.html...
--- files in the build: 14 ---
dist/systemjs/assets/app-0f239860.css (111 B)
dist/systemjs/assets/boot-9c6848bb.css (224 B)
dist/systemjs/assets/favicon-25e95a00.png (6.67 KB)
dist/systemjs/assets/logo-25e95a00.png (6.67 KB)
dist/systemjs/assets/pwa-icon-574c1c76.png (21.53 KB)
dist/systemjs/assets/pwa.webmanifest (263 B)
dist/systemjs/assets/roboto-v27-latin-regular-cc46322d.woff2 (15.32 KB)
dist/systemjs/assets/s-6adfad39.js (7.41 KB)
dist/systemjs/aapp-252c15b8.js (6.13 KB)
dist/systemjs/main.172-9eceb2ea.js (1.9 KB)
dist/systemjs/main.prod.html (11.69 KB)
dist/systemjs/prod-854ac676.importmap (301 B)
dist/systemjs/sboboot-242aa0ac.js (3.01 KB)
dist/systemjs/unsupportedIterableToArray-2a336551.js (542 B)
--- sourcemap files in the build: 10 ---
dist/systemjs/assets/app-0f239860.css.map (307 B)
dist/systemjs/assets/boot-9c6848bb.css.map (457 B)
dist/systemjs/assets/s-6adfad39.js.map (34.74 KB)
dist/systemjs/aapp-252c15b8.js.map (29.35 KB)
dist/systemjs/main.172-9eceb2ea.js.map (6.62 KB)
dist/systemjs/main.281-bf03a9b2.js.map (803 B)
dist/systemjs/main.60-67bb3d44.css.map (462 B)
dist/systemjs/main.87-b0f3c7c8.css.map (2.62 KB)
dist/systemjs/sboboot-242aa0ac.js.map (9.26 KB)
dist/systemjs/unsupportedIterableToArray-2a336551.js.map (1.84 KB)
------- build summary -------
project files: 36 (115.56 KB)
build files: 14 (81.75 KB)
build duration: 4.48 seconds
------------------------------
✔ build end
```

Read more in [jsenv building documentation](https://github.com/jsenv/jsenv-core#build-overview).

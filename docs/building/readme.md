# Building

In order to optimize files for production use `node ./scripts/build/build.mjs` or `npm run build`.

```console
> node ./scripts/build/build.mjs

build "./src/main.html"
✔ prebuild (done in 1.1 seconds)
✔ bundle "css" (done in 0 second)
✔ bundle "js_module" (done in 0.1 second)
✔ build (done in 0.7 second)
✔ inject version in urls (done in 0.1 second)
--- build files ---
- html: 1 (5.35 KB)
- css: 1 (66 B)
- js: 4 (35.14 KB)
- other: 7 (99.13 KB)
Total 13 (139.69 KB)
--------------------
```

The build perform the following things:

- Transpilation according to your browser support
  - If needed, replace js modules with "classic" js using [systemjs format](https://github.com/systemjs/systemjs)
  - If needed, transpiles code to make it compatible with old browsers.
- Removing dead code (treeshaking)
  - The code specific to development is removed. See [Production mode](../production_mode/readme.md#Production-mode)
  - Unused code is removed
- Bundling of js files: concatenation of js static imports, code splitting on dynamic imports
- Bundling of css files: concatenation of `@import`
- Minification of js, css, json, html, and svg files
- Url versionning (injecting a version in urls to enable long term caching)
- Inject `self.serviceWorkerUrls` global into service worker file

Read more in [jsenv building documentation](https://github.com/jsenv/jsenv-core#build-overview).

See also the content [dist/](../../dist/) in this repository.

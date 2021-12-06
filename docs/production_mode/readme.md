# Production mode

The goal of the production mode is to have a second way to execute your code. With it you have 2 ways of executing your code:

1. _development mode_
2. _production mode_

In _development mode_ you can do things specific to development and in _production mode_ do things specific to production.

importmap can be used controls how the imports are resolved. Let's take an example with some js.

```js
import { DEV } from "#env"

const message = DEV ? "development" : "production"
document.querySelector("#message").innerHTML = message
```

Depending on HTML files, browser displays either _development_ or _production_.

| [dev.html](./demo/dev.html)     | [prod.html](./demo/prod.html)    |
| ------------------------------- | -------------------------------- |
| ![stuff](./mode_dev_chrome.png) | ![stuff](./mode_prod_chrome.png) |

This repository has preconfigured a _production mode_, if you want to keep this ability, check [How to use production mode](#how-to-use-production-mode). Otherwise see [How to remove production mode](#how-to-remove-production-mode).

# How to use production mode

In development mode there is an orange ribbon. After the build code specific to development is removed by treeshaking.

| npm run dev             | npm start                |
| ----------------------- | ------------------------ |
| ![stuff](./pwa_dev.png) | ![stuff](./pwa_prod.png) |

# How to remove production mode

1. Remove all `#env` imports in files
2. Remove `"./dev.importmap": "./prod.importmap"` from `"urlMappings"` in [script/build/build.mjs](../../script/build/build.mjs#L23)
3. Remove line generating `"prod.importmap"` in [script/importmap/importmap.mjs](../../script/importmap/generate_importmap.mjs#L34)
4. Remove `"#env"` from `"initialImportMap"` in [script/importmap/importmap.mjs](../../script/importmap/generate_importmap.mjs#L11)
5. Delete [env_prod.js](../../env_prod.js)
6. Delete [env_dev.js](../../env_dev.js)
7. Remove `"/prod.importmap"` from [.gitignore](../../.gitignore#L22)

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

_npm run generate-importmap_ generates multiple import map files. The one to use depend in which context you want to execute your code.

| importmap file           | importmap file content                             | HTML file using it                                              |
| ------------------------ | -------------------------------------------------- | --------------------------------------------------------------- |
| importmap.prod.importmap | "dependencies" + "env.prod.js"                     | [main.html](../../main.html#L10)                                |
| importmap.dev.importmap  | "dependencies" + "devDependencies" + "env.dev.js"  | [test/greet.dev.test.html](../../test/greet.dev.test.html#L8)   |
| importmap.dev.importmap  | "dependencies" + "devDependencies" + "env.prod.js" | [test/greet.prod.test.html](../../test/greet.prod.test.html#L8) |

# How to remove production mode

1. Remove all `#env` imports in files
2. Replace `"importmap.prod.test.importmap"` by `"importmap.dev.importmap"` in HTML files
3. Remove line generating `"importmap.prod.test.importmap"` in [script/importmap/generate_importmap.mjs](../../script/importmap/generate_importmap.mjs#L33)
4. Remove `"initialImportMap"` in [script/importmap/generate_importmap.mjs](../../script/importmap/generate_importmap.mjs#L11)
5. Delete [env.prod.js](../../env.prod.js)
6. Delete [env.dev.js](../../env.dev.js)
7. Remove `"/importmap.prod.test.importmap"` from [.gitignore](../../.gitignore#L22)

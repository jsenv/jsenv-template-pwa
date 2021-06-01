# Production mode

The goal of the production mode is to have a second way to execute your code. With it you have 2 ways of executing your code:

1. _development mode_
2. _production mode_

In _development mode_ you can do things specific to development and in _production mode_ do things specific to production.

Example of code specific to development:

```js
import { DEV } from "#env"

if (DEV) {
  console.log("This log is displayed only during dev")
}
```

Example of code acting differently depending on the mode:

```js
import { DATABASE_URL } from "#env"

console.log(`The database url is ${DATABASE_URL}`)
```

This repository has preconfigured a _production mode_, if you want to keep this ability, check [How to use production mode](#how-to-use-production-mode). Otherwise see [How to remove production mode](#how-to-remove-production-mode).

# How to use production mode

importmap can be used controls how the imports are resolved. Let's take an example with the js code below. Using given html files, browser will either displays _development_ or _production_.

```js
import { DEV } from "#env"

const message = DEV ? "development" : "production"
document.querySelector("#message").innerHTML = message
```

![stuff](./mode_dev_chrome.png)
![stuff](./mode_prod_chrome.png)

If you want to see the files and the code used to generate the screenshots above, they are in [./mode](./mode) directory.

This repository generates 3 importmaps depending how you want to execute your code.

1. **importmap.prod.importmap**: Execute code in production mode. This importmap is used by [main.html](../../main.html#L10).

2. **importmap.dev.importmap**: Execute code in development mode. This importmap is used by [test/greet.dev.test.html](../../test/greet.dev.test.html#L8).

3. **importmap.prod.test.importmap**: Execute code in production mode including the remapping from `"devDependencies"`. This importmap is used by [test/greet.prod.test.html](../../test/greet.prod.test.html#L8).

# How to remove production mode

If you don't need the production mode you can remove it following the steps below.

1. Remove all `#env` imports in files
2. Remove `"importMapInput"` in [script/generate-import-map/generate-import-map.js](../../script/generate-import-map/generate-import-map.js#L10)
3. Delete [env.prod.js](../../env.prod.js)
4. Delete [env.dev.js](../../env.dev.js)

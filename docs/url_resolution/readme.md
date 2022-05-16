# url resolution

This codebase relies on standard url resolution used in web browsers

# Leading slash url specifier

It's recommended to prefer leading slash instead of `../`.

```css
body {
  background-image: url("../../src/logo.png");
  /* can and should be written */
  background-image: url("/src/logo.png");
}
```

- no `../../../` hell
- file can be moved without having to update import inside that file
- easy search and replace in the codebase

You can use leading slash everywhere (HTML, CSS, JS, ...)

# Node ESM resolution

[Node ESM resolution algorithm](https://nodejs.org/docs/latest-v16.x/api/esm.html#esm_resolution_algorithm) is applied for url specifiers found in js module files.

Thanks to node module resolution, some bare import are remapped to a real file location. For example, as long as `"lodash"` is in your _package.json_ `"dependencies"` or `"devDependencies"`, the following import:

```js
import lodash from "lodash"
```

is remapped to something like `"./node_modules/lodash/index.js"`.

# importmap

[importmap](https://github.com/WICG/import-maps#import-maps) can be used to control the behaviour of js imports.

> At the time of writing this documentation, _importmap_ are supported only by chrome so files are transformed in dev and during build to be compatible with other browsers.

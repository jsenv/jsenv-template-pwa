# import resolution

This codebase relies on browser native import resolution. It also uses [importmap](https://github.com/WICG/import-maps#import-maps) to control import resolution.

As importmap are standard, browser supports them natively. This repository also configure ESLint and VSCode to use importmap for import resolution.

> At the time of writing this documentation, _importmap_ are supported only by chrome so files are transformed during the build to be compatible with other browsers.

importmap are used for [import aliases](#import-aliases), [node module resolution](#node-module-resolution) and to [configure ESLint and VSCode](#configure-eslint-and-vscode)

# import aliases

```js
import { add } from "../../src/add.js"
// can and should be written
import { add } from "my-alias/src/add.js"
```

Thanks to import aliases import paths can be consistent: they always start from an alias and specify the file path from there:

- no `../../../` hell
- file can be moved without having to update import inside that file
- easy search and replace in the codebase

If you want to keep import aliases, check [How to use import aliases](#How-to-use-import-aliases). Otherwise see [How to remove import aliases](#How-to-remove-import-aliases).

## How to use import aliases

There is 2 import aliases preconfigured into [project.importmap](../../project.importmap). Feel free to update this file as you like but it is recommended to keep the number of import aliases to the strict minimum.

## How to remove import aliases

1. Replace all `"src/*"` paths with a relative notation: `"./*"` or `"../*"`
2. Same for paths starting with `"test/"`
3. Remove `"importmap"` field from [package.json](../../package.json#L24)
4. Remove [project.importmap](../../project.importmap)

# node module resolution

Thanks to node module resolution, some bare import are remapped to a real file location. For example, as long as `"lodash"` is in your _package.json_ `"dependencies"` or `"devDependencies"`, the following import:

```js
import "lodash"
```

is remapped to something like `"./node_modules/lodash/index.js"`.

If you want to keep node module resolution, check [How to use node module resolution](#How-to-use-node-module-resolution). Otherwise see [How to remove node module resolution](#How-to-remove-node-module-resolution).

# How to use node module resolution

An importmap file named _importmap.prod.importmap_ is generated by a script and contains mappings from _project.importmap_ AND the mappings necessary for node module resolution. This file is re-generated after every `npm install` and can be generated on demand by `npm run generate-importmap`.

To benefit from both _imports aliases_ and _node module resolution_ html file must use _importmap.prod.importmap_. This is what [main.html](../../main.html#L10) is going on line 10.

In case code use module(s) declared in `"devDependencies"`, html file must use _importmap.dev.importmap_. This is what [test/greet.dev.test.html](../../test/greet.dev.test.html) is doing on line 8.

You should rerun `npm run generate-importmap` when something impacting _node esm resolution algorithm_ happens. It means when any of the following fields has changed in your _package.json_: `"name"`, `"imports"`, `"exports"`, `"dependencies"`, `"devDependencies"`.

In practice it happens in 3 scenarios:

1. You update manually `"name"`, `"imports"` or `"exports"` field.
2. You install a new dependency with `npm install <package-name>`
3. You uninstall a dependency with `npm uninstall <package-name>`

## How to remove node module resolution

1. Remove `"postinstall"` and `"generate-importmap"` from `"scripts"` in [package.json](../../package.json#L25)
2. Remove `"@jsenv/importmap-node-module"` from `"devDependencies"` in [package.json](../../package.json#L54)
3. Delete [script/importmap/](../../script/importmap) directory
4. Update _importMapFileRelativeUrl_ in [.eslintrc.cjs](../../.eslintrc.cjs#L56)

   ```diff
   - importMapFileRelativeUrl: "./importmap.dev.importmap",
   + importMapFileRelativeUrl: "./project.importmap",
   ```

5. Update or remove all `<script type="importmap">` in html files

6. Remove generated importmap files from [.gitignore](../../.gitignore#L20)

   ```diff
   -/importmap.dev.importmap
   -/importmap.prod.importmap
   -/importmap.prod.test.importmap
   ```

# Configure ESLint and VSCode

ESLint is configured to resolve import using _importmap.dev.importmap_ by `importMapFileRelativeUrl` in [.eslintrc.cjs](../../.eslintrc.cjs#L56).

`npm run generate-importmap` is also generating a _jsconfig.json_ to make VSCode aware of import mappings during import resolution.
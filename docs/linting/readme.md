# Linting

The codebase uses [ESLint](https://eslint.org) to lint files.

If ESLint rules are not respected, the main GitHub **workflow will fail** during [Run ESLint step](../../.github/workflows/main.yml#L38).

If you want to keep ESLint, check [How to use ESLint](#How-to-use-eslint). Otherwise see [How to remove ESLint](#How-to-remove-eslint).

# How to use ESLint

The ESLint configuration can be found in [.eslintrc.cjs](../../.eslintrc.cjs).

It is recommended to install and use [vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to have **ESLint integrated in VSCode**.

To execute ESLint on all files use the following command: `npm run eslint`

```console
> npm run eslint

/Users/d.maillard/dev/jsenv/jsenv-template-pwa/test/greet.test.html
  12:16  error  asert not found in '@jsenv/assert'  import/named
  12:16  error  'asert' is defined but never used   no-unused-vars
  18:7   error  'assert' is not defined             no-undef

✖ 3 problems (3 errors, 0 warnings)
```

# How to remove ESLint

1. Remove `"Run ESLint"` step in [.github/workflows/main.yml](../../.github/workflows/main.yml#L38)
2. Remove `"eslint"` from `"scripts"` in [package.json](../../package.json#L24)
3. Delete [.eslintrc.cjs](../../.eslintrc.cjs)
4. Delete [.eslintignore](../../.eslintignore)
5. Remove these `"devDependencies"` in [package.json](../../package.json#L44)

   - `"@jsenv/eslint-config"`
   - `"@jsenv/eslint-import-resolver"`
   - `"eslint-plugin-import"`
   - `"eslint-plugin-html"`
   - `"eslint"`

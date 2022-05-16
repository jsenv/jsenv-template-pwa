# Formatting

The codebase uses [prettier](https://prettier.io) to ensure files formatting is consistent and pretty.

If you want to keep prettier, check [How to use Prettier](#How-to-use-prettier). Otherwise see [How to remove prettier](#How-to-remove-prettier).

# How to use prettier

The prettier configuration can be found in [.prettierrc.yml](../../.prettierrc.yml).

Install [prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and **let the extension do the formatting** when you save a file.

This repository has pre-configured `npm run prettier` to format all files with prettier

# How to remove prettier

1. Remove `"prettier"` from `"scripts"` in [package.json](../../package.json#L25)
2. Delete [.prettierignore](../../.prettierignore)
3. Delete [.prettierrc.yml](../../.prettierrc.yml)
4. Remove `"prettier"` from `"devDependencies"` in [package.json](../../package.json#L63)

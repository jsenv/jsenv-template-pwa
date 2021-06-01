# Formatting

The codebase uses [prettier](https://prettier.io) to ensure files formatting is consistent and pretty.

If you want to keep prettier, check [How to use Prettier](#How-to-use-prettier). Otherwise see [How to remove prettier](#How-to-remove-prettier)

# How to use prettier

The prettier configuration can be found in [.prettierrc.yml](../../.prettierrc.yml).

Install [prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and **let the extension do the formatting** when you save a file.

This repository has pre-configured some commands related to prettier:

<details>
  <summary><code>npm run prettier-check</code></summary>

Logs files matching and not matching prettier formatting.

![stuff](./prettier-check-terminal.png)

</details>

<details>
  <summary><code>npm run prettier-format</code></summary>

Format all files in the project.

![stuff](./prettier-format-terminal.png)

</details>

<details>
  <summary><code>npm run prettier-format-stage</code></summary>

Format all files in the [git staging area](https://softwareengineering.stackexchange.com/a/119790)

![stuff](./prettier-format-stage-terminal.png)

</details>

# How to remove prettier

If you want to remove prettier from this repository, follow the steps below.

1. Remove prettier scripts from `"scripts"` in [package.json](../../package.json#L47)
2. Delete [.prettierignore](../../.prettierignore)
3. Delete [.prettierrc.yml](../../.prettierrc.yml)
4. Remove `"@jsenv/prettier-check-project"` and `"prettier"` from `"devDependencies"` in [package.json](../../package.json#L63)

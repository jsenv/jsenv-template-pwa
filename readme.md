# Jsenv template for PWA (Progressive Web Application)

Template to create a GitHub repository for a progressive web application.

**Warning**: It's a beta version.

[![github workflow](https://github.com/jsenv/jsenv-template-pwa/workflows/ci/badge.svg)](https://github.com/jsenv/jsenv-template-pwa/actions?workflow=main)
[![codecov coverage](https://codecov.io/gh/jsenv/jsenv-template-pwa/branch/main/graph/badge.svg)](https://codecov.io/gh/jsenv/jsenv-template-pwa)

# Table of contents

- [Presentation](#Presentation)
- [Installation](#Installation)
- [Coding](#Coding)
- [Formatting](#Formatting)
- [Linting](#Linting)
- [Testing](#Testing)
- [Building](#Building)
- [Steps to remove pwa](#steps-to-remove-pwa)

# Presentation

This is a [GitHub repository template](https://docs.github.com/en/github-ae@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template) to start a progressive web application. If you want to build a regular web application you can follow the [Steps to remove pwa](#Steps-to-remove-pwa)

The progressive web application is deployed at https://jsenv-pwa-template.herokuapp.com.

# Installation

The following setup is recommended to install this repository:

**Operating System**: Mac, Linux or Windows.

**Code editor**: [Visual Studio Code](https://code.visualstudio.com/).

**Command line tools**:

- [git](https://git-scm.com/) version 2.26.0 or above
- [node](https://nodejs.org/en/) version 14.5.0 or above

**Web browser**: Google chrome, Firefox, or Safari recent versions are supported.

If setup is done, run the following commands to install the repository on your machine.

```console
git clone git@github.com:jsenv/jsenv-template-pwa.git
```

```console
npm install
```

# Coding

To start the project, run the following command

```console
npm run start-exploring.js
```

This will start a dev server with live reloading. Read more about this server in [jsenv exploring documentation](https://github.com/jsenv/jsenv-core#exploring)

# Formatting

The codebase uses prettier to ensure a coherent and pretty code formatting. The prettier configuration can be found in [.prettierrc.yml](./.prettierrc.yml).

If prettier configuration is not respected, the main **GitHub workflow will log** which files are incorrect during [code format step](./.github/workflows/ci.yml#L33). I repeat, the workflow will not fail, just log.

You are supposed to perform the code formatting, in other words install [prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and let the extension do it when you save a file.

# Linting

The codebase uses ESLint to lint files. The ESLint configuration can be found in [.eslintrc.cjs](./.eslintrc.cjs). The ESLint configuration consider all files as written for a browser except thoose inside `script/` and `github/` directories. The rest of the configuration comes from [@jsenv/eslint-config](https://github.com/jsenv/jsenv-eslint-config#eslint-config).

If ESLint rules are not respected, the main **GitHub workflow will fail** during [code quality step](./.github/workflows/ci.yml#L31).

You can run `npm run eslint-check` to ensure your file respects ESLint rules. It is recommended to install and use [vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to have ESLint integrated in VSCode.

# Testing

Test are inside [test/](./test/) directory.

They can be runned all at once using `npm test`.

They can be runned selectively in a browser by doing `npm run start-exploring` and opening the test file in the browser.

Read more in [jsenv testing documentation](https://github.com/jsenv/jsenv-core#testing)

# Building

In order to generate files that will be optimized for production (minification and so on) use `npm run dist`. This will generate files into [dist/](./dist/) directory.

The files will be generated using [systemjs format](https://github.com/systemjs/systemjs).

Read more in [jsenv building documentation](https://github.com/jsenv/jsenv-core#building).

# Steps to remove pwa

- Remove `<link rel="manifest">` from [main.html](./main.html#L8)
- Remove `beforeinstallprompt` script from [main.html](./main.html#L210)
- Remove [pwa.webmanifest](./pwa.webmanifest) file
- Remove [src/pwa](./src/pwa) directory
- Remove `import "src/pwa/pwa.js"` from [src/app.js](./src/app.js)
- Remove `serviceWorkers` and `serviceWorkerFinalizer` from [build script](./script/generate-systemjs-build/generate-systemjs-build.js)
- Remove `@jsenv/pwa` from dependencies in [package.json](./package.json#L52)

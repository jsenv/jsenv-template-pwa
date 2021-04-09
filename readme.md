# Jsenv template for PWA (Progressive Web Application)

Template to create a GitHub repository for a progressive web application.

**Warning**: It's an alpha version.

[![github ci](https://github.com/jsenv/jsenv-template-pwa/workflows/ci/badge.svg)](https://github.com/jsenv/jsenv-template-pwa/actions?workflow=ci)
[![codecov coverage](https://codecov.io/gh/jsenv/jsenv-template-pwa/branch/master/graph/badge.svg)](https://codecov.io/gh/jsenv/jsenv-template-pwa)

# Table of contents

- [Presentation](#Presentation)
- [Usage](#Usage)
- [Steps to remove pwa](#steps-to-remove-pwa)

# Presentation

This is a [GitHub repository template](https://docs.github.com/en/github-ae@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template) to start a progressive web application. If you want to build a regular web application you can follow the [Steps to remove pwa](#Steps-to-remove-pwa)

The progressive web application is deployed at https://jsenv-pwa-template.herokuapp.com.

# Usage

Proper documentation needs to be done. Until then, source files gives hints about how to use.

# Steps to remove pwa

- Remove `<link rel="manifest">` from [main.html](./main.html#L8)
- Remove `beforeinstallprompt` script from [main.html](./main.html#L210)
- Remove [pwa.webmanifest](./pwa.webmanifest) file
- Remove [src/pwa](./src/pwa) directory
- Remove `import "src/pwa/pwa.js"` from [src/app.js](./src/app.js)
- Remove `serviceWorkers` and `serviceWorkerFinalizer` from [build script](./script/generate-systemjs-build/generate-systemjs-build.js)
- Remove `@jsenv/pwa` from dependencies in [package.json](./package.json#L52)

<!--
README about the GitHub repository template.
Once the template is used, this README should be
deleted and only ../README.md should be kept
-->

# Progressive Web Application template

This documentation is 90% completed.

This repository is meant to serve as a general template for how to set up repositories to create a progressive web application. If you want to build a regular web application, use this template and remove files specific to PWA as explained in the documentation.

The application is deployed at https://jsenv-pwa-template.herokuapp.com.

# How to use

Create a GitHub repository using this template at https://github.com/jsenv/jsenv-template-pwa/generate.
Then follow checklist below to setup your repository.

- [ ] Update fields in [package.json](../package.json), especially `"name"`, `"description"`, and `"author"`
- [ ] Update [README.md](../README.md) and delete `.github/README.md`
- [ ] Review [LICENSE.txt](./LICENSE.txt) and `"license"` in [package.json](../package.json#L6)

# Features

Documentation of the features, how to use and or remove them.

- [Formatting](../docs/formatting/readme.md#formatting): Formatting with prettier
- [Linting](../docs/linting/readme.md#linting): Linting with ESLint
- [import resolution](../docs/import_resolution/readme.md#import-resolution): importmap resolution for ESLint and VSCode
- [Production mode](../docs/production_mode/readme.md#production-mode): Ability to write code specific to production or development
- [Development server](../docs/dev_server/readme.md#Development-server): A dev server **without build step** and livereloading
- [PWA compatibility](../docs/pwa_compat/readme.md#PWA-compatibility): Can run offline and be added to user home screen
- [Testing](../docs/testing/readme.md#testing): Run tests on Chrome, Firefox and Webkit with jsenv
- [Code coverage](../docs/code_coverage/readme.md#Code-coverage): Code coverage with codecov
- [Building](../docs/building/readme.md#Building): Optimize files for production supporting importmap, top level await and more
- [Pull request impacts](../docs/pr_impacts/readme.md#Pull-request-impacts): Automated process tracking pull requests impacts on lighthouse, performances and file sizes
- [Deploying](../docs/deploying/readme.md#deploying): Auto deployment with heroku

# Things to know

- Node.js Long Term Support version should be used while coding. At the time of writing this documentation it means version 14.17.0.

- Default branch of the repository is named _main_. It can be renamed in repository settings on GitHub.

- There is 2 type of js files: js meant to be runned by node and js meant to be runned by a browser. To help recognize which are which, browser files use _.js_ extension while node files uses _.mjs_ extension. This pattern is subjective and you are free to change it.

<!--
README about the GitHub repository template.
Once the template is used, this README should be
deleted and only ../README.md should be kept
-->

# Progressive Web Application template

This documentation is 50% completed.

This repository is meant to serve as a general template for how to set up repositories to create a progressive web application. If you want to build a regular web application, use this template and remove files specific to PWA as explained in the documentation.

The application is deployed at https://jsenv-pwa-template.herokuapp.com.

Use this repository as a way of finding example files and use the checklist to setup the repository.

# Whats in it?

All the features are pre-enabled in the template. Steps to use or remove each feature are described in the [checklist](#Checklist).

- Url versionning to enable long term caching
- Accurate cache invalidation: no need for the browser to redownload many files when you change one file
- Production files are compatible with "old browsers": importmap, top level await and many more are turned into old code
- PWA compatible: can run offline and be added to user home screen
- A dev server **without build step** and livereloading
- Ability to write code specific to production or development
- A GitHub workflow checking lint and tests on every push
- A GitHub workflow tracking pull request impacts on:
  - Custom performance metrics
  - Lighthouse score
  - Build files sizes
- Formatting with prettier
- Linting with ESLint
- Run tests on Chrome, Firefox and Webkit with jsenv
- Code coverage with codecov
- Auto deployment with heroku

# Things to know

- Node.js Long Term Support version should be used while coding and to use the package published on npm. At the time of writing this documentation it means version 14.17.0.

- Default branch of the repository is named _main_. It can be renamed in repository settings on GitHub.

- There is 2 type of js files: js meant to be runned by node and js meant to be runned by a browser. To help recognize which are which, browser files use _.js_ extension while node files uses _.mjs_ extension. This pattern is subjective and you are free to change it.

# Install checklist

Go through this checklist after creating a repository with this template.

- [ ] Update fields in [package.json](../package.json), especially `"name"`, `"description"`, and `"author".`

- [ ] Check the available features and see how use or remove them.

  - [Formatting](../docs/formatting/formatting.md#formatting)
  - [Linting](../docs/linting/linting.md#linting)
  - [import resolution](../docs/import_resolution/import_resolution.md#import-resolution)
  - [Production mode](../docs/production_mode/production_mode.md#production-mode)
  - [Development server](../docs/dev_server/dev_server.md#Development-server)
  - [Service worker](../docs/service_worker/service_worker.md#Service-worker)
  - [Testing](../docs/testing/testing.md#testing)
  - [Code coverage](../docs/code_coverage/code_coverage.md#Code-coverage)
  - [Building](../docs/building/building.md#Building)
  - [Pull request impacts](../docs/pr_impacts/pr_impacts.md#Pull-request-impacts)
  - [Deploying](../docs/deploying/deploying.md#deploying)

- [ ] Update [README.md](../README.md)
- [ ] Delete `.github/README.md`
- [ ] Review [LICENSE](./LICENSE) and `"license"` in [package.json](../package.json#L6)

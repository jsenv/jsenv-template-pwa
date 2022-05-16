# Deploying

Every push to `main` branch deploys the new version of the website at https://jsenv.github.io/jsenv-template-pwa/. This is done by the "build_and_deploy" step in [.github/workflows/main.yml](../../.github/workflows/main.yml#L49)

# How to use deploy on GitHub pages

- Create a "gh-pages" branch on your repository
- Enable Github pages on your repository as explained in https://docs.github.com/en/pages/quickstart

# How to remove deploy on Github pages

- Remove "build_and_deploy" in [.github/workflows/main.yml](../../.github/workflows/main.yml#L49)

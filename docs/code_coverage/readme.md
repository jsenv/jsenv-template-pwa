# Code coverage

Code coverage shows which part of source code have been covered by execution of tests.

You can get coverage locally on your machine. It is also integrated to GitHub using [Codecov](https://docs.codecov.io/docs/pull-request-comments).

Codecov will post message into pull requests.

![stuff](./codecov_pr_comment.png)

And can be used to display a badge in the readme.

![stuff](./codecov_badge.png)

If you want to keep code coverage check [How to use code coverage](#How-to-use-code-coverage). Otherwise see [How to remove code coverage](#How-to-remove-code-coverage)

# How to use code coverage

You can generate code coverage locally and navigate in the report using `npm run test:coverage` command. It is configured to execute [scripts/test/test.mjs](../../scripts/test/test.mjs) with --coverage parameter.

```console
❯ node ./scripts/test/test.mjs "--coverage"

✔ execution 1 of 2 completed (all completed)
file: test/greet.test.html
runtime: chromium/82.0.4057.0
duration: 2.39 seconds

✔ execution 2 of 2 completed (all completed)
file: test/greet.test.html
runtime: firefox/73.0b13
duration: 3.16 seconds

-------------- summary -----------------
2 execution: all completed
total duration: 5.59 seconds
----------------------------------------

-> /Users/dmail/jsenv-template-pwa/coverage/index.html
```

HTML files can be opened in a browser to explore coverage. Red and yellow parts are not covered by test. It looks like this:

![stuff](./coverage_report_html.png)

## Codecov

To enable integration into GitHub, coverage must be sent to codecov after each push to a pull request or the repository main branch. This is done by "upload coverage" in [./.github/workflows/main.yml](../../.github/workflows/main.yml#L51).

If you want to enable this, see [Configure codecov](#Configure-codecov), otherwise see [Remove codecov](#Remove-codecov).

### Configure codecov

1. Create an account on codecov at https://about.codecov.io/sign-up
2. Install codecov GitHub application https://github.com/apps/codecov
3. Review [codecov.yml](../../codecov.yml)

### Remove codecov

1. Remove "upload coverage" in [.github/workflows/main.yml](../../.github/workflows/main.yml#L46)
2. Delete [codecov.yml](../../codecov.yml)

# How to remove code coverage

1. Follow steps from [Remove codecov](#remove-codecov)
2. Replace "npm run test:coverage" by "npm test" in [.github/workflows/main.yml](../../.github/workflows/main.yml#L50)
3. Remove "test:coverage" from "scripts" in [package.json](../../package.json#L46)
4. Remove _/coverage/_ in [.gitignore](../../.gitignore#L9)
5. Remove _/coverage/_ in [.eslintignore](../../.eslintignore#L13)
6. Remove _/coverage/_ in [.prettierignore](../../.prettierignore#L8)

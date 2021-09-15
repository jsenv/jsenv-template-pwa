# Code coverage

Code coverage shows which part of the source files code have been covered by the execution of test files.

You can get coverage locally on your machine. It is also integrated to GitHub using [Codecov](https://docs.codecov.io/docs/pull-request-comments).

Codecov will post message into pull requests.

![stuff](./codecov_pr_comment.png)

And is used to display a badge in the readme.

![stuff](./codecov_badge.png)

If you want to keep code coverage check [How to use code coverage](#How-to-use-code-coverage). Otherwise see [How to remove code coverage](#How-to-remove-code-coverage)

# How to use code coverage

You can generate code coverage locally and navigate in the report using `npm run test-with-coverage` command. It is configured to execute [script/test/test.mjs](../../script/test/test.mjs) with --coverage parameter.

```console
❯ node ./script/test/test.mjs "--coverage"

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

To enable integration into GitHub, coverage must be sent to codecov after each push to a pull request or the repository main branch. This is done by `upload coverage` in [./.github/workflows/main.yml](../../.github/workflows/main.yml#L51).

If you want to enable this, see [Configure codecov](#Configure-codecov), otherwise see [Remove codecov](#Remove-codecov).

### Configure codecov

1. Create an account on codecov at https://about.codecov.io/sign-up
2. Install codecov GitHub application https://github.com/apps/codecov
3. Review [codecov.yml](../../codecov.yml)

### Remove codecov

1. Remove `upload coverage` in [.github/workflows/main.yml](../../.github/workflows/main.yml#L46)
2. Remove `"@jsenv/codecov-upload"` from `"devDependencies"` in [package.json](../../package.json#L47)
3. Delete [test/upload_coverage.mjs](../../script/test/upload_coverage.mjs)
4. Delete [codecov.yml](../../codecov.yml)

# How to remove code coverage

1. Follow steps from [Remove codecov](#remove-codecov)
2. Replace `npm run test-with-coverage` by `npm test` in [.github/workflows/main.yml](../../.github/workflows/main.yml#L50)
3. Remove `"test-with-coverage"` from `"scripts"` in [package.json](../../package.json#L46)
4. Remove `/coverage/` in [.gitignore](../../.gitignore#L9)
5. Remove `/coverage/` in [.eslintignore](../../.eslintignore#L13)
6. Remove `/coverage/` in [.prettierignore](../../.prettierignore#L8)

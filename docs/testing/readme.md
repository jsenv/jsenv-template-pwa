<!-- https://github.com/github/docs/blob/main/tests/README.md -->

# Testing

All test files are inside the [test/](./test/) directory and ends with `.test.html`.

If one or more test is failing, the main GitHub **workflow will fail** during [check tests](../../.github/workflows/main.yml#L44) step.

Code coverage from test files is monitored, this is documented in [docs/code_coverage/code_coverage.md](../code_coverage/code_coverage.md#code-coverage).

If you want to keep test files check [How to use tests](#How-to-use-tests). Otherwise see [How to remove tests](#How-to-remove-tests).

# How to use tests

Test files are written using jsenv philosophy:

**A test file is a regular html file**.

![stuff](./greet_test_chrome.png)

See [test/greet.test.html](../../test/greet.test.html)

## Debug a test

As previously mentioned, according to jsenv philosophy a test file executes like a classic file. It means you can use the debugging tool of classic files to debug test files.

The recommended way to debug a file is to start the development server and use Chrome devtools.

![Screencast test with chrome devtools](./test_chrome_devtools.gif)

## Executing all tests

Use `npm test` command. It is configured to execute [script/test/test.mjs](../../script/test/test.mjs) which is responsible to find and execute all your test files.

Test files are executed twice, a first time on Chrome, a second time on Firefox.

```console
❯ node ./script/test/test.mjs

✔ execution 1 of 2 completed (all completed)
file: test/greet.test.html
runtime: chromium/82.0.4057.0
duration: 2.3 seconds

✔ execution 2 of 2 completed (all completed)
file: test/greet.test.html
runtime: firefox/73.0b13
duration: 3.1 seconds

-------------- summary -----------------
2 execution: all completed
total duration: 5.42 seconds
----------------------------------------
```

# How to remove tests

If you don't need test or want to use an other test framework/library follow the steps below.

1. Remove `check tests` step in [.github/workflows/main.yml](../../.github/workflows/main.yml#L44)
2. Remove these `"scripts"` in [package.json](../../package.json#L24)

   - `"test"`
   - `"test-with-coverage"`
   - `"playwright-install"`

3. Delete [script/test/](../../script/test/) directory
4. Remove `"@jsenv/assert"` from `"devDependencies"` [package.json](../../package.json#L47)

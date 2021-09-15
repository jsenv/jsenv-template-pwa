# Pull request impacts

There is a GitHub workflow runned against every pull request to report their impact on:

- File size
- Lighthouse score
- Performance metrics

Each report is posted in a comment of the pull request.
Every time the pull request changes, workflow reruns and the comment is updated.

_Screenshot of a file size impact comment:_

![stuff](./file_size_impact.png)

_Screenshot of a lighthouse impact comment:_

![stuff](./lighthouse_impact.png)

_Screenshot of a performance impact comment:_

![stuff](./performance_impact.png)

## How to use file size impact?

A js file exports [generateFileSizeReport](../../script/file_size/generate_file_size_report.mjs) function. This function measure a subset of file size and is used to analyse impact on file sizes.

This function can also be runned locally as shown below.

```console
> npm run measure-file-sizes

script
---------------------
dist/assets/s-6adfad39.js: 7.59 kB
dist/aapp-252c15b8.js: 6.28 kB
dist/main.171-057f9a21.js: 1.72 kB
dist/sboboot-3a1e6d10.js: 2.58 kB
dist/service_worker.js: 9 kB
dist/unsupportedIterableToArray-2a336551.js: 542 B

style
---------------------
dist/assets/app-0f239860.css: 111 B
dist/assets/boot-e974415e.css: 142 B

image
---------------------
dist/assets/favicon-25e95a00.png: 12.1 kB
dist/assets/logo-25e95a00.png: 12.1 kB
dist/assets/pwa-icon-574c1c76.png: 39.8 kB

other
---------------------
dist/assets/pwa.webmanifest: 263 B
dist/main.prod.html: 12 kB
dist/prod-9a33269a.importmap: 301 B
dist/robots.txt: 22 B
```

## How to use performance impact?

A js file exports [generatePerformanceReport](../../script/performance/generate_performance_report.mjs) function. _generatePerformanceReport_ measure 7 metrics and is used to analyse impact on performances.

This function can also be runned locally as shown below.

```console
> npm run measure-performances

{
  "boot.css loaded": "0.699 seconds",
  "fonts ready": "0.743 seconds",
  "\"loading bannana...\" displayed": "0.743 seconds",
  "app.js imported": "0.823 seconds",
  "\"loading gorilla...\" displayed": "1.55 seconds",
  "\"entire jungle...\" displayed": "2.55 seconds",
  "App displayed": "3.75 seconds"
}
```

## How to remove performance impact?

1. Remove `"measure-performances"` from `"scripts"` in [package.json](../../package.json#L24)
2. Delete [.github/workflows/performance_impact.yml](../../.github/workflows/performance_impact.yml)
3. Delete [.github/workflows/pr_impact/report_performance_impact.mjs](../../.github/workflows/pr_impact/report_performance_impact.mjs)
4. Delete [script/performance/](../../script/performance/) directory
5. Remove `"@jsenv/performance-impact"` from `"devDependencies"` in [package.json](../../package.json#L48)

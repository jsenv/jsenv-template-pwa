# Booting

The application boot progressively handling nicely the following:

- js is disabled
- browser is not supported
- network is slow
- unexpected error (network or runtime)
- mitigate font swapping
- progressive loading of CSS and JS

## Screenshots

| Scenario                       | Screenshot                             |
| ------------------------------ | -------------------------------------- |
| JavaScript disabled            | ![stuff](./js_disabled.png)            |
| Browser not supported          | ![stuff](./browser_not_supported.png)  |
| Booting start                  | ![stuff](./booting_start.png)          |
| Booting is slow                | ![stuff](./booting_is_slow.png)        |
| Booting fetch error\*          | ![stuff](./booting_error.png)          |
| Booting runtime error          | ![stuff](./booting_error.png)          |
| Booting runtime error expanded | ![stuff](./booting_error_expanded.png) |
| App loading start              | ![stuff](./app_loading_start.png)      |
| App loading progress           | ![stuff](./app_loading_progress.png)   |
| App ready                      | ![stuff](./app_ready.png)              |

\* 404 on app_loader.js for example

## Booting explanation

There is many comments in [main.html](../../main.html) explaining how booting works.

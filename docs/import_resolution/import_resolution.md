# import resolution

This codebase relies on browser native resolution algorithm. It also uses [importmap](https://github.com/WICG/import-maps#import-maps) to control import resolution.

At the time of writing this documentation, _importmap_ are supported only by chrome so files are transformed during the build to be compatible with other browsers.

TODO: more about how this works together: project.importmap, the importmap files, npm run generate-import-map, eslint vscode and node esm resolution

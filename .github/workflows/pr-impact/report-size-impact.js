import { reportFileSizeImpact, readGithubWorkflowEnv, raw, gzip } from "@jsenv/file-size-impact"

reportFileSizeImpact({
  ...readGithubWorkflowEnv(),
  buildCommand: "npm run dist",
  transformations: { raw, gzip },
  trackingConfig: {
    script: {
      "./dist/systemjs/**/*.js": true,
      "./dist/systemjs/**/*.jsx": true,
      "./dist/systemjs/**/*.map": false,
    },
    style: {
      "./dist/systemjs/**/*.css": true,
      "./dist/systemjs/**/*.map": false,
    },
    image: {
      "./dist/systemjs/**/*.png": true,
      "./dist/systemjs/**/*.jpg": true,
      "./dist/systemjs/**/*.jpeg": true,
      "./dist/systemjs/**/*.gif": true,
      "./dist/systemjs/**/*.svg": true,
    },
    other: {
      "./dist/systemjs/**/*": true,
      "./dist/systemjs/**/*.map": false,
      "./dist/systemjs/**/*.js": false,
      "./dist/systemjs/**/*.jsx": false,
      "./dist/systemjs/**/*.css": false,
      "./dist/systemjs/**/*.png": false,
      "./dist/systemjs/**/*.jpg": false,
      "./dist/systemjs/**/*.jpeg": false,
      "./dist/systemjs/**/*.gif": false,
      "./dist/systemjs/**/*.svg": false,
    },
  },
  manifestConfig: {
    "./dist/**/asset-manifest.json": true,
  },
})

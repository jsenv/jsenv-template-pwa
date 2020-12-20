import { reportLighthouseScoreImpact, readGithubWorkflowEnv } from "@jsenv/lighthouse-score-impact"

reportLighthouseScoreImpact({
  ...readGithubWorkflowEnv(),
  // logLevel: 'debug',
  jsonFileGenerateCommand: "npm run generate-lighthouse-report",
})

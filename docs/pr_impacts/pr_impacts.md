# Pull request impacts

There is a GitHub workflow runned against every pull request to report their impact on various metrics:

- File size impact
- Lighthouse score impact
- Performance impact

The report is posted in a comment of the pull request.
Every time the pull request changes, workflow reruns and the comment is updated.

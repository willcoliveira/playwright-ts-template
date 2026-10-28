# Security policy

## Supported versions

Only the `main` branch is maintained. Projects created from this template own their copy; keep `@playwright/test` and the lint stack current with the Dependabot PRs the template ships with.

## Reporting a vulnerability

Please do not open a public issue. Use GitHub's private vulnerability reporting on the repository's **Security** tab ("Report a vulnerability"). You should get an acknowledgement within a week.

## What the template does to stay safe

- `npm ci --ignore-scripts` everywhere, and `.npmrc` sets `ignore-scripts=true` so lifecycle scripts never run on install.
- GitHub Actions pinned to commit SHAs; Dependabot updates them.
- The CI token is read-only (`permissions: contents: read`) and the workflow uses `pull_request`, never `pull_request_target`.
- The Docker image runs the tests as the unprivileged `pwuser`.
- Test reports (traces, videos, screenshots) can contain session cookies and response bodies of the application under test; the README explains when not to publish them as workflow artifacts.

# playwright-ts-template — Agent Instructions

## Project overview

Playwright + TypeScript end-to-end test project. Tests run against `https://playwright.dev` by default; `BASE_URL` (from `.env` or the environment) points them at another application.

## Skills to load

- `.claude/skills/playwright-e2e/SKILL.md` — how tests are planned, written, debugged and reviewed **in this project** (references under `references/`: project conventions, page-object conventions, test generation, debugging, review, fixtures and auth, locators and assertions, CI and flake triage, API testing, pass-rate analysis, agent debugging).
- `.claude/skills/playwright-cli/SKILL.md` — driving a browser and debugging a paused test with `playwright-cli`.
- `.claude/skills/playwright-trace/SKILL.md` — reading a trace with `npx playwright trace`.

The same skills live under `.agents/skills/` for Cursor, Codex and Copilot. They are generated — edit the generator inputs, not the files, and run `npm run skills:sync`.

## Setup

```bash
nvm use
npm ci               # no browsers are downloaded on install
npm run pw:setup     # playwright install --with-deps
```

## Commands

```bash
npm test                     # all projects
npm run test:chromium        # one project
npx playwright test --grep @smoke
npm run test:ui              # UI mode
npx playwright test --debug=cli   # pause + `playwright-cli attach …` for agents
npm run lint && npm run typecheck && npm run format:check
npm run skills:check         # generated skills must be in sync (CI enforces)
```

## Structure

```
src/
├── fixtures/         # test-fixture.ts — `test` extended with page-object fixtures; re-exports `expect`
├── pages/            # Page Object Model classes (*.page.ts); components/ for shared pieces
├── tests/            # Specs (*.spec.ts)
├── helpers/          # Utilities
└── test-data/        # Static test data
```

Import through the tsconfig aliases: `@fixtures/*`, `@pages/*`, `@tests/*`, `@helpers/*`, `@test-data/*`.

## Conventions

### Page objects

- One class per page in `src/pages/{name}.page.ts`; locators as `readonly` fields set in the constructor.
- Actions wrapped in `test.step()`; assertion helpers prefixed `expect…`.
- Navigation through `page.goto('/relative')` — `baseURL` comes from the config.

### Locators (in order of preference)

1. `getByRole()` 2. `getByLabel()` 3. `getByPlaceholder()` / `getByText()` 4. `getByTestId()` (`data-testid`) 5. CSS only as a last resort — never XPath.

### Tests

- Specs import `test` and `expect` from `@fixtures/test-fixture`, never from `@playwright/test`; page objects arrive as fixtures (`async ({ homePage }) => …`), so specs never call `new` and keep no describe-scoped variables. Page objects themselves import `test` from `@playwright/test` for `test.step()` (importing the fixtures file there would be a cycle).
- `src/tests/{feature}.spec.ts`; `test.describe('Feature', { tag: ['@smoke'] }, …)` — tags are options, not title suffixes.
- Web-first assertions only (`await expect(locator).toBeVisible()`); no `waitForTimeout()`, no `{ force: true }`, no `test.only` (CI forbids it).
- Every test must pass alone and in parallel with the others; no shared mutable state between tests.
- Retries and traces are CI-only (`retries: 2`, `trace: 'on-first-retry'`); a test that only passes on retry is a bug.

### Quality gates

`npm run lint` (type-aware: `@typescript-eslint/no-floating-promises` fails on an un-awaited action or assertion), `npm run typecheck` and `npm run format:check` must pass; CI runs them together with `skills:check` and a check that the Dockerfile's Playwright image tag equals the installed `@playwright/test` version, plus a `docker` job that builds the image and runs the suite inside it (`make docker-test`). Bumping `@playwright/test` means bumping the Dockerfile tag and digest and re-running `npm run skills:sync`.

### Dependency updates

Dependabot opens weekly PRs (npm, GitHub Actions, Docker). `.npmrc` sets `ignore-scripts=true` and `engine-strict=true`, so lifecycle scripts never run on install and the Node floor in `engines` is enforced. A Dependabot PR that bumps `@playwright/test` fails the Dockerfile tag check and `skills:check` on purpose: in that PR, bump the Dockerfile tag and digest to the same version, run `npm run skills:sync`, and commit the regenerated skills so the reviewer sees the instruction diff. A bump of `wico-playwright-agent-skills` needs the same `skills:sync` + commit step.

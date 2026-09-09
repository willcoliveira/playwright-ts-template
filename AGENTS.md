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
├── pages/            # Page Object Model classes (*.page.ts); components/ for shared pieces
├── tests/            # Specs (*.spec.ts)
├── helpers/          # Utilities
└── test-data/        # Static test data
```

Import through the tsconfig aliases: `@pages/*`, `@tests/*`, `@helpers/*`, `@test-data/*`.

## Conventions

### Page objects

- One class per page in `src/pages/{name}.page.ts`; locators as `readonly` fields set in the constructor.
- Actions wrapped in `test.step()`; assertion helpers prefixed `expect…`.
- Navigation through `page.goto('/relative')` — `baseURL` comes from the config.

### Locators (in order of preference)

1. `getByRole()` 2. `getByLabel()` 3. `getByPlaceholder()` / `getByText()` 4. `getByTestId()` (`data-testid`) 5. CSS only as a last resort — never XPath.

### Tests

- `src/tests/{feature}.spec.ts`; `test.describe('Feature', { tag: ['@smoke'] }, …)` — tags are options, not title suffixes.
- Web-first assertions only (`await expect(locator).toBeVisible()`); no `waitForTimeout()`, no `{ force: true }`, no `test.only` (CI forbids it).
- Every test must pass alone and in parallel with the others; no shared mutable state between tests.
- Retries and traces are CI-only (`retries: 2`, `trace: 'on-first-retry'`); a test that only passes on retry is a bug.

### Quality gates

`npm run lint`, `npm run typecheck` and `npm run format:check` must pass; CI runs them together with `skills:check` and a check that the Dockerfile's Playwright image tag equals the installed `@playwright/test` version. Bumping `@playwright/test` means bumping the Dockerfile tag and re-running `npm run skills:sync`.

# playwright-ts-template — Agent Instructions

## Project Overview

Playwright + TypeScript E2E testing starter project. Tests run against `https://playwright.dev` by default (configurable via `BASE_URL` env var).

## Setup

```bash
nvm use
npm install
npx playwright install --with-deps
```

## Project Structure

```
src/
├── pages/              # Page Object Model classes
│   ├── components/     # Shared UI components
│   └── *.page.ts       # Page objects
├── tests/              # Test spec files (*.spec.ts)
├── helpers/            # Utility helpers
└── test-data/          # Static test data
```

## Available Commands

```bash
make help               # Show all available commands
make test               # Run all tests headless
make test-headed        # Run with visible browser
make test-ui            # Playwright UI mode
make lint               # ESLint check
make format-check       # Prettier check
make typecheck          # TypeScript type check
```

## Coding Conventions

### Page Object Model

- File naming: `{name}.page.ts` in `src/pages/`
- Locators as `readonly` class properties in constructor
- Methods wrapped in `test.step()` for trace reporting
- Assertion methods prefixed with `expect`

### Selectors (priority order)

1. `getByRole()` — preferred
2. `getByLabel()` — form fields
3. `getByText()` — visible text
4. `getByTestId()` — data-testid attributes
5. Never use XPath

### Tests

- File naming: `{feature}.spec.ts` in `src/tests/`
- Web-first assertions only (`await expect(locator).toBeVisible()`)
- No `waitForTimeout()` — use web-first assertions or `waitFor()`
- No `{ force: true }` on actions
- Tag tests with `@smoke`, `@regression`, etc.

### Code Quality

- ESLint with `eslint-plugin-playwright` rules
- Prettier for formatting (single quotes, 140 print width, trailing commas)
- TypeScript strict mode

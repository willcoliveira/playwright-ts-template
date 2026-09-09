---
applyTo: "**/*.spec.ts,**/*.page.ts,**/fixtures/**,**/helpers/**"
---

# Playwright E2E Instructions

Full guidance for playwright-ts-template lives in the `playwright-e2e` skill at `.agents/skills/playwright-e2e/SKILL.md`. Read it and follow its decision tree before planning, generating, reviewing or debugging tests.

## MUST
- Use web-first assertions (`await expect(locator).toBeVisible()`)
- Use named timeout constants, not hardcoded numbers
- Wrap page object methods in `test.step()`
- Keep locators as readonly class properties on page objects
- Use short inner timeouts inside `toPass` blocks
- Clean up test resources in `afterEach`
- Tag tests with `{ tag: ['@smoke'] }` options, not in the title

## WON'T
- Use XPath selectors
- Use `page.waitForTimeout()` for synchronization
- Use `{ force: true }` on actions
- Use `networkidle` in `goto()` or `waitForLoadState()`
- Use deprecated APIs (`waitForNavigation`, `page.$`, `locator.type()`)
- Write custom retry/polling loops (use `toPass()` or `expect.poll()`)
- Use `page.evaluate()` as a workaround for missing locators

## Selector Priority
1. `getByRole()` > 2. `getByLabel()` > 3. `getByText()` > 4. `getByTestId()` > 5. CSS selector

## Browser automation
Use the official `playwright-cli` skill (install with `npx playwright cli install --skills=agents`); debug failing tests with `npx playwright test --debug=cli` and `playwright-cli attach` as described in `.agents/skills/playwright-e2e/references/agent-debugging.md`.

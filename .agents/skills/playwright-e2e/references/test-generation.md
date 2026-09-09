# Test Generation Skill — playwright-ts-template

## File Structure

- `src/tests/` — test specs
- `src/pages/` — page objects
- `src/pages/components/` — shared UI components
- `src/fixtures/` — custom fixtures (`test` + `expect` re-export)
- `src/helpers/` — API helpers, utilities
- `src/test-data/` — test data (static constants, factories)
- `src/utils/` — shared utilities (timeouts)

<!-- YOUR PROJECT: Update the file structure to match your project -->

---

## Test Spec Template

```typescript
import { test, expect } from '@playwright/test'
import { TIMEOUTS } from '../utils/timeouts'

test.describe('Feature name', { tag: ['@smoke'] }, () => {
  test.afterEach(async ({ page }) => {
    // Cleanup: cancel orders, release resources, etc.
  })

  test('completes the user journey', async ({ page }) => {
    await test.step('Navigate to the starting page', async () => {
      // Relative to baseURL (https://playwright.dev in playwright.config); never hardcode the host
      await page.goto('/path')
    })

    await test.step('Interact with the page', async () => {
      await page.getByRole('button', { name: 'Action' }).click()
    })

    await test.step('Verify the expected outcome', async () => {
      await expect(page.getByText('Success')).toBeVisible({ timeout: TIMEOUTS.MEDIUM })
    })
  })
})
```

Tags go in the options object (`{ tag: ['@smoke', '@checkout'] }`), never in the title, so `--grep @smoke` and the HTML report filter work reliably. Both `test.describe` and `test` accept it.

---

## Critical Import Rules

### Import from `@playwright/test`

```typescript
import { test, expect } from '@playwright/test'
```

When the project grows custom fixtures, create `src/fixtures/test-fixture.ts` with `base.extend` (see `fixtures-and-auth.md`) and switch every spec to import from it.

---

## Page Object Conventions

### Class Structure

```typescript
import type { Page, Locator } from '@playwright/test'
import { test } from '@playwright/test'

export class ExamplePage {
  readonly page: Page
  readonly heading: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole('heading', { name: 'Example' })
    this.submitButton = page.getByRole('button', { name: 'Submit' })
  }

  async goto(path: string) {
    await test.step(`Navigate to ${path}`, async () => {
      await this.page.goto(path)
    })
  }

  async submit() {
    await test.step('Submit the form', async () => {
      await this.submitButton.click()
    })
  }
}
```

### Selector Priority

1. `page.getByRole()` — most resilient; use `{ name, exact: true }` when text could match twice
2. `page.getByLabel()` — form fields
3. `page.getByText()` — visible text
4. `page.getByTestId()` — `data-testid` attributes
5. `page.locator('css')` — CSS selectors (last resort)

Details, composition (`filter`, `and`, `or`) and iframes (`.contentFrame()`) are in `locators-and-assertions.md`.

### Component Composition

Pages contain component instances:

```typescript
export class CheckoutPage {
  readonly header: Header
  readonly cart: Cart

  constructor(page: Page) {
    this.header = new Header(page)
    this.cart = new Cart(page)
  }
}
```

---

## Page Objects in Tests

Prefer fixtures that hand page objects to the test, so specs never call `new`:

```typescript
// src/fixtures/test-fixture.ts
export const test = base.extend<{ checkoutPage: CheckoutPage }>({
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page))
  },
})

// spec
test('pays', async ({ checkoutPage }) => {
  await checkoutPage.submit()
})
```

<!-- YOUR PROJECT: Document your page factory or page fixture pattern -->
<!-- Example:
```typescript
import { createTestPages } from '../helpers/createTestPages'

const { homePage, loginPage, checkoutPage } = createTestPages({ page })
```
-->

---

## Form Filling Patterns

```typescript
// Standard fill (clears, then sets the value)
await page.getByLabel('Email').fill('user@example.com')

// Sequential typing for masked or key-by-key validated inputs
await page.getByLabel('Phone').pressSequentially('5551234567')

// Fill and verify for fields that re-render on input
async function fillAndVerify(locator: Locator, value: string) {
  await locator.fill(value)
  await expect(locator).toHaveValue(value, { timeout: TIMEOUTS.SHORT })
}

// Selects and checkboxes
await page.getByLabel('Country').selectOption('DE')
await page.getByLabel('Accept terms').check()
```

---

## Fixture-Provided Values

<!-- YOUR PROJECT: Document your custom fixtures here -->
<!-- Example:
| Fixture | Type | Scope | Description |
|---------|------|-------|-------------|
| `page` | `Page` | test | Browser page |
| `checkoutPage` | `CheckoutPage` | test | Page object for /checkout |
| `testUser` | `TestUser` | test | Fresh user, deleted after the test |
| `api` | `ApiClient` | worker | Authenticated API client per worker |
-->

---

## Tags Reference

<!-- YOUR PROJECT: Document your test tags here -->
<!-- Example:
| Tag | Scope | Used In |
|-----|-------|---------|
| `@smoke` | Smoke tests | CI pipeline, post-deploy |
| `@regression` | Full regression | Nightly run |
| `@mobile` | Mobile viewport tests | Mobile CI job |
-->

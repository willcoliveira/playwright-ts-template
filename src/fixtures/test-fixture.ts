import { test as base, expect } from '@playwright/test';
import { HomePage } from '@pages/home.page';

/**
 * Project fixtures. Specs import `test` and `expect` from here, never from
 * '@playwright/test', so page objects arrive ready-made and specs never call `new`.
 * Add a field per page object; worker-scoped fixtures (API clients, per-worker
 * accounts) go in a second type parameter — see references/fixtures-and-auth.md.
 */
type PageFixtures = {
  homePage: HomePage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect };

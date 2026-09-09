import type { Page, Locator } from '@playwright/test';

/**
 * The site's main navigation bar. Components wrap a region shared by several
 * pages; page objects expose them as readonly fields (see HomePage.nav).
 */
export class NavigationComponent {
  readonly root: Locator;

  constructor(page: Page) {
    this.root = page.getByRole('navigation', { name: 'Main' });
  }

  link(name: string): Locator {
    return this.root.getByRole('link', { name, exact: true });
  }
}

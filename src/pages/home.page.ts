import type { Page, Locator } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { NavigationComponent } from '@pages/components/navigation.component';

export class HomePage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly pageHeading: Locator;
  readonly nav: NavigationComponent;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
    this.pageHeading = page.getByRole('heading', { name: /Playwright/, level: 1 });
    this.nav = new NavigationComponent(page);
  }

  async goto() {
    await test.step('Navigate to home page', async () => {
      await this.page.goto('/');
    });
  }

  async clickGetStarted() {
    await test.step('Click Get Started link', async () => {
      await this.getStartedLink.click();
    });
  }

  async expectPageHeading() {
    await test.step('Verify home page heading is visible', async () => {
      await expect(this.pageHeading).toBeVisible();
    });
  }

  async expectGetStartedLink() {
    await test.step('Verify Get Started link is visible', async () => {
      await expect(this.getStartedLink).toBeVisible();
    });
  }
}

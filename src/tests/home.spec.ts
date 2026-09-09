import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/home.page';

test.describe('Home Page', { tag: ['@smoke'] }, () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should display the home page heading', async () => {
    await homePage.expectPageHeading();
  });

  test('should display the Get Started link', async () => {
    await homePage.expectGetStartedLink();
  });

  test('should link to the docs from the main navigation', async () => {
    await expect(homePage.nav.link('Docs')).toBeVisible();
  });

  test('should navigate to the intro page', async ({ page }) => {
    await homePage.clickGetStarted();

    await test.step('Verify navigation to intro page', async () => {
      await expect(page).toHaveURL(/\/docs\/intro/);
      await expect(page.getByRole('heading', { name: 'Installation', level: 1 })).toBeVisible();
    });
  });
});

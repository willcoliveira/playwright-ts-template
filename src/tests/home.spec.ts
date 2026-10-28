import { test, expect } from '@fixtures/test-fixture';

test.describe('Home Page', { tag: ['@smoke'] }, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('should display the home page heading', async ({ homePage }) => {
    await homePage.expectPageHeading();
  });

  test('should display the Get Started link', async ({ homePage }) => {
    await homePage.expectGetStartedLink();
  });

  test('should link to the docs from the main navigation', async ({ homePage }) => {
    await expect(homePage.nav.link('Docs')).toBeVisible();
  });

  test('should navigate to the intro page', async ({ homePage, page }) => {
    await homePage.clickGetStarted();

    await test.step('Verify navigation to intro page', async () => {
      await expect(page).toHaveURL(/\/docs\/intro/);
      await expect(page.getByRole('heading', { name: 'Installation', level: 1 })).toBeVisible();
    });
  });
});

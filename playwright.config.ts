import { defineConfig, devices } from '@playwright/test';
import { loadEnvFile } from 'node:process';

// Load a local .env when present (Node >= 22 built-in, no dotenv dependency).
// CI injects its variables directly, so a missing file is not an error.
try {
  loadEnvFile();
} catch {
  /* no .env — fall through to process.env / defaults */
}

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './src/tests',
  outputDir: './test-results',

  // Each test file runs in parallel; tests inside a file too.
  fullyParallel: true,
  // A stray test.only never gets merged.
  forbidOnly: isCI,
  // Retry on CI only; a retry writes a trace (see use.trace).
  retries: isCI ? 2 : 0,
  // CI runners are small and the suite is also sharded across jobs.
  workers: isCI ? 2 : undefined,

  timeout: 30_000,
  expect: { timeout: 5_000 },

  // CI: line output, a blob per shard (merged into one HTML report by the
  // merge-reports job) and GitHub annotations. Local: line output + an HTML
  // report that only opens when something failed.
  reporter: isCI ? [['list'], ['blob'], ['github']] : [['list'], ['html', { open: 'on-failure' }]],

  use: {
    // '||' on purpose: CI passes an unset repository variable as an empty string.
    baseURL: process.env.BASE_URL || 'https://playwright.dev',
    // CI: only on the first retry; locally every failure leaves a trace to open.
    trace: isCI ? 'on-first-retry' : 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    testIdAttribute: 'data-testid',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },

    // Mobile viewports — enable when the application under test has a mobile layout.
    // { name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
    // { name: 'mobile-safari', use: { ...devices['iPhone 15'] } },

    // Authenticated tests — see .claude/skills/playwright-e2e/references/fixtures-and-auth.md:
    // { name: 'setup', testMatch: /.*\.setup\.ts/ },
    // { name: 'chromium-authenticated', dependencies: ['setup'],
    //   use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' } },
  ],

  // Start the application before the tests when it runs locally:
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !isCI,
  //   timeout: 120_000,
  // },
});

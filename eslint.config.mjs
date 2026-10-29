import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  eslint.configs.recommended,
  // Type-aware rules: an un-awaited page action or assertion is a silent false pass in
  // Playwright, and only no-floating-promises / no-misused-promises catch every case
  // (playwright/missing-playwright-await only covers expect and a few test APIs).
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // Plain JavaScript (this config file) is outside tsconfig; type-aware rules cannot run on it.
    files: ['**/*.js', '**/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    ignores: ['node_modules/', 'playwright-report/', 'test-results/', 'blob-report/', 'all-blob-reports/', '.playwright-cli/', 'dist/'],
  },
  {
    // Page objects and components carry actions and assertions too — same rules apply.
    files: ['src/**/*.ts'],
    ...playwright.configs['flat/recommended'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      // Assertion helpers on page objects are named expect…; keep the rule live.
      'playwright/expect-expect': ['error', { assertFunctionPatterns: ['^expect'] }],
    },
  },
);

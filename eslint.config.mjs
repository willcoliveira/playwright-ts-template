import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
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

export default [
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { window: 'readonly', document: 'readonly', localStorage: 'readonly', navigator: 'readonly', fetch: 'readonly', setTimeout: 'readonly', clearTimeout: 'readonly', IntersectionObserver: 'readonly' },
    },
    rules: {},
  },
];

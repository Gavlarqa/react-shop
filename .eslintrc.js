import stylisticTs from '@stylistic/eslint-plugin-ts';

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard-with-typescript', 'plugin:react/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@stylistic/ts'],
  rules: {
    // Note: you must disable the base rule as it can report incorrect errors
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': 'off',
  },
};

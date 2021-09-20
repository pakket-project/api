module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: [
    '@tribecamp/base',
    '@tribecamp/typescript',
    'prettier'
    // 'prettier/@typescript-eslint',
    // 'prettier/unicorn'
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': 'error',
    'no-param-reassign': ['error', { props: false }],
    'jsdoc/require-param': 'off',
    'jsdoc/check-param-names': 'off'
  }
};

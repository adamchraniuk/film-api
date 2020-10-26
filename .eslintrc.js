module.exports = {
  root: true,
  plugins: ['jest'],
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    'no-unused-vars': 'off',
  },
}

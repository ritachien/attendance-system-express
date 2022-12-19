module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'standard',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    semi: [
      'error',
      'never',
    ],
    'comma-dangle': [
      'error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
    'space-before-function-paren': ['error', 'always'],
  },
}

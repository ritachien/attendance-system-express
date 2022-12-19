module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
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
  },
}

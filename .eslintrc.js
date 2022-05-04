module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'object-curly-newline': ['error', { ExportDeclaration: { multiline: true, minProperties: 5 } }],
  },
  settings: { 'import/resolver': { webpack: { config: './webpack.config.js' } } },
};

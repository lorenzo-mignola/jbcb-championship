const { rules } = require('eslint-config-prettier');
const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    'plugin:svelte/all',
    'plugin:prettier/recommended',
    'plugin:svelte/prettier',
    'plugin:vitest/all',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'vitest', 'testing-library'],
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    }
  },
  parserOptions: {
    project,
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte']
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      rules: {
        'import/no-mutable-exports': 'off',
        'import/no-unresolved': [2, { ignore: ['.app/', 'virtual:pwa-info'] }],
        'no-unused-vars': ['error', { varsIgnorePattern: '..Slots' }]
      }
    },
    {
      files: ['**/*.test.ts'],
      extends: ['plugin:testing-library/dom']
    }
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'prettier/prettier': 'error',
    'import/order': 'off',
    'svelte/block-lang': [
      'error',
      {
        enforceScriptPresent: false,
        enforceStylePresent: false,
        script: ['ts', null], // a list of languages or null to signify no language specified
        style: ['postcss'] // same as for script, a single value can be used instead of an array.
      }
    ],
    'svelte/no-unused-class-name': 'off',
    camelcase: ['error', { allow: ['category_id', 'match_id', 'double_pool'] }],
    'vitest/prefer-expect-assertions': 'off'
  }
};

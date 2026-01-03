import antfu from '@antfu/eslint-config';
import betterTailwind from 'eslint-plugin-better-tailwindcss';

export default antfu(
  {
    formatters: true,
    rules: {
      'perfectionist/sort-enums': ['error'],
      'perfectionist/sort-imports': [
        'error',
        {
          internalPattern: ['^\\$lib(/.*)?$', '^\\$tests(/.*)?$'],
          newlinesBetween: 1,
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-interfaces': ['error'],
      'perfectionist/sort-jsx-props': ['error'],
      'perfectionist/sort-objects': ['error'],
      'style/brace-style': ['error', '1tbs'],
      'style/max-len': ['warn', { code: 100 }],
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    },
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
    },
    svelte: true,
  },
  {
    plugins: {
      'better-tailwindcss': betterTailwind,
    },
    rules: {
      ...betterTailwind.configs.recommended.rules,
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/routes/layout.css',
      },
    },
  },
  {
    files: ['*.md'],
    rules: {
      'style/max-len': ['warn', { code: 300 }],
      'unicorn/filename-case': ['off'],
    },
  },
  {
    files: ['**/*.{html,css,json}', 'src/lib/icons/**', 'cert/**'],
    rules: {
      'style/max-len': ['off'],
    },
  },
);

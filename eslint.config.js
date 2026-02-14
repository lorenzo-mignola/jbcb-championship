import antfu from '@antfu/eslint-config';
import betterTailwind from 'eslint-plugin-better-tailwindcss';

export default antfu(
  {
    formatters: true,
    rules: {
      'eslint-comments/require-description': 'error',
      'perfectionist/sort-enums': ['error'],
      'perfectionist/sort-imports': [
        'error',
        {
          internalPattern: ['^\\$lib(/.*)?$', '^\\$tests(/.*)?$', '^\\$routes(/.*)?$'],
          newlinesBetween: 1,
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-interfaces': ['error'],
      'perfectionist/sort-jsx-props': ['error'],
      'perfectionist/sort-objects': ['error'],
      'style/brace-style': ['error', '1tbs'],
      'style/indent': ['error', 2, {
        MemberExpression: 1,
      }],
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
      'better-tailwindcss/no-unknown-classes': [
        'error',
        { detectComponentClasses: true, ignore: ['^local-.*'] },
      ],
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

import nx from '@nx/eslint-plugin';
import * as importPlugin from 'eslint-plugin-import';
import sortKeys from 'eslint-plugin-sort-keys-fix';
import sortDestrKeys from 'eslint-plugin-sort-destructure-keys';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$', '^tools/.*'],
          depConstraints: [
            {
              onlyDependOnLibsWithTags: ['*'],
              sourceTag: '*',
            },
          ],
          enforceBuildableLibDependency: true,
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      import: importPlugin,
      sortKeys: sortKeys,
      sortDestrKeys: sortDestrKeys,
    },
    ignores: ['**/*jest.preset.js'],
    rules: {
      'max-lines': ['error', 1015],
      'no-console': ['warn'],
      'no-multiple-empty-lines': 'warn',
      'no-trailing-spaces': 'warn',
      'sortKeys/sort-keys-fix': 'warn',
      'sortDestrKeys/sort-destructure-keys': 2,
      'import/order': [
        'warn',
        {
          named: true,
          alphabetize: {
            order: 'asc',
          },
          groups: ['builtin', ['sibling', 'parent'], 'index', 'object'],
        },
      ],
    },
  },
  // Специфичные правила для webpack конфигов - разрешаем относительные пути из tools
  {
    files: ['**/webpack.config*'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allow: [
            '^.*/eslint(\\.base)?\\.config\\.[cm]?js$',
            '^tools/.*',
            // Разрешаем относительные пути к tools из webpack конфигов
            '^\\.\\./\\.\\./tools/.*', // ../../tools/
            '^\\.\\./tools/.*', // ../tools/
            '^\\./tools/.*', // ./tools/
            '^tools/.*', // tools/
          ],
          depConstraints: [
            {
              onlyDependOnLibsWithTags: ['*'],
              sourceTag: '*',
            },
          ],
          enforceBuildableLibDependency: false,
        },
      ],
    },
  },
];

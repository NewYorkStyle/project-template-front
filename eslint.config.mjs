import nx from '@nx/eslint-plugin';
// @ts-ignore
import importPlugin from 'eslint-plugin-import';
import sortKeys from 'eslint-plugin-sort-keys-fix';
import sortDestrKeys from 'eslint-plugin-sort-destructure-keys';

export default [
  // @ts-ignore
  ...nx.configs['flat/base'],
  // @ts-ignore
  ...nx.configs['flat/typescript'],
  // @ts-ignore
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
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
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
    plugins: {import: importPlugin, sortKeys: sortKeys, sortDestrKeys: sortDestrKeys},
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
];

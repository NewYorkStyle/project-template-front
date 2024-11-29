import nx from '@nx/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
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
    rules: {
      'max-lines': ['error', 1015],
      'no-console': ['warn'],
      'no-multiple-empty-lines': 'error',
      'no-trailing-spaces': 'error',
      'sortKeys/sort-keys-fix': 'warn',
      'sortDestrKeys/sort-destructure-keys': 2,
      'import/order': [
        'error',
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

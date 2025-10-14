import storybook from 'eslint-plugin-storybook';
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import {folderStructureConfig} from './eslint.folder-structure.mjs';
import {
  projectStructureParser,
  projectStructurePlugin,
} from 'eslint-plugin-project-structure';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  /**
   * Конфигурация для правила project-structure/folder-structure
   */
  {
    files: ['**/*'],
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      '**/*.config.js',
      '**/*.d.ts',
      '**/coverage/**',
      '**/tools/**',
      'projectStructure.cache.json',
    ],
    languageOptions: {
      parser: projectStructureParser,
    },
    plugins: {
      'project-structure': projectStructurePlugin,
    },
    rules: {
      'project-structure/folder-structure': ['error', folderStructureConfig],
    },
  },

  /**
   * Основные правила для TypeScript и JavaScript файлов
   */
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        ...globals.jest,
        React: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      import: importPlugin,
      'sort-keys-fix': sortKeysFix,
      'sort-destructure-keys': sortDestructureKeys,
      prettier: prettierPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      ...typescript.configs['recommended-requiring-type-checking'].rules,
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-floating-promises': 'off',

      'no-console': 'warn',
      'no-multiple-empty-lines': 'warn',
      'no-trailing-spaces': 'warn',
      'max-lines': ['error', 1015],

      'sort-keys-fix/sort-keys-fix': 'warn',
      'sort-destructure-keys/sort-destructure-keys': 'warn',

      // ✅ Правила для импортов
      'import/order': [
        'warn',
        {
          groups: [
            'builtin', // node встроенные модули (fs, path и т.д.)
            'external', // внешние зависимости (react, antd и т.д.)
            'internal', // внутренние алиасы (@/ и т.д.)
            'parent', // импорты из родительской директории (../)
            'sibling', // импорты из текущей директории (./)
            'index', // index файлы
            'object', // импорты типов (type imports)
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
        },
      ],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          prefix: ['T'],
        },
        {
          selector: 'enum',
          format: ['UPPER_CASE'],
          prefix: ['E_'],
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
      ],

      'prettier/prettier': 'error',
    },
  },

  /**
   * 🏗️ КОНФИГУРАЦИЯ FSD АРХИТЕКТУРЫ
   * Правила для контроля импортов между слоями
   */
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: 'src/app',
              from: [],
              message: 'Слой "app" может импортировать из всех слоев.',
            },
            {
              target: 'src/pages',
              from: ['src/app'],
              message:
                'Слой "pages" может импортировать только из widgets, features, entities, shared.',
            },
            {
              target: 'src/widgets',
              from: ['src/app', 'src/pages'],
              message:
                'Слой "widgets" может импортировать только из features, entities, shared.',
            },
            {
              target: 'src/features',
              from: ['src/app', 'src/pages', 'src/widgets'],
              message:
                'Слой "features" может импортировать только из entities и shared.',
            },
            {
              target: 'src/entities',
              from: ['src/app', 'src/pages', 'src/widgets', 'src/features'],
              message: 'Слой "entities" может импортировать только из shared.',
            },
            {
              target: 'src/shared',
              from: [
                'src/app',
                'src/pages',
                'src/widgets',
                'src/features',
                'src/entities',
              ],
              message:
                'Слой "shared" является базовым и не должен импортировать из других слоев.',
            },
          ],
        },
      ],
    },
  },

  /**
   * Конфигурация для конфигурационных файлов
   */
  {
    files: [
      '**/webpack.config.*',
      '**/*.config.*',
      'tools/**/*.{ts,tsx,js,jsx}',
    ],
    rules: {
      'no-console': 'off',
      'import/order': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'sort-keys-fix/sort-keys-fix': 'off',
      'sort-destructure-keys/sort-destructure-keys': 'off',
      'prettier/prettier': 'off',
      '@typescript-eslint/naming-convention': 'off',
    },
  },

  /**
   * Конфигурация для тестовых файлов
   */
  {
    files: [
      '**/__tests__/**',
      '**/*.test.*',
      '**/*.spec.*',
      'src/setupTests.ts',
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },

  /**
   * Storybook конфигурация
   */
  ...storybook.configs['flat/recommended'],

  /**
   * Prettier config должен быть последним
   */
  prettier
);

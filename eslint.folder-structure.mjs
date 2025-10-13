// @ts-nocheck
import {createFolderStructure} from 'eslint-plugin-project-structure';

const withBarrelFile = (rules) => [{name: 'index.ts'}, ...rules];

// Базовые файлы для папок с файлами
const BASE_FILES = [
  {name: '{kebab-case}.(ts|tsx)'},
  {name: '{kebab-case}.less'},
  {name: '{kebab-case}.stories.(ts|tsx)'},
];

// Структура для сегментов (api, ui, model, lib)
const SEGMENT = {
  children: withBarrelFile([
    ...BASE_FILES,
    {
      name: '__tests__',
      children: withBarrelFile([{name: '{kebab-case}.test.(ts|tsx)'}]),
    },
    {
      name: '{kebab-case}',
      children: withBarrelFile([
        ...BASE_FILES,
        {
          name: '__tests__',
          children: withBarrelFile([{name: '{kebab-case}.test.(ts|tsx)'}]),
        },
      ]),
    },
  ]),
};

// Сегменты для использования в разных слоях
const SEGMENTS = [
  {
    name: 'ui',
    ...SEGMENT,
  },
  {
    name: 'api',
    ...SEGMENT,
  },
  {
    name: 'model',
    ...SEGMENT,
  },
  {
    name: 'lib',
    ...SEGMENT,
  },
  {
    name: 'types',
    ...SEGMENT,
  },
];

// Структура для FSD слайсов (entities, features, widgets, pages)
const FSD_SLICE = {
  name: '{kebab-case}',
  children: withBarrelFile([
    {name: '{kebab-case}.(ts|tsx)'},
    {name: '{kebab-case}.less'},
    ...SEGMENTS, // Добавляем сегменты внутрь слайса
    {
      name: '__tests__',
      children: withBarrelFile([{name: '{kebab-case}.test.(ts|tsx)'}]),
    },
  ]),
};

export const folderStructureConfig = createFolderStructure({
  structure: [
    // Разрешаем файлы в корне проекта
    {name: '*'},

    // Разрешаем папки в корне проекта
    {name: '*', children: []},

    // Структура папки src согласно FSD
    {
      name: 'src',
      children: [
        // Обязательные файлы в корне src
        {name: 'index.tsx'},
        {name: 'styled.d.ts'},
        {name: 'setup-tests.ts'},
        {name: 'app.tsx'},

        // App слой
        {
          name: 'app',
          children: withBarrelFile([{name: 'app.tsx'}, ...SEGMENTS]),
        },

        // Entities слой
        {
          name: 'entities',
          children: withBarrelFile([FSD_SLICE]),
        },

        // Features слой
        {
          name: 'features',
          children: withBarrelFile([FSD_SLICE]),
        },

        // Shared слой
        {
          name: 'shared',
          children: withBarrelFile([...SEGMENTS]),
        },

        // Widgets слой
        {
          name: 'widgets',
          children: withBarrelFile([FSD_SLICE]),
        },

        // Pages слой
        {
          name: 'pages',
          children: withBarrelFile([FSD_SLICE]),
        },
      ],
    },
  ],
});

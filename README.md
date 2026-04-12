# Project Template Frontend

![React](https://img.shields.io/badge/React-19.1.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)
![Ant Design](https://img.shields.io/badge/Ant_Design-6.0.0-blue.svg)
![MobX](https://img.shields.io/badge/MobX-6.15.0-red.svg)
![Vite](https://img.shields.io/badge/Vite-7-646CFF.svg)
![Vitest](https://img.shields.io/badge/Vitest-3.2.4-6E9F18.svg)

Современное React-приложение, построенное по принципам **Feature-Sliced Design (FSD)** архитектуры. Проект представляет собой полноценный шаблон для быстрого старта frontend-разработки с поддержкой темной/светлой темы, многоязычностью и комплексной системой тестирования.

## ✨ Особенности

- 🏗️ **Feature-Sliced Design** - Четкое разделение на слои и сегменты
- 🎨 **Темная/светлая тема** - Автоматическое переключение и сохранение предпочтений
- 🌍 **Многоязычность** - Поддержка русского и английского языков
- 🧪 **Комплексное тестирование** - Unit и E2E
- 🚀 **Современный стек** - React 19, TypeScript, Ant Design
- 📦 **Автоматизация** - Semantic Release, Husky, Commitizen
- 🎯 **Типобезопасность** - Полная типизация TypeScript
- 🔒 **Безопасность** - HTTP-заголовки, CSRF-защита, HTTP-only куки

## 🛠️ Технологический стек

### Основные технологии

- **React 19.1.1** - JavaScript-библиотека для создания пользовательских интерфейсов
- **TypeScript 5.9.3** - Статическая типизация для JavaScript
- **Ant Design 6.0.0** - UI-компоненты и дизайн-система
- **react-hook-form + react-hook-form-antd + zod** - Формы и декларативная валидация

### Управление состоянием

- **MobX 6.15.0** - Реактивное управление состоянием
- **@tanstack/react-query 5.90.5** - Управление серверным состоянием

### Маршрутизация

- **React Router 7.9.4** - Клиентская маршрутизация

### Сборка и инструменты

- **Vite 7** - dev-сервер и production-сборка (Rollup)
- **Sass** - препроцессор SCSS

### Тестирование

- **Vitest 3.2.4** - Фреймворк для unit-тестирования
- **@testing-library/react 16.3.0** - Тестирование React-компонентов
- **Playwright 1.56.0** - E2E тестирование
- **Allure 2.34.1** - Генерация отчетов по тестированию

### Инструменты разработки

- **ESLint 9.37.0** - Линтинг кода
- **Prettier 3.6.2** - Форматирование кода
- **Husky** - Git-хуки
- **Commitizen** - Стандартизация коммитов

## 🏗️ Архитектура (FSD - Feature-Sliced Design)

### Структура папок

```
src/
├── app/           # Глобальные настройки приложения
├── entities/      # Бизнес-сущности (User, Auth и т.д.)
├── features/      # Функциональные возможности (Auth, Profile и т.д.)
├── pages/         # Страницы приложения
├── widgets/       # Комплексные виджеты
└── shared/        # Общие утилиты и компоненты
```

### Уровни архитектуры

1. **App (Приложение)** - Глобальные настройки, провайдеры, роутинг
2. **Pages (Страницы)** - Полные страницы приложения
3. **Widgets (Виджеты)** - Комплексные компоненты, состоящие из нескольких фич
4. **Features (Фичи)** - Независимые функциональные возможности
5. **Entities (Сущности)** - Бизнес-логика и доменные сущности
6. **Shared (Общее)** - Утилиты, типы, общие компоненты

### Принципы FSD

- **Независимость слоев** - Каждый слой может существовать независимо
- **Горизонтальное переиспользование** - Компоненты одного слоя могут использоваться в других частях приложения
- **Вертикальное разделение ответственностей** - Каждый слой отвечает за свою зону ответственности
- **Инкапсуляция** - Каждый слой скрывает свою внутреннюю реализацию

## 🚀 Быстрый старт

### Требования

- Node.js (рекомендуется текущая LTS)
- **pnpm** — версия задаётся в поле `packageManager` в `package.json`; при необходимости: `corepack enable`

### Установка зависимостей

```bash
pnpm install
```

### Запуск в development режиме

```bash
pnpm dev
```

### Сборка production версии

```bash
pnpm build
```

## 📋 Команды

### Разработка

| Команда              | Описание                         |
| -------------------- | -------------------------------- |
| `pnpm dev`           | Запуск development сервера       |
| `pnpm build`         | Сборка production версии         |
| `pnpm build:analyze` | Сборка с анализом размера бандла |

### Тестирование

| Команда              | Описание                            |
| -------------------- | ----------------------------------- |
| `pnpm test`          | Запуск unit-тестов                  |
| `pnpm test:watch`    | Запуск тестов в watch-режиме        |
| `pnpm test:coverage` | Запуск тестов с покрытием           |
| `pnpm e2e:all`       | Запуск E2E тестов                   |
| `pnpm e2e:changed`   | Запуск только измененных E2E тестов |
| `pnpm e2e:allure`    | Просмотр отчетов Allure             |

### Код-ревью

| Команда                | Описание                        |
| ---------------------- | ------------------------------- |
| `pnpm lint`            | Проверка линтером (ESLint)      |
| `pnpm prettier:check`  | Проверка форматирования         |
| `pnpm type:check`      | Проверка типов (`tsc --noEmit`) |
| `pnpm codestyle:check` | Комплексная проверка кода       |

### Автоматизация

| Команда                         | Описание                                         |
| ------------------------------- | ------------------------------------------------ |
| `pnpm generate:tokens`          | Генерация SCSS переменных из TypeScript констант |
| `pnpm semantic-release`         | Автоматический релиз                             |
| `pnpm semantic-release:dry-run` | Тестовый запуск релиза                           |

## 🧪 Тестирование

### Unit-тесты

Проект использует Vitest + React Testing Library для unit-тестирования:

```bash
pnpm test
```

- Тестирование компонентов, утилит, хуков
- Mocking внешних зависимостей
- Автоматическое измерение покрытия

### E2E тесты

Используется Playwright для сквозного тестирования:

```bash
pnpm run e2e
```

**Особенности:**

- Запуск в Chromium, Firefox, WebKit
- Page Object Model
- Allure для отчётов
- Интеллектуальный выбор тестов (`e2e:changed`)
- Скриншоты, видео и trace при падениях
- Реальный backend через test API (`/test/create-user`, `/test/grant-permissions`, `/test/delete-user`)
- Изоляция сессий между тестами (очистка cookies + пустой `storageState`; при сценариях с login/register учитывать `localStorage`, в т.ч. ключ `userId`)

**Требования к окружению для E2E:**

- backend должен быть запущен и доступен по `VITE_API_URL`
- в test-окружении для OTP используется код `123456`
- тестовые данные создаются/удаляются автоматически в fixtures

## 🔧 Конфигурация

### TypeScript

Конфигурация в `tsconfig.json`:

- Строгая типизация (`"strict": true`)
- Модули ESNext, `moduleResolution: "bundler"` (совместимость с Vite и `exports` в зависимостях)
- Разрешение JSON-файлов
- Псевдонимы для путей:
  - `@shared` - общие компоненты
  - `@pages` - страницы
  - `@entities` - сущности
  - `@features` - фичи
  - `@widgets` - виджеты

### Vite

Конфигурация в [`vite.config.ts`](vite.config.ts) в корне репозитория:

- Dev-сервер (по умолчанию порт **4200**, см. `server` в конфиге), HMR
- Алиасы FSD совпадают с `resolve.alias` и `tsconfig.json` (`paths`); они же помогают Vite разрешать пути в `@use` внутри SCSS (например `@/shared/styles/variables`)
- SCSS: глобальный инжект переменных через `additionalData` в конфиге **не используется** — в `*.module.scss` подключают токены явным `@use` (см. [docs/agents/styles.md](./docs/agents/styles.md)); при необходимости общего препроцессинга см. [docs/agents/tools.md](./docs/agents/tools.md)
- Прокси API: префикс `/api` → `VITE_API_URL` из `.env` (через `loadEnv`)
- Production: `base: './'` для относительных путей к статике; при `ANALYZE=true` — отчёт `rollup-plugin-visualizer`

### ESLint

Конфигурация в `eslint.config.mjs`:

- Строгие правила TypeScript
- React-специфичные правила
- Import-правила для FSD архитектуры
- Prettier-интеграция

## 🎨 Стили и дизайн

### CSS-модули и SCSS

- Компонентные стили — `*.module.scss` (CSS Modules в Vite для файлов с суффиксом `.module.*`). В начале файла — `@use '@/shared/styles/variables' as *;`, чтобы использовать `$spacing-*`, брейкпоинты и т.д.
- **Генерация из токенов** (`pnpm run generate:tokens`, также перед `dev`/`build`):
  - `src/shared/styles/variables.scss` — SCSS-переменные (отступы, радиусы, типографика, брейкпоинты);
  - `src/app/styles/global.scss` — сброс для `body`, CSS variables для светлой/тёмной темы (`:root`, `[data-theme="dark"]`).
- Источник правды для генератора: `src/shared/lib/constants/design-tokens.ts` (`tools/generators/generate-global-scss.ts`).
- Точка входа глобальных стилей: импорт `./styles/global.scss` в `src/app/app.tsx`.

### Дизайн-система

- Ant Design в качестве основной дизайн-системы
- Кастомизация через `getAntdThemeConfig`
- Единые цветовые токены в `src/shared/lib/constants/design-tokens.ts`

### Переменные CSS

- Цвета: `--text-primary`, `--background-primary` и т.д.
- Отступы, радиусы, размеры текста
- Адаптивные брейкпоинты

## 🌐 Многоязычность

### i18next

Проект поддерживает русский и английский языки:

- Автоматическое определение языка
- Локализация через `src/shared/lib/i18n/`
- Разделение переводов по модулям:
  - `Common` - общие фразы
  - `Auth` - аутентификация
  - `Main` - основные экраны
  - `User` - пользовательские функции

### Переключение языка

Используется компонент `LanguageSelect` для переключения языков в интерфейсе.

## 🔒 Безопасность

### HTTP-заголовки

- CSP (Content Security Policy)
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security

### Аутентификация

- HTTP-only куки для токенов
- CSRF-защита
- Автоматическое обновление сессии

## 🚀 CI/CD

### Сборка

- Автоматическая сборка при коммитах
- Раздельные сборки для dev/prod
- Оптимизация и минификация

### Тестирование

- Запуск unit-тестов
- Запуск E2E тестов
- Проверка линтером

Зависимости в CI устанавливаются через **pnpm** (`pnpm install --frozen-lockfile`, lockfile — `pnpm-lock.yaml`).

### Деплой

- Автоматический деплой на staging/production
- Semantic Release для автоматических релизов

## 📝 Разработка

### Git-стратегия

- Feature-branch workflow
- Стандартизированные коммиты (Conventional Commits)
- Pull Request обязательны для всех изменений

### Коммиты

Используется Commitizen для форматирования коммитов:

```bash
pnpm exec cz
```

**Обязательные префиксы:**

- `feat:` - новая функциональность
- `fix:` - исправление багов
- `docs:` - документация
- `style:` - форматирование
- `refactor:` - рефакторинг
- `test:` - тесты
- `chore:` - обслуживание

### Environment Variables

- `.env` - локальные переменные
- `.env.example` - пример переменных окружения
- Разделение по окружениям (dev, staging, prod)

## 📏 Правила именования

### Переменные и функции

- `camelCase`: `userName`, `getUserData()`
- Константы: `UPPER_SNAKE_CASE` - `API_BASE_URL`
- Булевы: префиксы `is`, `has`, `can` - `isLoading`, `hasPermission`

### Компоненты

- `PascalCase`: `UserProfile.tsx`, `Button.tsx`
- Хуки: префикс `use` - `useAuth`, `useUserData`

### Типы и интерфейсы

- Типы: префикс `T` - `TUser`, `TApiResponse`
- Интерфейсы: префикс `I` - `IUser`, `IAuthResponse`
- Обобщенные типы: `TData`, `TError`

### CSS-модули

- `camelCase`: `.container`, `.errorMessage`
- БЭМ-подобная структура: `.button`, `.button_primary`

## 💡 Best Practices

### TypeScript

- Избегать `any`, использовать конкретные типы
- Для неизвестных типов использовать `unknown`
- Обязательно типизировать пропсы компонентов
- Использовать utility types (`Partial`, `Pick`, `Omit`)

### React

- Функциональные компоненты вместо классовых
- Использовать хуки для управления состоянием
- Избегать inline-стилей в пользу CSS-модулей
- Memoization для оптимизации производительности

### MobX

- Использовать `makeAutoObservable` для классов хранилищ
- Разделять бизнес-логику и UI-логику
- Избегать циклических зависимостей между хранилищами

### API

- Использовать React Query для управления состоянием сервера
- Реализовывать retry-логику для запросов
- Обрабатывать ошибки на уровне запросов
- Использовать TypeScript для типизации API

### Формы

- Использовать `react-hook-form` + `react-hook-form-antd` + `zod`
- Хранить схемы в `model/*schema.ts` и создавать их через фабрики `createXSchema(t)`
- Выводить типы форм в `types/` через `z.infer<ReturnType<typeof createXSchema>>`
- Не дублировать валидацию между `Form.Item.rules` и `zod`-схемами

### FSD

- Соблюдать границы слоев
- Избегать дублирования бизнес-логики
- Использовать shared-уровень для truly-generic компонентов
- Бизнес-сценарные UI-блоки (например OTP-flow) размещать в `features`
- Поддерживать независимость фич

## 🚫 Что не делать

### Запрещено

- ❌ Добавлять новые зависимости без обсуждения
- ❌ Создавать классовые компоненты
- ❌ Использовать `any` в TypeScript-типах
- ❌ Коммитить логины/пароли в код
- ❌ Дублировать бизнес-логику
- ❌ Использовать глобальные стили без необходимости
- ❌ Игнорировать предупреждения линтера
- ❌ Писать код без типов в TypeScript
- ❌ Нарушать границы FSD-слоев
- ❌ Коммитить неотформатированный код

### Рекомендации

- ✅ Писать unit-тесты для новой функциональности
- ✅ Документировать сложные алгоритмы
- ✅ Использовать TypeScript для максимальной типизации
- ✅ Следовать принципам FSD архитектуры
- ✅ Проводить code review перед merge
- ✅ Поддерживать чистоту git-истории

## 📚 Документация

- [CHANGELOG](./docs/CHANGELOG.md) - История изменений
- [FSD](./docs/FSD.md) - Документация по FSD архитектуре
- [SEMANTIC_RELEASE_SETUP](./docs/SEMANTIC_RELEASE_SETUP.md) - Настройка Semantic Release

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте feature-ветку: `git checkout -b feature/AmazingFeature`
3. Сделайте коммит изменений: `git commit -m 'feat: Add some AmazingFeature'`
4. Запушьте ветку: `git push origin feature/AmazingFeature`
5. Создайте Pull Request

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. Подробнее см. в файле [LICENSE](LICENSE).

## 🙏 Благодарности

- [React](https://reactjs.org/) - за отличную библиотеку для создания UI
- [Ant Design](https://ant.design/) - за потрясающую дизайн-систему
- [MobX](https://mobx.js.org/) - за реактивное управление состоянием
- [Vite](https://vite.dev/) - за быстрый dev и сборку
- [Vitest](https://vitest.dev/) - за удобное unit-тестирование

---

**New York Style** &copy; 2025

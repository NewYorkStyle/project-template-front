# AGENTS.md — правила для AI (Cursor / Copilot / ChatGPT)

Проект: **React 19 + TypeScript**, **Feature-Sliced Design (FSD)**, Webpack, SCSS Modules. Рабочая область для изменений: `src/`, `e2e/`, `tools/`.

## Язык ответов

- Все ответы и предложения по коду формулируй на русском языке.
- Технические термины (API, HTTP, SQL и т.д.) оставляй на английском.

---

## 1. Слои FSD (`src/`)

| Слой         | Роль                                                                                | Примеры в репозитории                                                                   |
| ------------ | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **app**      | Инициализация приложения, провайдеры, роутинг, глобальные стили entry               | `src/app/app.tsx`, `src/app/model/providers/`, `src/app/lib/router/`, `src/app/styles/` |
| **pages**    | Страницы — композиция виджетов и фич, без бизнес-логики                             | `src/pages/auth/`, `src/pages/home/`, `src/pages/profile/`                              |
| **widgets**  | Крупные блоки UI из нескольких фич/сущностей                                        | `src/widgets/app-header/`                                                               |
| **features** | Пользовательские сценарии (форма, действие)                                         | `src/features/auth/`, `src/features/profile/`                                           |
| **entities** | Бизнес-сущности, API к ним, локальные хуки                                          | `src/entities/user/`, `src/entities/params/`                                            |
| **shared**   | Переиспользуемый код без привязки к продукту: UI-kit обёртки, API-клиент, константы | `src/shared/ui/`, `src/shared/lib/`, `src/shared/model/`                                |

### Ограничения импортов (ESLint `import/no-restricted-paths`, `eslint.config.mjs`)

Импорт **запрещён** в указанный слой **из** перечисленных путей:

| Целевой слой   | Запрещённые источники                                                 |
| -------------- | --------------------------------------------------------------------- |
| `src/pages`    | `src/app`                                                             |
| `src/widgets`  | `src/app`, `src/pages`                                                |
| `src/features` | `src/app`, `src/pages`, `src/widgets`                                 |
| `src/entities` | `src/app`, `src/pages`, `src/widgets`, `src/features`                 |
| `src/shared`   | `src/app`, `src/pages`, `src/widgets`, `src/features`, `src/entities` |

**Слой `app`** может импортировать из остальных слоёв (ограничений `from` нет).

---

## 2. Public API (`index.ts`)

- Каждый **слайс** и **сегмент** по возможности закрывается `index.ts` и реэкспортирует наружу.
- Внешние импорты — через **баррели верхнего уровня** и алиасы из `tsconfig.json` / `webpack.config.js`:
  - `@shared` → `src/shared/index.ts`
  - `@entities` → `src/entities/index.ts`
  - `@features` → `src/features/index.ts`
  - `@widgets` → `src/widgets/index.ts`
  - `@pages` → `src/pages/index.ts`

### AI не должен

- Импортировать из глубины чужого слайса, например: `import { X } from '@features/auth/ui/sign-in/sign-in'` или `from 'features/auth/api/sign-in'` — если есть экспорт в `src/features/auth/index.ts` / `src/features/index.ts`, использовать его.
- Добавлять импорты, нарушающие зоны из §1.

Исключение: внутри **одного** слайса относительные импорты между сегментами допустимы (как в `src/features/auth/ui/sign-in/sign-in.tsx`: `from '../../api'`).

---

## 3. Структура папок и генерация кода

Фактическая схема зафиксирована в **`eslint.folder-structure.mjs`** (правило `project-structure/folder-structure`).

### Новая feature / entity / widget / page (слайс)

Внутри слайса допустимы сегменты: **`ui/`**, **`api/`**, **`model/`**, **`lib/`**, **`types/`**, плюс корневые файлы слайса и **`__tests__/`**.

Для каждого сегмента: **`index.ts`** (barrel), файлы в **`kebab-case`**: `*.tsx`, `*.module.scss`, опционально `*.stories.tsx`, вложенные папки с тем же паттерном.

Минимальный набор для новой фичи (по необходимости):

- `ui/` — компоненты
- `model/` — локальное состояние (если нужно)
- `api/` — хуки/обёртки над HTTP + React Query
- `lib/` — утилиты
- `types/` — типы
- **`index.ts`** в корне слайса — реэкспорт публичного API

Эталон: `src/features/auth/` (`index.ts` реэкспортирует `api`, `lib`, `types`, `ui`).

### Новый компонент в сегменте `ui`

- `component-name.tsx`
- `component-name.module.scss` (стили — CSS Modules; см. §5)
- `component-name.stories.tsx` (если добавляете Storybook)
- `index.ts` в папке компонента
- Тесты: рядом в `__tests__/component-name.test.tsx` или `component-name.test.tsx` (см. §9)

Эталон: `src/features/auth/ui/sign-in/`, `src/shared/ui/button/`.

---

## 4. Инструменты (`tools/`)

Перед ручным кодом **проверить** содержимое `tools/`. Сейчас в репозитории:

| Инструмент                                            | Назначение                                                                                                                            |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `tools/generators/generate-global-scss.ts`            | Генерация `src/app/styles/variables.scss` и `src/app/styles/global.scss` из `src/shared/lib/constants/design-tokens.ts`               |
| `tools/webpack/plugins/with-global-scss-resources.js` | Подключение `style-resources-loader`: инжект `src/app/styles/variables.scss` во **все** `.scss` без ручного `@import` в каждом модуле |

Скрипт: `npm run generate:tokens` → запускает генератор SCSS.

### Правила

- Не дублировать логику генерации токенов вручную в других скриптах.
- Не обходить `with-global-scss-resources` альтернативными loader-цепочками без необходимости.
- Если поведения не хватает — **расширять** существующий генератор/плагин, а не создавать параллельный пайплайн.

Примечание: каталог `tools/**` в ESLint игнорируется отдельными правилами; при добавлении кода в `tools` ориентируйтесь на стиль соседних файлов.

---

## 5. Стили (SCSS, CSS Modules, глобальные)

- **Компоненты**: `*.module.scss` рядом с компонентом. Webpack: `css-loader` с `modules.auto: true` (`webpack.config.js`).
- **Глобальные стили**: только через генерацию из токенов и entry-подключение. Точка входа: `src/app/app.tsx` импортирует `./styles/global.scss` (сгенерированный/поддерживаемый в связке с `generate-global-scss.ts`).
- Переменные для модулей: автоматически доступны благодаря `with-global-scss-resources` и `variables.scss`.

### AI не должен

- Использовать inline-стили (`style={{}}`) для оформления — только классы и SCSS modules / глобальные правила по принятой схеме.
- Копировать значения токенов в модули вместо переменных/CSS custom properties из сгенерированных файлов.
- Редактировать `global.scss` / `variables.scss` вручную, если изменение должно идти от дизайн-токенов — править `design-tokens.ts` и перегенерировать.

---

## 6. Design tokens

- Источник истины: **`src/shared/lib/constants/design-tokens.ts`** (`TDesignTokens`, `designTokens`).
- SCSS: генерируется в `src/app/styles/variables.scss` (`$spacing-*`, `$border-radius-*`, `$text-size-*`, `$breakpoint-*`).
- Темы: CSS variables в `global.scss` (`:root`, `[data-theme="dark"]`) генерируются из палитр `colors.light` / `colors.dark`.

Правило: в TS использовать `designTokens`; в стилях — сгенерированные переменные / `var(--...)` из глобального слоя, а не «магические» hex для семантики, уже покрытой токенами.

---

## 7. API-слой

- Расположение: `src/features/*/api/`, `src/entities/*/api/`.
- HTTP: обёртка **`src/shared/lib/api/api.ts`** (`api.get`, `api.post`, axios, `baseURL: '/api'`, interceptors).
- Каждый сценарий — отдельный файл с хуком, например:
  - `src/features/auth/api/sign-in.ts` — `useSignIn` + `useMutation`
  - `src/features/profile/api/update-profile.ts` — `useUpdateProfile` + типы из `../types`

Обязательны типизация тел запросов/ответов и использование **React Query** (`@tanstack/react-query`) для серверных данных.

---

## 8. Формы и валидация

- Базовый стек форм: **`react-hook-form` + `react-hook-form-antd` + `zod`**.
- Валидация для feature-форм выносится в `model/*schema.ts`:
  - schema-фабрика принимает `t` из `react-i18next` (`createXSchema(t)`), чтобы сообщения были локализованы.
- Типы значений формы выводятся из схемы и лежат в `types/`:
  - `type TXFormValues = z.infer<ReturnType<typeof createXSchema>>`.
- В `ui/*.tsx`:
  - `FormItem` вместо `Form.Item` для контролируемых полей;
  - submit-обработчик в стиле `onSubmit` + `handleSubmit`.
- Не дублировать правила валидации одновременно в `rules` и `zod` — источник истины должен быть один (схема).

---

## 9. Состояние: MobX vs React Query

| Инструмент      | Назначение в проекте                                                                                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **React Query** | Серверное состояние: мутации, `invalidateQueries`, `setQueryData` (см. `useSignIn`, `useUpdateProfile`, `QueryProvider` в `src/app/model/providers/query-provider.tsx`)                    |
| **MobX**        | Локальное реактивное UI-состояние: `src/shared/model/app-store.ts`, `src/shared/lib/modal/modal-service.ts`, компоненты с `observer` (`src/app/ui/app-layout/`, `src/widgets/app-header/`) |
| **React state** | Допустимо для изолированных хуков без глобальной реактивности (например `src/entities/user/lib/use-auth.ts` — cookies + `useState`)                                                        |

Не смешивать ответственность: запросы и кеш — React Query; глобальные UI-флаги/модалки — существующие MobX-паттерны проекта.

---

## 10. Unit-тесты (Jest + Testing Library)

- Конфиг: **`jest.config.ts`**, setup: `src/setup-tests.ts`.
- Маски: `src/**/__tests__/**/*`, `src/**/*.test.(ts|tsx)`.
- Импорты CSS/SCSS: `identity-obj-proxy` в `moduleNameMapper`.

AI обязан добавлять/обновлять тесты при изменении поведения компонентов и хуков с логикой.

Не тестировать поведение **Ant Design** и **@new_york_style/project-template-ui** — тестируйте свою разметку, колбэки и интеграцию обёрток.

---

## 11. E2E (Playwright)

- Конфиг: **`playwright.config.ts`**, тесты: **`e2e/tests/`** (например `e2e/tests/auth/auth-sucsessul.spec.ts`).
- **Page objects**: `e2e/pages/` (`BasePage`, `AuthPage`, `HomePage`, `ProfilePage` и т.д.) — наследование от `e2e/pages/base/base-page.ts`.
- **Fixtures**: `e2e/fixtures/index.ts` — расширение `test` с `authPage`, `homePage`, `profilePage`, `testUsers`, вызов `setupAllMocks(page)`.

### AI должен

- Использовать page objects и фикстуры, а не сырые селекторы в spec-файлах.
- Для стабильности использовать `data-testid` из `src/shared/lib/constants/test-ids` (через реэкспорт `e2e/shared/constants`).

---

## 12. Моки E2E

- Реализация: `e2e/mocks/handlers/` (`auth.ts`, `user.ts`, `params.ts`), агрегатор `all-handlers.ts` → `setupAllMocks`.
- Тестовые пользователи: `e2e/shared/data` / реэкспорт в `e2e/shared`.

Правило: не хардкодить большие JSON в spec — выносить в общие моки и данные; переиспользовать существующие хендлеры.

---

## 13. Эталонные паттерны (Reference)

Перед генерацией нового кода:

1. Найти ближайший по смыслу слайс.
2. Скопировать структуру сегментов и стиль экспортов.
3. Адаптировать типы и API.

| Задача                        | Ориентир                                                               |
| ----------------------------- | ---------------------------------------------------------------------- |
| Feature (форма + API + types) | `src/features/auth/`, `src/features/profile/`, `src/features/otp/`     |
| Профиль и мутации             | `src/features/profile/`                                                |
| Shared UI + тест              | `src/shared/ui/button/`                                                |
| Страница                      | `src/pages/auth/auth.tsx`                                              |
| Widget                        | `src/widgets/app-header/`                                              |
| E2E page object + spec        | `e2e/pages/auth/auth-page.ts`, `e2e/tests/auth/auth-sucsessul.spec.ts` |

---

## 14. Изменение существующего кода

- Сохранять границы FSD (§1).
- Не менять публичные экспорты без необходимости (импорты по всему проекту через баррели).
- Без явного запроса — **не** проводить широкий рефакторинг; правки минимальные и по месту задачи.

---

## 15. Правила выбора при неоднозначности

1. Повторять существующий паттерн в репозитории.
2. Соблюдать FSD и ESLint zones.
3. Использовать `tools/` там, где уже есть генератор/плагин.
4. Предпочитать простое решение.

Запрещено без согласования с командой: новые npm-зависимости, смена архитектуры слоёв.

---

## 16. Область работ

- В scope: **`src/`**, **`e2e/`**, **`tools/`**.
- Вне scope: backend, инфраструктура вне репозитория.
- **UI kit** (`@new_york_style/project-template-ui`): не копировать компоненты в `shared` без необходимости; использовать импорты из пакета, как в `src/pages/auth/auth.tsx`, `src/features/auth/ui/sign-in/sign-in.tsx`.

---

## 17. Антипаттерны

- Нарушение импортов между слоями FSD.
- Inline-стили для визуала.
- Дублирование компонентов вместо переиспользования `shared` / существующих фич.
- Размещение бизнес-ориентированных UI-компонентов в `shared`, если они относятся к пользовательскому сценарию (например OTP-сценарий должен жить в `features`).
- Игнорирование `tools/generators` и webpack-плагина для глобальных стилей.
- Новые модули без `index.ts` там, где принято публичное API.
- E2E с длинными цепочками селекторов в `.spec.ts` вместо page objects.
- Магические строки данных в тестах вместо общих фикстур/моков.

---

## 18. Definition of Done

- Импорты соответствуют FSD и публичному API.
- Новые/изменённые слайсы имеют нужные `index.ts`.
- Стили через modules / согласованную глобальную схему; токены из `design-tokens` при изменении темы.
- Для логики — unit-тесты; для сценариев — E2E через page objects и моки при необходимости.
- После изменения токенов: `npm run generate:tokens` (если правили `design-tokens.ts`).
- `npm run lint` / проверка IDE без новых ошибок в затронутых файлах.

---

## 19. Примеры из кода (реальные пути)

### Feature barrel

`src/features/auth/index.ts`:

```ts
export * from './api';
export * from './lib';
export * from './types';
export * from './ui';
```

### API + React Query

`src/features/auth/api/sign-in.ts` — хук `useSignIn`, `useMutation`, `api.post`, инвалидация `queryKey`, навигация через `APP_ROUTES`.

### Компонент + module SCSS + test ids

`src/features/auth/ui/sign-in/sign-in.tsx` — импорт `useSignIn` из `../../api`, стили `sing-in.module.scss`, `TEST_IDS` для E2E.

### Форма + zod schema + типы

- `src/features/auth/model/sing-up.schema.ts` — `createSignUpSchema(t)`.
- `src/features/auth/types/sign-up-form.ts` — `z.infer<ReturnType<typeof createSignUpSchema>>`.
- `src/features/otp/model/otp.schema.ts` и `src/features/otp/types/otp-form.ts` — эталон вынесения схемы и типов для переиспользуемой feature-формы.

### Unit-тест

`src/shared/ui/button/__tests__/button.test.tsx` — `@testing-library/react`, сценарии рендера и клика.

### E2E: fixture + page object + spec

- `e2e/fixtures/index.ts` — `setupAllMocks`, инстансы page objects.
- `e2e/pages/auth/auth-page.ts` — локаторы через `TEST_IDS`, методы `open`, `fillCredentials`, `submit`.
- `e2e/tests/auth/auth-sucsessul.spec.ts` — шаги Allure, сценарий только через `authPage` / `homePage` / `testUsers`.

---

_Документ согласован с `eslint.config.mjs`, `eslint.folder-structure.mjs`, `webpack.config.js`, `package.json`, `tsconfig.json`._

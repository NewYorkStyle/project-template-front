# Project Template Frontend

## Что это за проект

React-приложение (SPA). Стек: React 19, TypeScript 5, Ant Design 6, MobX 6, React Query 5, React Router 7, Webpack 5.
Архитектура: Feature-Sliced Design (FSD).

---

## Структура папок

```
src/
├── app/           # Провайдеры, роутинг, глобальные стили
├── pages/         # Страницы (компонуют widgets/features)
├── widgets/       # Крупные составные блоки UI
├── features/      # Изолированные фичи с бизнес-логикой
├── entities/      # Доменные сущности (User, Auth, ...)
└── shared/        # Утилиты, UI-кит, константы, API-клиент
    ├── api/       # Базовый API-клиент, интерцепторы
    ├── lib/
    │   ├── constants/design-tokens.ts  # Цветовые токены, отступы
    │   ├── i18n/                       # Локализация
    │   └── api/                        # Хелперы для запросов
    ├── model/     # Глобальные MobX-хранилища (AppStore, UserStore, ThemeStore)
    └── ui/        # Переиспользуемые UI-компоненты

e2e/
├── fixtures/      # Фикстуры и настройки тестов
├── mocks/         # Моки API
├── pages/         # Page Object классы
└── tests/         # Тесты
```

---

## Правила импортов (FSD)

Слои могут импортировать только из слоёв **ниже** себя:

```
app → pages → widgets → features → entities → shared
```

**Запрещено:**

- `shared` импортирует из `features`, `entities`, `pages` и т.д.
- `entities` импортирует из `features`
- Перекрёстные импорты между фичами (`features/A` ↔ `features/B`)

Каждый слайс обязан иметь `index.ts` — публичное API. Импортировать напрямую в обход `index.ts` нельзя.

**Path aliases:**

- `@shared` → `src/shared`
- `@entities` → `src/entities`
- `@features` → `src/features`
- `@widgets` → `src/widgets`
- `@pages` → `src/pages`

---

## Как создавать новые сущности

### Новая фича

```
src/features/my-feature/
├── index.ts           # Публичное API (реэкспорт)
├── ui/
│   └── MyFeature.tsx
├── model/
│   └── my-feature.store.ts
└── api/
    └── my-feature.api.ts
```

### Новая страница

```
src/pages/my-page/
├── index.ts
└── ui/
    └── MyPage.tsx     # Компонует widgets и features, никакой бизнес-логики
```

### Новая сущность

```
src/entities/my-entity/
├── index.ts
├── model/
│   └── my-entity.store.ts
├── api/
│   └── my-entity.api.ts
└── ui/
    └── MyEntityCard.tsx
```

---

## Именование

| Что                 | Стиль              | Пример                       |
| ------------------- | ------------------ | ---------------------------- |
| Переменные, функции | camelCase          | `getUserData()`              |
| Константы           | UPPER_SNAKE_CASE   | `API_BASE_URL`               |
| Булевы переменные   | префикс is/has/can | `isLoading`, `hasPermission` |
| Компоненты, классы  | PascalCase         | `UserProfile.tsx`            |
| Хуки                | префикс use        | `useAuth`                    |
| Типы                | префикс T          | `TUser`, `TApiResponse`      |
| Интерфейсы          | префикс I          | `IUser`, `IAuthResponse`     |
| CSS-классы          | camelCase          | `.errorMessage`              |

---

## Управление состоянием

**MobX** — локальное и глобальное состояние приложения:

- Хранилища используют `makeAutoObservable`
- Глобальные хранилища: `AppStore` в `src/shared/model/`

**React Query** — серверное состояние (данные с API):

- Все запросы к API оборачиваются в `useQuery` / `useMutation`
- Не хранить серверные данные в MobX

---

## API

- Базовый клиент: `src/shared/lib/api/`
- API конкретной сущности: `src/entities/<entity>/api/`
- Автоматическое обновление токенов при 401 — реализовано в интерцепторе
- Типизировать все запросы и ответы обязательно

---

## Стили

- CSS-модули везде, глобальные стили — только при необходимости
- Дизайн-токены (цвета, отступы, размеры): `src/shared/lib/constants/design-tokens.ts`
- SCSS-переменные генерируются автоматически из токенов — не редактировать `variables.scss` руками
- Глобальные SCSS-переменные доступны во всех файлах без импорта (подключает Webpack-плагин)
- Темы: светлая и тёмная, конфигурируются через `getAntdThemeConfig` и CSS-переменные

---

## Локализация

- i18next, языки: русский и английский
- Файлы переводов: `src/shared/lib/i18n/`
- Пространства имён: `Common`, `Auth`, `Main`, `User`
- Весь пользовательский текст — только через i18n, строки в коде запрещены

---

## Тестирование

### Unit-тесты (Jest + React Testing Library)

```bash
npm test                # все тесты
npm run test:watch      # watch-режим
npm run test:coverage   # с покрытием
```

Файлы: `*.test.ts(x)` рядом с тестируемым файлом.

### E2E-тесты (Playwright + Allure)

```bash
npm run e2e             # все тесты
npm run e2e:changed     # только тесты, связанные с изменёнными файлами
npm run allure:show     # отчёт
```

Архитектура: Page Object Model. Каждая страница — отдельный класс в `e2e/pages/`.

### Storybook

```bash
npm run storybook       # порт 6006
```

Файлы историй: `*.stories.tsx` рядом с компонентом.

---

## Запрещено

- `any` в TypeScript — использовать `unknown` или конкретные типы
- Классовые React-компоненты
- Нарушение границ FSD-слоёв
- Импорт в обход `index.ts`
- Коммит без форматирования (Prettier) и без прохождения линтера (ESLint)
- Глобальные стили без необходимости
- Серверные данные в MobX (для этого React Query)
- Строки интерфейса вне i18n

---

## Ключевые команды

```bash
npm run dev              # dev-сервер
npm run build            # production-сборка
npm run lint             # ESLint
npm run format           # Prettier
npm run generate:tokens  # Генерация SCSS-переменных из design-tokens.ts
```

---

## Коммиты

Conventional Commits через Commitizen (`git cz`):
`feat:` `fix:` `docs:` `style:` `refactor:` `test:` `chore:`

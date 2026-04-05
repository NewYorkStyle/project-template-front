## Тестирование

## Quick rules

- Если меняешь поведение своей логики — обнови/добавь unit-тест.
- Не тестируй поведение Ant Design / `@new_york_style/project-template-ui` — тестируй свою интеграцию.
- Для e2e используй page objects + fixtures, избегай “сырых” селекторов.
- Большие mock-ответы выноси в общие handlers/data.

## Как использовать AI

- Для unit: тестируй свой контракт (props/callbacks/разметка), а не внутренности UI-kit.
- Для e2e: действуй через page objects (`e2e/pages/*`) и `data-testid`.

## Unit-тесты (Vitest + Testing Library)

- Конфиг: секция **`test`** в `vite.config.ts`, setup: `src/setup-tests.ts`.
- Маски: `src/**/__tests__/**/*`, `src/**/*.{test,spec}.{ts,tsx}`.
- Моки: `vi` из Vitest (глобально при `test.globals: true`). Импорты CSS/SCSS в тестах при необходимости — алиас/stub в Vite

AI обязан добавлять/обновлять тесты при изменении поведения компонентов и хуков с логикой.

Не тестировать поведение **Ant Design** и **@new_york_style/project-template-ui** — тестируйте свою разметку, колбэки и интеграцию обёрток.

---

## E2E (Playwright)

- Конфиг: **`playwright.config.ts`**, тесты: **`e2e/tests/`** (например `e2e/tests/auth/auth-sucsessul.spec.ts`).
- **Page objects**: `e2e/pages/` (`BasePage`, `AuthPage`, `HomePage`, `ProfilePage` и т.д.) — наследование от `e2e/pages/base/base-page.ts`.
- **Fixtures**: `e2e/fixtures/index.ts` — расширение `test` с `authPage`, `homePage`, `profilePage`, `testUsers`, вызов `setupAllMocks(page)`.

### AI должен

- Использовать page objects и фикстуры, а не сырые селекторы в spec-файлах.
- Для стабильности использовать `data-testid` из `src/shared/lib/constants/test-ids` (через реэкспорт `e2e/shared/constants`).

---

## Моки E2E

- Реализация: `e2e/mocks/handlers/` (`auth.ts`, `user.ts`, `params.ts`), агрегатор `all-handlers.ts` → `setupAllMocks`.
- Тестовые пользователи: `e2e/shared/data` / реэкспорт в `e2e/shared`.

Правило: не хардкодить большие JSON в spec — выносить в общие моки и данные; переиспользовать существующие хендлеры.

## Чек-лист

- [ ] Изменение поведения покрыто unit-тестом (если затрагивает логику).
- [ ] E2E использует page objects/fixtures и стабильные `data-testid`.
- [ ] Моки вынесены в `e2e/mocks/handlers` и переиспользуются.


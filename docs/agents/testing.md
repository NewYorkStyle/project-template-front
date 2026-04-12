## Тестирование

## Quick rules

- Если меняешь поведение своей логики — обнови/добавь unit-тест.
- Не тестируй поведение Ant Design / `@new_york_style/project-template-ui` — тестируй свою интеграцию.
- Для e2e используй page objects + fixtures, избегай “сырых” селекторов.

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
- **Fixtures**: `e2e/fixtures/index.ts` — расширение `test` с `authPage`, `homePage`, `profilePage`, `testUser`, подготовка пользователя через test API backend.
- **Изоляция сессии**: перед/после каждого теста очищать cookies через `context.clearCookies()`, использовать `test.use({ storageState: { cookies: [], origins: [] } })` (при необходимости учитывать **`localStorage`**, например ключ `userId` после login/register в браузере).

### AI должен

- Использовать page objects и фикстуры, а не сырые селекторы в spec-файлах.
- Для стабильности использовать `data-testid` из `src/shared/lib/constants/test-ids` (через реэкспорт `e2e/shared/constants`).

---

## Test API для E2E

- E2E работают через реальный backend и test endpoints (`/test/create-user`, `/test/grant-permissions`, `/test/delete-user`).
- Подготовку/очистку данных делать через helper'ы (`e2e/shared/test-api.ts`), не через route interception; **`userId` для фикстур** — из **тела ответа** test API (например `create-user`), в UI-сценариях после регистрации можно читать **`localStorage.getItem('userId')`**, не из cookies.
- Для OTP в test-окружении использовать фиксированный код `123456`.

## Чек-лист

- [ ] Изменение поведения покрыто unit-тестом (если затрагивает логику).
- [ ] E2E использует page objects/fixtures и стабильные `data-testid`.
- [ ] E2E не используют моки API и route interception.
- [ ] Между e2e-тестами не протекает сессия (cookies/storage state очищаются).


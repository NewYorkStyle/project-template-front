# Документация для AI-агентов (точка входа)

## Quick rules

- **Пиши по-русски**; термины (API/HTTP/SQL) — по-английски.
- **Scope**: изменения только в `src/`, `e2e/`, `tools/`.
- **FSD + import zones**: соблюдать `import/no-restricted-paths` из `eslint.config.mjs` (см. [architecture.md](./architecture.md)).
- **Public API**: импортируй через баррели/алиасы, не из глубины чужого слайса (см. [public-api.md](./public-api.md)).
- **API**: Orval generated hooks использовать напрямую; не использовать старый `api` из `@shared` (см. [api.md](./api.md)).
- **DoD**: перед завершением — свериться с чеклистом (см. [definition-of-done.md](./definition-of-done.md)).
- **Не расширяй scope**: без запроса — без широких рефакторингов (см. [rules.md](./rules.md)).

## Как использовать AI

- Для любой задачи сначала выбери раздел:
  - **архитектура/импорты** → [architecture.md](./architecture.md)
  - **баррели/алиасы** → [public-api.md](./public-api.md)
  - **Orval/hooks/DTO/zod** → [api.md](./api.md)
  - **формы** → [forms.md](./forms.md)
  - **тесты/e2e** → [testing.md](./testing.md)
- Перед финалом сверяйся с **DoD**.

## Чек-лист (перед изменениями)

- [ ] Понимаю слой/границы FSD и зоны импортов.
- [ ] Понимаю публичные экспорты (`index.ts`) и корректные пути импорта.
- [ ] Для API выбраны **generated hooks**, а не ручной HTTP.
- [ ] Нет выхода за scope (`src/`, `e2e/`, `tools/`).

## Оглавление

- [architecture.md](./architecture.md) — FSD слои, роли, import zones
- [public-api.md](./public-api.md) — `index.ts`, баррели, алиасы, правила импортов
- [code-generation.md](./code-generation.md) — структура слайсов/сегментов, правила файлов, эталоны
- [styles.md](./styles.md) — SCSS Modules, глобальные стили, design tokens
- [api.md](./api.md) — Orval, generated hooks, DTO/zod, паттерны вызовов
- [forms.md](./forms.md) — react-hook-form + zod, схемы и типы, локализация
- [state.md](./state.md) — MobX vs React Query
- [testing.md](./testing.md) — unit (Jest/RTL) + e2e (Playwright), page objects, mocks
- [tools.md](./tools.md) — `tools/` генераторы и webpack плагины
- [rules.md](./rules.md) — ограничения, антипаттерны, правила выбора
- [definition-of-done.md](./definition-of-done.md) — DoD / Definition of Done


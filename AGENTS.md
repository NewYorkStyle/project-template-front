# AGENTS.md — правила для AI (Cursor / Copilot / ChatGPT)

Документация по правилам работы AI-агента вынесена в модульный набор файлов: `docs/agents/`.

## Quick rules

- **Пиши по-русски**; термины (API/HTTP/SQL) — по-английски. Комментарии и JSDoc — на русском.
- **Новый код**: предпочитай **стрелочные функции**; стили компонентов — **`*.module.scss`** (см. `docs/agents/rules.md`).
- **Scope**: основной код — `src/`, `e2e/`, `tools/`; конфиги репозитория, CI и `docs/agents/**` — когда задача это требует (см. `docs/agents/rules.md`).
- **FSD + import zones**: соблюдать `import/no-restricted-paths` (см. `docs/agents/architecture.md`).
- **Public API**: импортируй через баррели/алиасы, не из глубины чужого слайса (см. `docs/agents/public-api.md`).
- **API**: Orval generated hooks использовать напрямую; не использовать старый `api` из `@shared` (см. `docs/agents/api.md`).
- **DoD**: перед завершением — свериться с `docs/agents/definition-of-done.md`.

## Как использовать AI

- Открой `docs/agents/index.md` и перейди в нужный раздел.
- Если задача про API/хуки/DTO/zod — начни с `docs/agents/api.md`.
- Если задача про импорты/слои — начни с `docs/agents/architecture.md`.

## Чек-лист (перед изменениями)

- [ ] Scope соблюдён: продуктовый код в `src/`, `e2e/`, `tools/`; прочие каталоги — только по необходимости задачи (см. `docs/agents/rules.md`).
- [ ] Импорты не нарушают FSD/import zones.
- [ ] Для API использую Orval generated hooks и паттерны `mutate({ data })` / `enabled:false + refetch()`.

## Точка входа (полная документация)

- `docs/agents/index.md`

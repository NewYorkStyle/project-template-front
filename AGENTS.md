# AGENTS.md — правила для AI (Cursor / Copilot / ChatGPT)

Документация по правилам работы AI-агента вынесена в модульный набор файлов: `docs/agents/`.

## Quick rules

- **Пиши по-русски**; термины (API/HTTP/SQL) — по-английски.
- **Scope**: изменения только в `src/`, `e2e/`, `tools/`.
- **FSD + import zones**: соблюдать `import/no-restricted-paths` (см. `docs/agents/architecture.md`).
- **Public API**: импортируй через баррели/алиасы, не из глубины чужого слайса (см. `docs/agents/public-api.md`).
- **API**: Orval generated hooks использовать напрямую; не использовать старый `api` из `@shared` (см. `docs/agents/api.md`).
- **DoD**: перед завершением — свериться с `docs/agents/definition-of-done.md`.

## Как использовать AI

- Открой `docs/agents/index.md` и перейди в нужный раздел.
- Если задача про API/хуки/DTO/zod — начни с `docs/agents/api.md`.
- Если задача про импорты/слои — начни с `docs/agents/architecture.md`.

## Чек-лист (перед изменениями)

- [ ] Работаю в рамках `src/`, `e2e/`, `tools/`.
- [ ] Импорты не нарушают FSD/import zones.
- [ ] Для API использую Orval generated hooks и паттерны `mutate({ data })` / `enabled:false + refetch()`.

## Точка входа (полная документация)

- `docs/agents/index.md`

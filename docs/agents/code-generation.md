## Структура папок и генерация кода

## Quick rules

- Сначала выбери **слой FSD** и проверь зоны импортов (см. [architecture.md](./architecture.md)).
- Используй сегменты `ui/model/lib/types` и закрывай публичный API через `index.ts` (см. [public-api.md](./public-api.md)).
- Не создавай `api/` сегмент для “ручных” HTTP/эндпоинтов — Orval hooks использовать напрямую (см. [api.md](./api.md)).
- Файлы/папки — `kebab-case`, компоненты — `*.tsx` + `*.module.scss`.
- Новые функции и компоненты — **стрелочные**; комментарии — **на русском** (см. раздел «Стиль кода» в [rules.md](./rules.md)).

## Как использовать AI

- Если добавляешь новый слайс/компонент — сверяйся с эталонами в таблице ниже.
- Если сомневаешься, где разместить код — выбери ближайший существующий паттерн в репозитории и повтори.

Фактическая схема зафиксирована в **`eslint.folder-structure.mjs`** (правило `project-structure/folder-structure`).

### Новая feature / entity / widget / page (слайс)

Внутри слайса допустимы сегменты: **`ui/`**, **`api/`**, **`model/`**, **`lib/`**, **`types/`**, плюс корневые файлы слайса и **`__tests__/`**.

Для каждого сегмента: **`index.ts`** (barrel), файлы в **`kebab-case`**: `*.tsx`, `*.module.scss`, вложенные папки с тем же паттерном.

Минимальный набор для новой фичи (по необходимости):

- `ui/` — компоненты
- `model/` — локальное состояние (если нужно)
- `api/` — только если нужно собрать/композировать несколько generated hooks в один сценарий (без прямых вызовов HTTP и без дубля сгенерированных эндпоинтов). В большинстве случаев **не нужен** — используйте Orval hooks напрямую (см. [api.md](./api.md)).
- `lib/` — утилиты
- `types/` — типы
- **`index.ts`** в корне слайса — реэкспорт публичного API

Эталон: `src/features/auth/` (реэкспортирует `ui`, а API берётся напрямую из generated endpoints — в импортах `@api/endpoints/*`).

### Новый компонент в сегменте `ui`

- `component-name.tsx`
- `component-name.module.scss` (стили — CSS Modules; см. [styles.md](./styles.md))
- `index.ts` в папке компонента
- Тесты: рядом в `__tests__/component-name.test.tsx` или `component-name.test.tsx` (см. [testing.md](./testing.md))

Эталон: `src/features/auth/ui/sign-in/`, `src/shared/ui/button/`.

### Эталонные паттерны (Reference)

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

## Чек-лист

- [ ] Слой и сегмент выбраны корректно.
- [ ] Имена файлов/папок — `kebab-case`, стили — `*.module.scss`.
- [ ] Есть нужные `index.ts` для публичного API (если требуется).
- [ ] API берётся через Orval hooks, а не ручной HTTP.


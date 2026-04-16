## Архитектура и слои FSD (`src/`)

## Quick rules

- **Определи слой** (app/pages/widgets/features/entities/shared) до начала правок.
- **Проверь зоны импортов** (`import/no-restricted-paths`) — иначе сборка/линтер упадут.
- **Не нарушай FSD**: не тащи зависимости “вверх” из запрещённых слоёв.
- **`app` может импортировать всё**, но остальные слои — с ограничениями ниже.

## Как использовать AI

- Если задача про “почему импорт запрещён” — смотри таблицу зон и сравни **слой файла-назначения** и **слой источника**.
- Если нужно спроектировать размещение нового кода — сначала выбери **слой**, затем сегмент (`ui/model/lib/types`) по правилам из [code-generation.md](./code-generation.md).

### Слои

| Слой         | Роль                                                                                | Примеры в репозитории                                                                   |
| ------------ | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **app**      | Инициализация приложения, провайдеры, роутинг, глобальные стили entry               | `src/app/app.tsx`, `src/app/model/providers/`, `src/app/lib/router/`, `src/app/styles/` |
| **pages**    | Страницы — композиция виджетов и фич, без бизнес-логики                             | `src/pages/auth/`, `src/pages/home/`, `src/pages/profile/`                              |
| **widgets**  | Крупные блоки UI из нескольких фич/сущностей                                        | `src/widgets/app-header/`                                                               |
| **features** | Пользовательские сценарии (форма, действие)                                         | `src/features/auth/`, `src/features/profile/`                                           |
| **entities** | Бизнес-сущности, локальные хуки и модели                                            | `src/entities/user/`, `src/entities/params/`                                            |
| **shared**   | Переиспользуемый код без привязки к продукту: UI-kit обёртки, API клиент, константы, сгенерированные SCSS-переменные | `src/shared/ui/`, `src/shared/lib/`, `src/shared/model/`, `src/shared/styles/` (`variables.scss`) |

### Роутинг (`src/app/lib/router/`)

- **Сегмент**: `lib` — конфигурация маршрутов, обёртки доступа и вспомогательная логика; не `pages` (страницы лежат в `src/pages/`).
- **Файлы**: `router.tsx` (дерево `Routes`), `public-route.tsx` / `protected-route.tsx` (guards поверх `useAuth`), `session-unresolved.ts` — общая функция **`isSessionUnresolved`**, чтобы не дублировать условие.
- **Сессия**: пока по cookie пользователь «вошёл», но **`GET /users/me`** ещё не зафиксировал ни успех (`sessionConfirmed`), ни ошибку (`sessionError`), оба guard показывают **полноэкранный спиннер** (включая промежуток **idle→pending** у React Query). Иначе: **PublicRoute** — редирект уже вошедшего на `from` или home; **ProtectedRoute** — контент при подтверждённой сессии, `Result` при ошибке проверки, иначе редирект на auth.

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

## Чек-лист (перед PR / перед завершением)

- [ ] Определён слой файла и допустимые зависимости.
- [ ] Импорты не нарушают зоны.


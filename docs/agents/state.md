## Состояние: MobX vs React Query

## Quick rules

- **React Query** — всё серверное: query/mutation/cache/invalidate.
- **MobX** — глобальное UI/модалки/флаги.
- Не смешивай ответственность: не делай “серверный кеш” в MobX.

## Как использовать AI

- Если задача “данные с сервера” — делай через Orval hooks + React Query.
- Если задача “открыть модалку/переключить тему/флаг” — используй текущие MobX-паттерны проекта.

| Инструмент      | Назначение в проекте                                                                                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **React Query** | Серверное состояние: мутации, `invalidateQueries`, `setQueryData` (см. `QueryProvider` в `src/app/model/providers/query-provider.tsx`)                                                    |
| **MobX**        | Локальное реактивное UI-состояние: `src/shared/model/app-store.ts`, `src/shared/lib/modal/modal-service.ts`, компоненты с `observer` (`src/app/ui/app-layout/`, `src/widgets/app-header/`) |
| **React state** | Допустимо для изолированных хуков без глобальной реактивности (например `src/entities/user/lib/use-auth.ts` — флаг «залогинен» через cookie `isUserLoggedIn` + `useState`; **идентификатор пользователя** — только `src/shared/lib/authStorage.ts` → `localStorage`, не из JS-доступных cookies) |

Не смешивать ответственность: запросы и кеш — React Query; глобальные UI-флаги/модалки — существующие MobX-паттерны проекта.

## Чек-лист

- [ ] Серверные данные/мутации реализованы через React Query.
- [ ] Глобальные UI-состояния не превращены в серверный кеш.


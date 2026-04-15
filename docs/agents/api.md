## API (Orval, generated hooks, паттерны)

## Quick rules

- Используй **generated hooks** из `src/shared/api/generated/endpoints/*` напрямую (в импортах — алиас **`@api`**, например `@api/endpoints/auth`, `@api/zod/auth.schema`).
- **Mutation** всегда: `mutate({ data: dto })`.
- **Query по клику**: `enabled:false` + `await refetch()`.
- Не используй `api` из `@shared` и не дублируй эндпоинты вручную.
- DTO/типы бери из `generated/model`, схемы — из `generated/zod` (и расширяй через `.extend(...)`).

## Как использовать AI

- Для каждого вызова API сначала найди соответствующий generated hook (`use*Controller*`) и используй его напрямую.
- Если нужно “сохранить” старый `queryKey` (например `['permissions']`) — задавай `queryKey` в `options.query`.
- Если форма валидируется zod — по возможности базируйся на generated `...Body` и расширяй локальными сообщениями.

### Источник истины и расположение

- **Источник истины для API**: Orval (OpenAPI → generated endpoints + types + zod).
- **Импорты в коде**: алиас **`@api`** → `shared/api/generated` (например `@api/endpoints/...`, `@api/zod/...`, `@api/model/...`).
- **Generated hooks**: `src/shared/api/generated/endpoints/*.ts` — использовать **напрямую** в `ui`/`model`/`lib` по месту.
- **HTTP client**: `src/shared/api/client/instance.ts` (`request`, axios instance, interceptors, `setOnLogout`).
- **Types / DTO**: `src/shared/api/generated/model/*`.
- **Zod schemas**: `src/shared/api/generated/zod/*.schema.ts` — в своих схемах используйте `.extend(...)`, чтобы сохранить локализованные сообщения, но не расходиться с DTO.

### Запрещено / нежелательно

- Не использовать `api` из `@shared` (устарело после миграции на Orval).
- Не дублировать эндпоинты в `src/features/*/api` / `src/entities/*/api`, если они уже есть в generated endpoints.
- Не выносить «ручные» обёртки над `/auth/*`, `/users/*`, `/common/params/*` и т.п. — вместо этого берите `useAuthController*`, `useUsersController*`, `useParamsController*` и т.д.

### Паттерны вызовов (Orval)

- **Mutation**: `mutate({ data: dto })`
- **Query по клику**: `useXxx({ query: { enabled: false } })` + `await refetch()`

### Примеры (реальные пути)

- Generated hooks (Orval): `src/shared/api/generated/endpoints/auth.ts` — `useAuthControllerSignIn`, `useAuthControllerSignUp`, `useAuthControllerLogout`, ...
- `src/features/auth/ui/sign-in/sign-in.tsx` — использование `useAuthControllerSignIn`

### Авторизация и `userId`

- Успешные ответы **sign-in / sign-up** (DTO `AuthSignOkResponseDto` в `generated/model`) содержат **`userId`** в теле JSON; токены сессии — в **httpOnly** cookies (фронт их не читает).
- Для клиентской логики и тестов **`userId` хранится только в `localStorage`** через **`authStorage`** (`src/shared/lib/authStorage.ts`: `setUserId` после успешной мутации, `clear` при logout и при `setOnLogout` в axios interceptor).
- Не читать и не очищать `userId` через `js-cookie` / `document.cookie`.

## Чек-лист

- [ ] Нет импортов/вызовов `api` из `@shared`.
- [ ] Все мутации вызываются как `mutate({ data: ... })`.
- [ ] “Запрос по кнопке” сделан через `enabled:false + refetch()`, а не через фейковую мутацию.
- [ ] Типы/DTO/zod берутся из `shared/api/generated/*` через импорты `@api/...` (или согласованы с ними).


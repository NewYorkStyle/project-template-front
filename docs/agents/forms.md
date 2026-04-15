## Формы и валидация

## Quick rules

- Схема — в `model/*schema.ts`, принимает `t` для локализованных сообщений.
- Тип формы — через `z.infer<ReturnType<typeof createXSchema>>` в `types/`.
- В UI используй `FormItem` (react-hook-form-antd), submit через `handleSubmit`.
- Не дублируй валидацию в двух местах (zod — источник истины).
- Для API-форм по возможности базируйся на generated zod `...Body` и расширяй.

## Как использовать AI

- Если меняешь поля формы — сначала обнови schema, затем типы, затем UI.
- Если форма отправляет DTO — проверь соответствие `mutate({ data })` и убери “лишние” поля (например `passwordConfirm`).
- Для согласования с backend — сверяйся с `shared/api/generated/zod/*.schema.ts` и `shared/api/generated/model/*` (в коде — импорты `@api/zod/...`, `@api/model/...`).

- Базовый стек форм: **`react-hook-form` + `react-hook-form-antd` + `zod`**.
- Валидация для feature-форм выносится в `model/*schema.ts`:
  - schema-фабрика принимает `t` из `react-i18next` (`createXSchema(t)`), чтобы сообщения были локализованы.
- Типы значений формы выводятся из схемы и лежат в `types/`:
  - `type TXFormValues = z.infer<ReturnType<typeof createXSchema>>`.
- В `ui/*.tsx`:
  - `FormItem` вместо `Form.Item` для контролируемых полей;
  - submit-обработчик в стиле `onSubmit` + `handleSubmit`.
- Не дублировать правила валидации одновременно в `rules` и `zod` — источник истины должен быть один (схема).

### Связь с Orval / generated zod

Если для endpoint есть generated zod-схема тела (`...Body`), используйте её как базу и расширяйте:

- `SomeControllerSomeActionBody.extend({ ... })`

Подробности и общие паттерны см. в [api.md](./api.md).

## Чек-лист

- [ ] Схема использует `t` и не содержит дублирующих правил.
- [ ] Тип формы выводится из схемы (`z.infer`), а не дублируется вручную.
- [ ] Вызов API соответствует Orval паттернам (`mutate({ data })`).


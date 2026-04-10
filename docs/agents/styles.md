## Стили (SCSS, CSS Modules, глобальные)

## Quick rules

- Оформление — через классы и SCSS Modules, **без** inline-стилей.
- Сгенерированные файлы (`variables.scss`, `global.scss`) не править вручную, если источник правды — `design-tokens.ts`.
- В TS используй `designTokens`, в стилях — SCSS-переменные из `variables.scss` и/или `var(--...)` из глобального слоя.

## Как использовать AI

- Если нужно изменить тему/токены — правь `design-tokens.ts` и запускай генерацию (см. [tools.md](./tools.md)).
- Если нужно оформить компонент — добавь `*.module.scss` рядом и используй классы.

### Разделение файлов

| Файл | Роль |
| --- | --- |
| **`src/shared/styles/variables.scss`** | Генерируется: SCSS-переменные (`$spacing-*`, `$border-radius-*`, `$text-size-*`, `$breakpoint-*`). |
| **`src/app/styles/global.scss`** | Генерируется: сброс `body`, темы как **CSS custom properties** в `:root` и `[data-theme="dark"]`. |
| **`*.module.scss`** | Локальные классы компонента (CSS Modules в Vite для имён `*.module.scss`, см. [документацию Vite — CSS](https://vite.dev/guide/features.html#css)). |

- **Точка входа глобальных стилей**: `src/app/app.tsx` импортирует `./styles/global.scss` один раз на приложение.
- **Переменные в модулях**: в начале каждого `*.module.scss` добавь явный импорт (глобального инжекта через `additionalData` в Vite сейчас нет):

```scss
@use '@/shared/styles/variables' as *;
```

Дальше в файле доступны `$spacing-sm`, `$breakpoint-tablet` и т.д. Алиас `@` указывает на `src/` (как в `vite.config.ts` и `tsconfig`).

### AI не должен

- Использовать inline-стили (`style={{}}`) для оформления — только классы и SCSS modules / глобальные правила по принятой схеме.
- Копировать значения токенов в модули вместо переменных/CSS custom properties из сгенерированных файлов.
- Редактировать `global.scss` / `variables.scss` вручную, если изменение должно идти от дизайн-токенов — править `design-tokens.ts` и перегенерировать.

## Design tokens

- Источник истины: **`src/shared/lib/constants/design-tokens.ts`** (`TDesignTokens`, `designTokens`).
- SCSS-переменные для отступов, радиусов, типографики и брейкпоинтов — в сгенерированном **`src/shared/styles/variables.scss`**.
- Цвета темы — как **`var(--...)`** в стилях; сами значения задаются в сгенерированном **`src/app/styles/global.scss`** (`:root`, `[data-theme="dark"]`) из палитр `colors.light` / `colors.dark`.

Правило: в TS использовать `designTokens`; в стилях — сгенерированные переменные / `var(--...)` из глобального слоя, а не «магические» hex для семантики, уже покрытой токенами.

## Чек-лист

- [ ] Нет inline-стилей для визуала.
- [ ] Используются SCSS Modules и токены/переменные, а не “магические” значения.
- [ ] Глобальные стили не правились вручную, если должны генерироваться.


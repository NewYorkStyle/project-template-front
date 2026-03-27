## Стили (SCSS, CSS Modules, глобальные)

## Quick rules

- Оформление — через классы и SCSS Modules, **без** inline-стилей.
- Глобальные стили/переменные — не править вручную, если они генерируются.
- В TS используй `designTokens`, в стилях — сгенерированные переменные / `var(--...)`.

## Как использовать AI

- Если нужно изменить тему/токены — правь `design-tokens.ts` и запускай генерацию (см. [tools.md](./tools.md)).
- Если нужно оформить компонент — добавь `*.module.scss` рядом и используй классы.

- **Компоненты**: `*.module.scss` рядом с компонентом. Webpack: `css-loader` с `modules.auto: true` (`webpack.config.js`).
- **Глобальные стили**: только через генерацию из токенов и entry-подключение. Точка входа: `src/app/app.tsx` импортирует `./styles/global.scss` (сгенерированный/поддерживаемый в связке с `generate-global-scss.ts`).
- Переменные для модулей: автоматически доступны благодаря `with-global-scss-resources` и `variables.scss`.

### AI не должен

- Использовать inline-стили (`style={{}}`) для оформления — только классы и SCSS modules / глобальные правила по принятой схеме.
- Копировать значения токенов в модули вместо переменных/CSS custom properties из сгенерированных файлов.
- Редактировать `global.scss` / `variables.scss` вручную, если изменение должно идти от дизайн-токенов — править `design-tokens.ts` и перегенерировать.

## Design tokens

- Источник истины: **`src/shared/lib/constants/design-tokens.ts`** (`TDesignTokens`, `designTokens`).
- SCSS: генерируется в `src/app/styles/variables.scss` (`$spacing-*`, `$border-radius-*`, `$text-size-*`, `$breakpoint-*`).
- Темы: CSS variables в `global.scss` (`:root`, `[data-theme="dark"]`) генерируются из палитр `colors.light` / `colors.dark`.

Правило: в TS использовать `designTokens`; в стилях — сгенерированные переменные / `var(--...)` из глобального слоя, а не «магические» hex для семантики, уже покрытой токенами.

## Чек-лист

- [ ] Нет inline-стилей для визуала.
- [ ] Используются SCSS Modules и токены/переменные, а не “магические” значения.
- [ ] Глобальные стили не правились вручную, если должны генерироваться.


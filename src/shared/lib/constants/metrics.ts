/**
 * Типы событий для аналитики.
 */
export enum E_METRICS_EVENTS {
  CLICK = 'click',
  SHOW = 'show',
  WEB_VITAL = 'web_vital',
}

/**
 * Список модулей, где может вызывать аналитика.
 */
export enum E_METRICS_NAMESPACES {
  PLACEHOLDER = 'placeholder',
  APP_HEADER = 'app-header',
  AUTH = 'auth',
  USER = 'user',
  PERFORMANCE = 'performance',
}

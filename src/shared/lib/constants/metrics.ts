/**
 * Типы событий для аналитики.
 */
export enum E_METRICS_EVENTS {
  CLICK = 'click',
  SHOW = 'show',
}

/**
 * Список модулей, где может вызывать аналитика.
 */
export enum E_METRICS_NAMESPACES {
  PLACEHOLDER = 'placeholder',
  APP_HEADER = 'app-header',
  AUTH = 'auth',
  USER = 'user',
}

/**
 * @prop {string} label Имя конкретного компонента (кнопка, дропдаун и т.п.).
 * @prop {E_METRICS_EVENTS} event Событие (click, show, ...).
 * @prop {string} namespace Пространство, в котором происходит событие.
 */
export type TMetricsEventProps = {
  label: string;
  event: E_METRICS_EVENTS;
  namespace: E_METRICS_NAMESPACES;
};

export type TMetricsProps = Omit<TMetricsEventProps, 'event'>;

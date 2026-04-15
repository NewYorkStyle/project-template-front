import {type E_METRICS_EVENTS, type E_METRICS_NAMESPACES} from '../constants';

export type TMetricsNamespace = E_METRICS_NAMESPACES | `tour-${string}`;

/**
 * @prop {string} label Имя конкретного компонента (кнопка, дропдаун и т.п.).
 * @prop {E_METRICS_EVENTS} event Событие (click, show, ...).
 * @prop {string} namespace Пространство, в котором происходит событие.
 */
export type TMetricsEventProps = {
  label: string;
  event: E_METRICS_EVENTS;
  namespace: TMetricsNamespace;
};

export type TMetricsProps = Omit<TMetricsEventProps, 'event'>;

export type TWebVitalEvent = {
  name: string;
  rating: string;
  navigationType: string;
};

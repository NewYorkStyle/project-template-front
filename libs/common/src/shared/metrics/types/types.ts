import {E_ANALYTIC_EVENTS, E_ANALYTIC_NAMESPACES} from '../../constants';

/**
 * @prop {string} label Имя конкретного компонента (кнопка, дропдаун и т.п.).
 * @prop {E_ANALYTIC_EVENTS} event Событие (click, show, ...).
 * @prop {string} namespace Пространство, в котором происходит событие.
 */
export type TAnalyticsEventProps = {
  label: string;
  event: E_ANALYTIC_EVENTS;
  namespace: E_ANALYTIC_NAMESPACES;
};

export type TAnalyticsProps = Omit<TAnalyticsEventProps, 'event'>;

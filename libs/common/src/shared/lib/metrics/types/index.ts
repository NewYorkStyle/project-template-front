import {E_ANALYTIC_EVENTS, E_ANALYTIC_NAMESPACES} from '../../../constants';

export type TAnalyticsEventProps = {
  label: string;
  event: E_ANALYTIC_EVENTS;
  namespace: E_ANALYTIC_NAMESPACES;
};

export type TAnalyticsProps = Omit<TAnalyticsEventProps, 'event'>;

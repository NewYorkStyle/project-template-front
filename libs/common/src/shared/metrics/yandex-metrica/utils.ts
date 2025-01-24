import {analyticsStore} from '../../../entities/stores/analytics-store';
import {E_ANALYTIC_EVENTS} from '../../constants';
import {TAnalyticsEventProps, TAnalyticsProps} from '../types/types';

export const sendEvent = (data: TAnalyticsEventProps) => {
  analyticsStore.sendYm(data);
};

export const sendClickEvent = (data: TAnalyticsProps) => {
  sendEvent({
    event: E_ANALYTIC_EVENTS.CLICK,
    label: data.label,
    namespace: data.namespace,
  });
};

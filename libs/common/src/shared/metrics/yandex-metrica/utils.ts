import {analyticsStore} from '../../../entities/stores/analytics-store';
import {TAnalyticsEventProps} from '../types/types';

export const sendEvent = (data: TAnalyticsEventProps) => {
  analyticsStore.sendYm(data);
};

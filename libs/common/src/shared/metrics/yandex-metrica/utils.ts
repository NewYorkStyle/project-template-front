import {analyticsStore} from '../../../entities/stores/analytics-store';
import {TAnalyticsProps} from '../types/types';

export const sendEvent = (data: TAnalyticsProps) => {
  analyticsStore.sendYm(data);
};

import {analyticsStore} from '../../../../features';
import {TAnalyticsEventProps} from '../types';

export const sendEvent = (data: TAnalyticsEventProps) => {
  analyticsStore.sendYm(data);
};

import {type TMetricsEventProps} from '../types';

import {metricsService} from './metrics-service';

export const sendEvent = (data: TMetricsEventProps) => {
  metricsService.sendEvent(data);
};

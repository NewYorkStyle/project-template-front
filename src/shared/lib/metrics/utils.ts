import {type TMetricsEventProps} from '../constants';

import {metricsService} from './metrics-service';

export const sendEvent = (data: TMetricsEventProps) => {
  metricsService.sendEvent(data);
};

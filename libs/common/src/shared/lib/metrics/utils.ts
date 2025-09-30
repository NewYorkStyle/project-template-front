import {metricsService} from './metrics-service';
import {TMetricsEventProps} from '../../constants';

export const sendEvent = (data: TMetricsEventProps) => {
  metricsService.sendEvent(data);
};

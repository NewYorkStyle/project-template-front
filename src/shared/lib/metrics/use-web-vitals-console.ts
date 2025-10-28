import {useEffect} from 'react';

import {onCLS, onINP, onFCP, onLCP, onTTFB, type Metric} from 'web-vitals';

import {E_METRICS_EVENTS, E_METRICS_NAMESPACES} from '../constants';
import {type TWebVitalEvent} from '../types/metrics';

import {sendEvent} from './utils';

export const useWebVitalsMetrics = (isEnabled: boolean = true) => {
  useEffect(() => {
    if (!isEnabled) return;

    const reportWebVital = (metric: Metric) => {
      const webVitalData: TWebVitalEvent = {
        name: metric.name,
        rating: metric.rating,
        navigationType: metric.navigationType,
      };

      // Отправляем в аналитические сервисы с метриками
      sendEvent({
        event: E_METRICS_EVENTS.WEB_VITAL,
        namespace: E_METRICS_NAMESPACES.PERFORMANCE,
        label: JSON.stringify(webVitalData),
      });
    };

    // Инициализируем отслеживание
    onCLS(reportWebVital);
    onINP(reportWebVital);
    onFCP(reportWebVital);
    onLCP(reportWebVital);
    onTTFB(reportWebVital);
  }, [isEnabled]);
};

import {type TMetricsEventProps} from '../types/metrics';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ym: any;
  }
}

class MetricsService {
  private ymInited = false;
  private ymCounter = 0;

  setYmCounter(ymCounter: string) {
    this.ymCounter = Number(ymCounter);
  }

  initYm() {
    if (!this.ymInited) {
      window.ym(this.ymCounter, 'init', {
        accurateTrackBounce: true,
        clickmap: true,
        trackLinks: true,
        webvisor: true,
      });
      this.ymInited = true;
    }
  }

  sendEvent(data: TMetricsEventProps) {
    if (!this.ymInited) {
      // eslint-disable-next-line no-console
      console.warn('Yandex Metrica not initialized');
      return;
    }

    window.ym(this.ymCounter, 'params', {
      ...{[data.namespace]: {[data.event]: data.label}},
    });
  }
}

export const metricsService = new MetricsService();

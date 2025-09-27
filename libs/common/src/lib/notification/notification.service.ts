type TNotificationType = 'success' | 'info' | 'warning' | 'error';

type TNotificationConfig = {
  message: string;
  description?: string;
  duration?: number;
};

class NotificationService {
  private static instance: NotificationService;
  private notificationApi: any = null;

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Метод для установки API из React контекста
  setNotificationApi(api: any) {
    this.notificationApi = api;
  }

  // Базовый метод для показа уведомлений
  private showNotification(
    type: TNotificationType,
    config: TNotificationConfig
  ) {
    if (this.notificationApi) {
      this.notificationApi[type]({
        description: config.description,
        duration: config.duration || 4.5,
        message: config.message,
        placement: 'topRight',
      });
    } else {
      // Fallback для использования вне React контекста (с предупреждением)
      console.warn('Notification API not initialized, using static method');
      import('antd').then(({notification}) => {
        notification[type]({
          description: config.description,
          duration: config.duration || 4.5,
          message: config.message,
          placement: 'topRight',
        });
      });
    }
  }

  // Специфичные методы для разных типов уведомлений
  success(message: string, description?: string, duration?: number) {
    this.showNotification('success', {description, duration, message});
  }

  error(message: string, description?: string, duration?: number) {
    this.showNotification('error', {description, duration, message});
  }

  warning(message: string, description?: string, duration?: number) {
    this.showNotification('warning', {description, duration, message});
  }

  info(message: string, description?: string, duration?: number) {
    this.showNotification('info', {description, duration, message});
  }

  // Очистка всех уведомлений
  destroy() {
    if (this.notificationApi) {
      this.notificationApi.destroy();
    } else {
      import('antd').then(({notification}) => {
        notification.destroy();
      });
    }
  }
}

export const notificationService = NotificationService.getInstance();

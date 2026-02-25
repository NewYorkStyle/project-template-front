import React, {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
} from 'react';

import {notification} from 'antd';

import {notificationService} from './notification-service';

type TNotificationContextType = {
  showNotification: (
    type: 'success' | 'info' | 'warning' | 'error',
    message: string,
    description?: string,
    duration?: number
  ) => void;
  success: (message: string, description?: string, duration?: number) => void;
  error: (message: string, description?: string, duration?: number) => void;
  warning: (message: string, description?: string, duration?: number) => void;
  info: (message: string, description?: string, duration?: number) => void;
};

const NotificationContext = createContext<TNotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    notificationService.setNotificationApi(api);
    return () => {
      notificationService.setNotificationApi(null);
    };
  }, [api]);

  const showNotification = (
    type: 'success' | 'info' | 'warning' | 'error',
    title: string,
    description?: string,
    duration = 4.5
  ) => {
    api[type]({
      description,
      duration,
      title,
      placement: 'topRight',
    });
  };

  const success = (message: string, description?: string, duration?: number) =>
    showNotification('success', message, description, duration);

  const error = (message: string, description?: string, duration?: number) =>
    showNotification('error', message, description, duration);

  const warning = (message: string, description?: string, duration?: number) =>
    showNotification('warning', message, description, duration);

  const info = (message: string, description?: string, duration?: number) =>
    showNotification('info', message, description, duration);

  const value: TNotificationContextType = {
    error,
    info,
    showNotification,
    success,
    warning,
  };

  return (
    <NotificationContext.Provider value={value}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): TNotificationContextType => {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }

  return context;
};

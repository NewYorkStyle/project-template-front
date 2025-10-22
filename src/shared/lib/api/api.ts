/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';

// Базовый клиент API
const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Типы для очереди запросов
type TQueuedRequest = {
  resolve: (value: any) => void;
  reject: (error: any) => void;
  config: AxiosRequestConfig;
  endpoint: string;
  method: 'get' | 'post';
  data?: any;
};

// Глобальные переменные для управления состоянием
let isRefreshing = false;
let failedQueue: TQueuedRequest[] = [];

// Функция для обработки очереди неудачных запросов
const processQueue = (error: any) => {
  failedQueue.forEach((queued) => {
    if (error) {
      queued.reject(error);
    } else {
      // Выполняем оригинальный запрос с обновленными куками
      apiClient(queued.config).then(queued.resolve).catch(queued.reject);
    }
  });

  failedQueue = [];
};

let logout = (): void => {
  console.warn('LogOut callback not set. Use setOnLogOut to configure it.');
};

export const setOnLogout = (callback: () => void) => {
  logout = callback;
};

// Функция обновления токена
const refreshToken = async (): Promise<void> => {
  await apiClient.get('auth/refresh');
};

// Интерцептор для обработки ответов и ошибок
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Если ошибка 401 и это не запрос обновления токена
    if (
      error.response?.status === 401 &&
      !originalRequest.url?.includes('auth/refresh')
    ) {
      // Если запрос уже был повторен, отклоняем его
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      // Если уже происходит обновление токена, добавляем запрос в очередь
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            config: originalRequest,
            data: (originalRequest as any).data,
            endpoint: originalRequest.url || '',
            method: (originalRequest.method as 'get' | 'post') || 'get',
            reject,
            resolve,
          });
        });
      }

      isRefreshing = true;

      try {
        // Пытаемся обновить токен - сервер обновит httpOnly куки
        await refreshToken();

        // Обрабатываем очередь с обновленными куками
        processQueue(null);
        isRefreshing = false;

        // Повторяем оригинальный запрос с обновленными куками
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Если обновление токена не удалось, выходим из системы
        processQueue(refreshError);
        isRefreshing = false;
        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const api = {
  get: async <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.get<T>(endpoint, config);
    return response.data;
  },

  post: async <T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await apiClient.post<T>(endpoint, data, config);
    return response.data;
  },
};

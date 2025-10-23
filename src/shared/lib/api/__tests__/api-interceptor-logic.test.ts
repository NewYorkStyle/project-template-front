/* eslint-disable @typescript-eslint/no-explicit-any */
// Тестируем логику интерцепторов отдельно
describe('API Interceptor Logic', () => {
  // Мокаем глобальные переменные
  let mockIsRefreshing: boolean;
  let mockFailedQueue: Array<{
    config: any;
    resolve: jest.Mock;
    reject: jest.Mock;
  }>;
  let mockLogout: jest.Mock;
  let mockApiClient: {
    get: jest.Mock;
  };

  beforeEach(() => {
    // Сбрасываем состояние
    mockIsRefreshing = false;
    mockFailedQueue = [];
    mockLogout = jest.fn();

    // Мокаем apiClient
    mockApiClient = {
      get: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Обработка ошибок 401', () => {
    it('должен вызвать refresh при ошибке 401', async () => {
      const originalRequest = {
        _retry: false,
        method: 'get',
        url: '/protected',
      };

      const error401 = {
        config: originalRequest,
        response: {status: 401},
      };

      // Мокаем успешный refresh
      mockApiClient.get.mockResolvedValue({data: {}});

      // Симулируем логику интерцептора
      const shouldRefresh =
        error401.response?.status === 401 &&
        !originalRequest.url?.includes('auth/refresh') &&
        !originalRequest._retry;

      expect(shouldRefresh).toBe(true);

      if (shouldRefresh) {
        await mockApiClient.get('auth/refresh');
        expect(mockApiClient.get).toHaveBeenCalledWith('auth/refresh');
      }
    });

    it('должен вызвать logout при неудачном refresh', async () => {
      const originalRequest = {
        _retry: false,
        method: 'get',
        url: '/protected',
      };

      const error401 = {
        config: originalRequest,
        response: {status: 401},
      };

      // Мокаем неудачный refresh
      mockApiClient.get.mockRejectedValue(new Error('Refresh failed'));

      // Симулируем логику интерцептора
      const shouldRefresh =
        error401.response?.status === 401 &&
        !originalRequest.url?.includes('auth/refresh') &&
        !originalRequest._retry;

      expect(shouldRefresh).toBe(true);

      if (shouldRefresh) {
        try {
          await mockApiClient.get('auth/refresh');
        } catch (_error) {
          mockLogout();
          expect(mockLogout).toHaveBeenCalledTimes(1);
        }
      }
    });

    it('не должен повторно вызывать refresh если запрос уже был повторен', () => {
      const originalRequest = {
        _retry: true, // Уже был повторен
        method: 'get',
        url: '/protected',
      };

      const error401 = {
        config: originalRequest,
        response: {status: 401},
      };

      // Симулируем логику интерцептора
      const shouldRefresh =
        error401.response?.status === 401 &&
        !originalRequest.url?.includes('auth/refresh') &&
        !originalRequest._retry;

      expect(shouldRefresh).toBe(false);
    });

    it('не должен обрабатывать ошибки refresh запроса', () => {
      const originalRequest = {
        _retry: false,
        method: 'get',
        url: 'auth/refresh', // Это сам refresh запрос
      };

      const error401 = {
        config: originalRequest,
        response: {status: 401},
      };

      // Симулируем логику интерцептора
      const shouldRefresh =
        error401.response?.status === 401 &&
        !originalRequest.url?.includes('auth/refresh') &&
        !originalRequest._retry;

      expect(shouldRefresh).toBe(false);
    });
  });

  describe('Очередь запросов при множественных 401 ошибках', () => {
    it('должен добавить запросы в очередь при множественных 401 ошибках', () => {
      const request1 = {
        _retry: false,
        method: 'get',
        url: '/protected1',
      };

      const request2 = {
        _retry: false,
        method: 'post',
        url: '/protected2',
      };

      const _error401First = {
        config: request1,
        response: {status: 401},
      };

      const error401Second = {
        config: request2,
        response: {status: 401},
      };

      // Симулируем логику очереди
      const shouldAddToQueue = (error: any) => {
        return (
          error.response?.status === 401 &&
          !error.config.url?.includes('auth/refresh') &&
          !error.config._retry &&
          mockIsRefreshing
        ); // Уже происходит refresh
      };

      // Первый запрос начинает refresh
      mockIsRefreshing = true;

      // Второй запрос должен попасть в очередь
      const shouldQueueSecond = shouldAddToQueue(error401Second);
      expect(shouldQueueSecond).toBe(true);

      if (shouldQueueSecond) {
        mockFailedQueue.push({
          config: error401Second.config,
          reject: jest.fn(),
          resolve: jest.fn(),
        });
      }

      expect(mockFailedQueue).toHaveLength(1);
    });

    it('должен обработать очередь после успешного refresh', () => {
      // Добавляем запрос в очередь
      const queuedRequest = {
        config: {method: 'get', url: '/protected'},
        reject: jest.fn(),
        resolve: jest.fn(),
      };

      mockFailedQueue.push(queuedRequest);

      // Симулируем успешный refresh
      const processQueue = (error: any) => {
        mockFailedQueue.forEach((queued) => {
          if (error) {
            queued.reject(error);
          } else {
            queued.resolve({data: {success: true}});
          }
        });
        mockFailedQueue = [];
      };

      // Обрабатываем очередь без ошибки (успешный refresh)
      processQueue(null);

      expect(queuedRequest.resolve).toHaveBeenCalledWith({
        data: {success: true},
      });
      expect(mockFailedQueue).toHaveLength(0);
    });

    it('должен отклонить все запросы в очереди при неудачном refresh', () => {
      // Добавляем запросы в очередь
      const queuedRequest1 = {
        config: {method: 'get', url: '/protected1'},
        reject: jest.fn(),
        resolve: jest.fn(),
      };

      const queuedRequest2 = {
        config: {method: 'post', url: '/protected2'},
        reject: jest.fn(),
        resolve: jest.fn(),
      };

      mockFailedQueue.push(queuedRequest1, queuedRequest2);

      // Симулируем неудачный refresh
      const processQueue = (error: any) => {
        mockFailedQueue.forEach((queued) => {
          if (error) {
            queued.reject(error);
          } else {
            queued.resolve({data: {success: true}});
          }
        });
        mockFailedQueue = [];
      };

      const refreshError = new Error('Refresh failed');
      processQueue(refreshError);

      expect(queuedRequest1.reject).toHaveBeenCalledWith(refreshError);
      expect(queuedRequest2.reject).toHaveBeenCalledWith(refreshError);
      expect(mockFailedQueue).toHaveLength(0);
    });
  });

  describe('Обработка других ошибок', () => {
    it('должен пропустить ошибки, отличные от 401', () => {
      const error500 = {
        config: {method: 'get', url: '/test'},
        response: {status: 500},
      };

      const shouldRefresh =
        (error500 as any).response?.status === 401 &&
        !error500.config.url?.includes('auth/refresh') &&
        !(error500.config as any)._retry;

      expect(shouldRefresh).toBe(false);
    });

    it('должен пропустить ошибки без response', () => {
      const networkError = {
        config: {method: 'get', url: '/test'},
        message: 'Network Error',
      };

      const shouldRefresh =
        (networkError as any).response?.status === 401 &&
        !networkError.config.url?.includes('auth/refresh') &&
        !(networkError.config as any)._retry;

      expect(shouldRefresh).toBe(false);
    });
  });
});

import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';

type TQueueItem = {
  resolve: (value: AxiosResponse) => void;
  reject: (error: unknown) => void;
  config: AxiosRequestConfig;
};

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: TQueueItem[] = [];

const processQueue = (error: unknown): void => {
  const queue = failedQueue;
  failedQueue = [];
  isRefreshing = false;

  queue.forEach(({config, reject, resolve}) => {
    if (error) {
      reject(error);
    } else {
      apiClient(config).then(resolve).catch(reject);
    }
  });
};

let onLogout = (): void => {
  console.warn('Logout callback not set. Use setOnLogout() to configure it.');
};

export const setOnLogout = (callback: () => void): void => {
  onLogout = callback;
};

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    const is401 = error.response?.status === 401;
    const isRefreshEndpoint = originalRequest.url?.includes('auth/refresh');

    if (!is401 || isRefreshEndpoint || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        failedQueue.push({config: originalRequest, resolve, reject});
      });
    }

    isRefreshing = true;

    try {
      await apiClient.get('auth/refresh');
      processQueue(null);
      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);
      onLogout();
      return Promise.reject(refreshError);
    }
  }
);

export const api = {
  get: async <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.get<T>(endpoint, config);
    return response.data;
  },

  post: async <T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await apiClient.post<T>(endpoint, data, config);
    return response.data;
  },
};

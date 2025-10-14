/* eslint-disable no-console */
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';

const API_BASE_URL = process.env.API_URL;

if (!API_BASE_URL) {
  console.warn('API_URL is not defined');
}

type TRefreshSubscriber = {
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
  config: InternalAxiosRequestConfig;
};

class AuthInterceptor {
  private isRefreshing = false;
  private refreshSubscribers: TRefreshSubscriber[] = [];
  private onLogoutCallback: (() => void) | null = null;

  constructor(private axiosInstance: AxiosInstance) {
    this.setupInterceptors();
  }

  setOnLogout(callback: () => void) {
    this.onLogoutCallback = callback;
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        return this.handleResponseError(error);
      }
    );
  }

  private isRefreshRequest(config: InternalAxiosRequestConfig): boolean {
    return config.url?.includes('/auth/refresh') ?? false;
  }

  private isAuthError(status: number): boolean {
    return status === 401;
  }

  private addRefreshSubscriber(subscriber: TRefreshSubscriber) {
    this.refreshSubscribers.push(subscriber);
  }

  private onRefreshSuccess() {
    this.refreshSubscribers.forEach(({config, resolve}) => {
      this.axiosInstance(config)
        .then(resolve)
        .catch(() => {
          /* empty */
        });
    });
    this.refreshSubscribers = [];
  }

  private onRefreshFailure(error: unknown) {
    this.refreshSubscribers.forEach(({reject}) => {
      reject(error);
    });
    this.refreshSubscribers = [];

    if (this.onLogoutCallback) {
      this.onLogoutCallback();
    }
  }

  private async handleResponseError(error: AxiosError) {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (!this.isAuthError(error.response?.status ?? 0) || !originalRequest) {
      return Promise.reject(error);
    }

    if (this.isRefreshRequest(originalRequest)) {
      return Promise.reject(error);
    }

    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.addRefreshSubscriber({config: originalRequest, reject, resolve});
      });
    }

    this.isRefreshing = true;

    try {
      await this.axiosInstance.get('/auth/refresh');
      this.onRefreshSuccess();
      return this.axiosInstance(originalRequest);
    } catch (refreshError) {
      this.onRefreshFailure(refreshError);
      return Promise.reject(refreshError);
    } finally {
      this.isRefreshing = false;
    }
  }
}

// Создание экземпляра axios
const axiosApiInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// Инициализация перехватчика
const authInterceptor = new AuthInterceptor(axiosApiInstance);

export const setOnLogout = (callback: () => void) => {
  authInterceptor.setOnLogout(callback);
};

export const api = {
  get: async <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosApiInstance.get<T>(endpoint, config);
    return response.data;
  },
  post: async <T>(
    endpoint: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axiosApiInstance.post<T>(endpoint, data, config);
    return response.data;
  },
};

import axios, {AxiosError, AxiosInstance} from 'axios';

const API_BASE_URL = process.env.NX_PUBLIC_API_URL;

let onLogoutCallback: (() => void) | null = null;

export const setOnLogout = (callback: () => void) => {
  onLogoutCallback = callback;
};

const axiosApiInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;

axiosApiInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      if (isRefreshing) {
        return Promise.reject(error);
      }

      isRefreshing = true;

      try {
        await axiosApiInstance.get('/auth/refresh');

        if (originalRequest) {
          return axiosApiInstance(originalRequest);
        }
      } catch (refreshError) {
        if (onLogoutCallback) {
          onLogoutCallback();
        }
        // eslint-disable-next-line no-console
        console.error(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export const api = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await axiosApiInstance.get<T>(endpoint);
    return response.data;
  },
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await axiosApiInstance.post<T>(endpoint, data);
    return response.data;
  },
};

export {axiosApiInstance};

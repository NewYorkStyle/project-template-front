import {userStore} from '../../entities';
import {API_BASE_URL} from '../constants';
import axios, {AxiosError, AxiosInstance} from 'axios';

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
        await axiosApiInstance.get(`${API_BASE_URL}/auth/refresh`);

        if (originalRequest) {
          return axiosApiInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error(refreshError);
      } finally {
        userStore.isUserLogged = false;
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export const api = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await axiosApiInstance.get<T>(
      `${API_BASE_URL}${endpoint}`
    );

    return response.data;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await axiosApiInstance.post<T>(
      `${API_BASE_URL}${endpoint}`,
      data
    );

    return response.data;
  },
};

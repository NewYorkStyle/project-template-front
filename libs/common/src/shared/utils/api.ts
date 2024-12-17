import {API_BASE_URL} from '../constants';
import axios from 'axios';

export const api = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await axios.get<T>(
      `${API_BASE_URL}${endpoint[0] === '/' ? endpoint.substring(1) : endpoint}`
    );

    return response.data;
  },
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await axios.post<T>(
      `${API_BASE_URL}${endpoint[0] === '/' ? endpoint.substring(1) : endpoint}`,
      data
    );

    return response.data;
  },
};

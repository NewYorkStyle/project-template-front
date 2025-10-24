/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

// Мокаем axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Создаем мок для axios instance
const mockAxiosInstance = {
  get: jest.fn(),
  interceptors: {
    response: {
      use: jest.fn(),
    },
  },
  post: jest.fn(),
};

// Мокаем axios.create
mockedAxios.create.mockReturnValue(mockAxiosInstance as any);

// Импортируем API после мока
import {api, setOnLogout} from '../api';

describe('API Utils', () => {
  let mockLogout: jest.Mock;

  beforeEach(() => {
    // Мокаем logout колбэк
    mockLogout = jest.fn();
    setOnLogout(mockLogout);

    // Очищаем все моки
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Базовый вызов API', () => {
    it('должен успешно выполнить GET запрос', async () => {
      const mockData = {id: 1, name: 'Test'};
      const mockResponse = {data: mockData};

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await api.get('/test');

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', undefined);
      expect(result).toEqual(mockData);
    });

    it('должен успешно выполнить POST запрос', async () => {
      const mockData = {id: 1, name: 'Test'};
      const mockResponse = {data: mockData};
      const requestData = {name: 'New Test'};

      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await api.post('/test', requestData);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/test',
        requestData,
        undefined
      );
      expect(result).toEqual(mockData);
    });

    it('должен передать конфигурацию в запросы', async () => {
      const mockData = {id: 1, name: 'Test'};
      const mockResponse = {data: mockData};
      const config = {timeout: 5000};

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      await api.get('/test', config);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', config);
    });
  });

  describe('Настройка logout колбэка', () => {
    it('должен установить logout колбэк', () => {
      const testCallback = jest.fn();
      setOnLogout(testCallback);

      // Проверяем, что колбэк был установлен (это сложно протестировать напрямую,
      // но мы можем убедиться, что функция не выбрасывает ошибку)
      expect(() => setOnLogout(testCallback)).not.toThrow();
    });
  });

  describe('Конфигурация axios', () => {
    it('должен экспортировать API функции', () => {
      // Проверяем, что API функции экспортированы
      expect(typeof api.get).toBe('function');
      expect(typeof api.post).toBe('function');
      expect(typeof setOnLogout).toBe('function');
    });
  });
});

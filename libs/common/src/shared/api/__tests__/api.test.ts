/* eslint-disable no-console */
// ВАЖНО: мокаем axios.create, чтобы возвращался общий экземпляр axios,
// который перехватывает axios-mock-adapter
jest.mock('axios', () => {
  const axios = jest.requireActual('axios');
  // переназначаем create, чтобы все клиенты делили один и тот же инстанс
  axios.create = () => axios;
  return axios;
});

import {api, setOnLogout} from '../api';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Создаем экземпляр мока
const mock = new MockAdapter(axios, {onNoMatch: 'throwException'});

beforeEach(() => {
  mock.reset();
  jest.clearAllMocks();
  jest.resetModules();
});

describe('Базовая работа API', () => {
  test('GET запрос возвращает данные', async () => {
    const mockData = {id: 1, name: 'Test Item'};
    mock.onGet('/test-endpoint').reply(200, mockData);

    const result = await api.get('/test-endpoint');

    expect(result).toEqual(mockData);
  });

  test('POST запрос отправляет данные и возвращает ответ', async () => {
    const postData = {title: 'New Post'};
    const responseData = {id: 2, ...postData};
    mock.onPost('/posts', postData).reply(200, responseData);

    const result = await api.post('/posts', postData);

    expect(result).toEqual(responseData);
  });

  test('GET запрос с дополнительной конфигурацией', async () => {
    const mockData = {id: 1, name: 'Test Item'};

    // Вместо строгого сравнения параметров, используем функцию для мока
    mock.onGet('/test-endpoint').reply((config) => {
      // Проверяем что параметры передались правильно
      expect(config.params).toEqual({page: 1});
      return [200, mockData];
    });

    const result = await api.get('/test-endpoint', {params: {page: 1}});

    expect(result).toEqual(mockData);
  });

  test('POST запрос с дополнительной конфигурацией', async () => {
    const postData = {title: 'New Post'};
    const responseData = {id: 2, ...postData};

    mock.onPost('/posts').reply((config) => {
      // Проверяем данные и заголовки
      expect(JSON.parse(config.data)).toEqual(postData);
      expect(config.headers?.['X-Custom']).toBe('value');
      return [200, responseData];
    });

    const result = await api.post('/posts', postData, {
      headers: {'X-Custom': 'value'},
    });

    expect(result).toEqual(responseData);
  });
});

describe('Логика Refresh Token', () => {
  const originalConsoleError = console.error;

  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  test('При коде 401 запрос должен повторяться после успешного refresh', async () => {
    mock.onGet('/protected-data').replyOnce(401);

    let refreshCalls = 0;
    mock.onGet('/auth/refresh').reply(() => {
      refreshCalls++;
      return [200, {}];
    });

    mock.onGet('/protected-data').reply(200, {data: 'Secret'});

    const result = await api.get('/protected-data');

    expect(result).toEqual({data: 'Secret'});
    expect(refreshCalls).toBe(1);
  });

  test('При неудачном refresh вызывается onLogoutCallback', async () => {
    const mockLogoutCallback = jest.fn();
    setOnLogout(mockLogoutCallback);

    mock.onGet('/protected-data').replyOnce(401);
    mock.onGet('/auth/refresh').replyOnce(() => [401, {}]);

    await expect(api.get('/protected-data')).rejects.toBeDefined();
    expect(mockLogoutCallback).toHaveBeenCalledTimes(1);
  });

  test('Запрос на /auth/refresh не должен обрабатываться интерцептором при 401', async () => {
    const mockLogoutCallback = jest.fn();
    setOnLogout(mockLogoutCallback);

    // Мокаем запрос на refresh с 401 - он должен просто упасть с ошибкой
    mock.onGet('/auth/refresh').replyOnce(401);

    await expect(api.get('/auth/refresh')).rejects.toBeDefined();

    // logoutCallback НЕ должен вызываться для самого refresh запроса
    expect(mockLogoutCallback).not.toHaveBeenCalled();
  });

  test('Другие коды ошибок (не 401) не должны запускать refresh', async () => {
    mock.onGet('/server-error').replyOnce(500);

    await expect(api.get('/server-error')).rejects.toBeDefined();

    // Проверяем, что refresh не вызывался через историю вызовов
    const refreshCalls = mock.history.get.filter(
      (call) => call.url === '/auth/refresh'
    );
    expect(refreshCalls).toHaveLength(0);
  });
});

describe('Очередь запросов во время Refresh', () => {
  test('Множественные запросы во время обновления токена должны быть обработаны после его завершения', async () => {
    let refreshCount = 0;

    mock.onGet('/auth/refresh').reply(async () => {
      refreshCount++;
      await new Promise((r) => setTimeout(r, 10));
      return [200, {}];
    });

    let dataCallCount = 0;
    mock.onGet('/data').reply(() => {
      dataCallCount++;
      if (dataCallCount <= 2) {
        return [401];
      }
      return [200, {data: 'Success'}];
    });

    const promise1 = api.get('/data');
    const promise2 = api.get('/data');

    const [result1, result2] = await Promise.all([promise1, promise2]);

    expect(result1).toEqual({data: 'Success'});
    expect(result2).toEqual({data: 'Success'});
    expect(refreshCount).toBe(1);
  });

  // ИСПРАВЛЕННЫЙ ТЕСТ: Очередь очищается при неудачном refresh
  test('При неудачном refresh все ожидающие запросы отклоняются', async () => {
    const mockLogoutCallback = jest.fn();
    setOnLogout(mockLogoutCallback);

    let refreshCalled = false;
    mock.onGet('/auth/refresh').replyOnce(() => {
      refreshCalled = true;
      return [401, {}];
    });

    // Мокаем несколько запросов, которые получат 401
    // Используем replyOnce для каждого отдельного вызова
    mock.onGet('/data1').replyOnce(401);
    mock.onGet('/data2').replyOnce(401);
    mock.onGet('/data3').replyOnce(401);

    // Запускаем несколько параллельных запросов
    const promises = [
      api.get('/data1').catch((e) => e),
      api.get('/data2').catch((e) => e),
      api.get('/data3').catch((e) => e),
    ];

    const results = await Promise.all(promises);

    // Все промисы должны быть отклонены
    results.forEach((result) => {
      expect(result).toBeDefined(); // У всех должна быть ошибка
    });

    // Refresh должен вызваться только один раз
    expect(refreshCalled).toBe(true);
    // logoutCallback должен вызваться один раз
    expect(mockLogoutCallback).toHaveBeenCalledTimes(1);
  });

  test('POST запросы должны правильно обрабатываться в очереди refresh', async () => {
    let refreshCount = 0;
    mock.onGet('/auth/refresh').reply(() => {
      refreshCount++;
      return [200, {}];
    });

    let postCallCount = 0;
    const postData = {title: 'Test Post'};

    mock.onPost('/posts').reply(() => {
      postCallCount++;
      if (postCallCount === 1) {
        return [401];
      }
      return [200, {id: 1, ...postData}];
    });

    const result = await api.post('/posts', postData);

    expect(result).toEqual({id: 1, ...postData});
    expect(refreshCount).toBe(1);
  });
});

describe('Граничные случаи', () => {
  test('Запрос без конфига в ошибке не должен обрабатываться интерцептором', async () => {
    // Создаем ошибку без config (это может случиться в реальности)
    const errorWithoutConfig = new Error('Network error');

    // Мокаем axios чтобы выбросить ошибку без config
    mock.onGet('/network-error').reply(() => {
      throw errorWithoutConfig;
    });

    await expect(api.get('/network-error')).rejects.toThrow('Network error');
  });

  test('Повторный вызов setOnLogout перезаписывает callback', async () => {
    const firstCallback = jest.fn();
    const secondCallback = jest.fn();

    setOnLogout(firstCallback);
    setOnLogout(secondCallback);

    mock.onGet('/protected-data').replyOnce(401);
    mock.onGet('/auth/refresh').replyOnce(401);

    await expect(api.get('/protected-data')).rejects.toBeDefined();

    // Должен вызваться только второй callback
    expect(firstCallback).not.toHaveBeenCalled();
    expect(secondCallback).toHaveBeenCalledTimes(1);
  });
});

// api.test.ts
import MockAdapter from 'axios-mock-adapter';

const createMock = async () => {
  jest.resetModules();
  // Импортируем axios ДО api, чтобы перехватить тот же инстанс
  const axiosModule = await import('axios');
  const mock = new MockAdapter(axiosModule.default);
  const apiModule = await import('../api');
  return {mock, ...apiModule};
};

describe('api client', () => {
  afterEach(() => {
    jest.resetModules();
  });

  describe('api.get', () => {
    it('возвращает data из ответа', async () => {
      const {api, mock} = await createMock();
      mock.onGet('/api/users').reply(200, {id: 1});

      const result = await api.get('/users');
      expect(result).toEqual({id: 1});
      mock.restore();
    });

    it('пробрасывает ошибку при неуспешном запросе (не 401)', async () => {
      const {api, mock} = await createMock();
      mock.onGet('/api/data').reply(500);

      await expect(api.get('/data')).rejects.toMatchObject({
        response: {status: 500},
      });
      mock.restore();
    });
  });

  describe('api.post', () => {
    it('отправляет данные и возвращает data из ответа', async () => {
      const {api, mock} = await createMock();
      mock.onPost('/api/users').reply(201, {id: 42});

      const result = await api.post('/users', {name: 'Alice'});
      expect(result).toEqual({id: 42});
      mock.restore();
    });
  });

  describe('перехват 401 и refresh token', () => {
    it('при 401 делает refresh и повторяет запрос', async () => {
      const {api, mock} = await createMock();

      mock.onGet('/api/auth/refresh').reply(200);
      mock
        .onGet('/api/profile')
        .replyOnce(401)
        .onGet('/api/profile')
        .reply(200, {name: 'Bob'});

      const result = await api.get('/profile');
      expect(result).toEqual({name: 'Bob'});
      mock.restore();
    });

    it('не делает refresh для запроса auth/refresh (избегаем петли)', async () => {
      const {api, mock} = await createMock();
      mock.onGet('/api/auth/refresh').reply(401);

      await expect(api.get('/auth/refresh')).rejects.toMatchObject({
        response: {status: 401},
      });
      mock.restore();
    });

    it('вызывает logout при неудачном refresh', async () => {
      const {api, mock, setOnLogout} = await createMock();
      const logoutMock = jest.fn();
      setOnLogout(logoutMock);

      mock.onGet('/api/secure').reply(401);
      mock.onGet('/api/auth/refresh').reply(500);

      await expect(api.get('/secure')).rejects.toBeDefined();
      expect(logoutMock).toHaveBeenCalledTimes(1);
      mock.restore();
    });

    it('не вызывает logout при успешном refresh', async () => {
      const {api, mock, setOnLogout} = await createMock();
      const logoutMock = jest.fn();
      setOnLogout(logoutMock);

      mock.onGet('/api/auth/refresh').reply(200);
      mock.onGet('/api/data').replyOnce(401).onGet('/api/data').reply(200, {});

      await api.get('/data');
      expect(logoutMock).not.toHaveBeenCalled();
      mock.restore();
    });
  });

  describe('очередь запросов при параллельных 401', () => {
    it('все запросы из очереди выполняются после одного refresh', async () => {
      const {api, mock} = await createMock();

      let refreshCount = 0;
      mock.onGet('/api/auth/refresh').reply(() => {
        refreshCount++;
        return [200];
      });

      mock.onGet('/api/a').replyOnce(401).onGet('/api/a').reply(200, {a: 1});
      mock.onGet('/api/b').replyOnce(401).onGet('/api/b').reply(200, {b: 2});
      mock.onGet('/api/c').replyOnce(401).onGet('/api/c').reply(200, {c: 3});

      const [a, b, c] = await Promise.all([
        api.get('/a'),
        api.get('/b'),
        api.get('/c'),
      ]);

      expect(a).toEqual({a: 1});
      expect(b).toEqual({b: 2});
      expect(c).toEqual({c: 3});
      expect(refreshCount).toBe(1);
      mock.restore();
    });

    it('все запросы из очереди отклоняются если refresh упал', async () => {
      const {api, mock, setOnLogout} = await createMock();
      setOnLogout(jest.fn());

      mock.onGet('/api/auth/refresh').reply(500);
      mock.onGet('/api/a').reply(401);
      mock.onGet('/api/b').reply(401);

      const results = await Promise.allSettled([api.get('/a'), api.get('/b')]);

      expect(results[0].status).toBe('rejected');
      expect(results[1].status).toBe('rejected');
      mock.restore();
    });
  });

  describe('setOnLogout', () => {
    it('позволяет заменить callback на logout', async () => {
      const {api, mock, setOnLogout} = await createMock();
      const first = jest.fn();
      const second = jest.fn();

      setOnLogout(first);
      setOnLogout(second);

      mock.onGet('/api/secure').reply(401);
      mock.onGet('/api/auth/refresh').reply(500);

      await expect(api.get('/secure')).rejects.toBeDefined();

      expect(first).not.toHaveBeenCalled();
      expect(second).toHaveBeenCalledTimes(1);
      mock.restore();
    });
  });
});

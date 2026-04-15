import type {AxiosError, AxiosRequestConfig} from 'axios';
import {beforeEach, describe, expect, it, vi} from 'vitest';

type TRetryRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

type TMockResponse = {
  config: TRetryRequestConfig;
  data: unknown;
  headers: Record<string, string>;
  status: number;
  statusText: string;
};

type TResponseHandler = {
  onFulfilled?: (
    value: TMockResponse
  ) => TMockResponse | Promise<TMockResponse>;
  onRejected?: (error: unknown) => unknown;
};

type TRequestExecutor = (config: TRetryRequestConfig) => Promise<TMockResponse>;

type TMockAxiosClient = ((config: TRetryRequestConfig) => Promise<unknown>) & {
  get: (url: string, config?: TRetryRequestConfig) => Promise<unknown>;
  request: (config: TRetryRequestConfig) => Promise<unknown>;
  interceptors: {
    response: {
      use: (
        onFulfilled?: TResponseHandler['onFulfilled'],
        onRejected?: TResponseHandler['onRejected']
      ) => number;
    };
  };
};

const createResponse = (
  config: TRetryRequestConfig,
  data: unknown
): TMockResponse => ({
  config,
  data,
  headers: {},
  status: 200,
  statusText: 'OK',
});

const mockAxiosState = vi.hoisted(() => {
  const responseHandler: TResponseHandler = {};
  const requests: TRetryRequestConfig[] = [];

  let requestExecutor: TRequestExecutor = (config) =>
    Promise.resolve(createResponse(config, null));

  const clientFn = vi.fn((config: TRetryRequestConfig): Promise<unknown> => {
    requests.push(config);

    return requestExecutor(config)
      .then((response) => {
        if (!responseHandler.onFulfilled) {
          return response;
        }

        return responseHandler.onFulfilled(response);
      })
      .catch((error) => {
        if (!responseHandler.onRejected) {
          return Promise.reject(error);
        }

        return responseHandler.onRejected(error) as Promise<unknown>;
      });
  });

  const mockClient = clientFn as unknown as TMockAxiosClient;

  mockClient.get = (url, config = {}) =>
    mockClient({
      ...config,
      method: 'get',
      url,
    });

  mockClient.request = (config) => mockClient(config);
  mockClient.interceptors = {
    response: {
      use: vi.fn((onFulfilled, onRejected) => {
        responseHandler.onFulfilled = onFulfilled;
        responseHandler.onRejected = onRejected;
        return 0;
      }),
    },
  };

  const axiosDefault = {
    create: vi.fn(() => mockClient),
  };

  return {
    axiosDefault,
    reset: () => {
      requests.length = 0;
      responseHandler.onFulfilled = undefined;
      responseHandler.onRejected = undefined;
      requestExecutor = (config) =>
        Promise.resolve(createResponse(config, null));
      clientFn.mockClear();
      (
        mockClient.interceptors.response.use as unknown as ReturnType<
          typeof vi.fn
        >
      ).mockClear();
      axiosDefault.create.mockClear();
    },
    setExecutor: (executor: TRequestExecutor) => {
      requestExecutor = executor;
    },
  };
});

vi.mock('axios', () => ({
  default: mockAxiosState.axiosDefault,
}));

const createAxiosError = (
  config: TRetryRequestConfig,
  status = 401
): AxiosError => {
  return {
    config,
    isAxiosError: true,
    message: `Request failed with status ${status}`,
    name: 'AxiosError',
    response: {
      config: {
        headers: {},
        ...config,
      },
      data: null,
      headers: {},
      status,
      statusText: 'Error',
    },
    toJSON: () => ({}),
  } as unknown as AxiosError;
};

const createDeferred = <T>() => {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {promise, reject, resolve};
};

describe('api client instance', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mockAxiosState.reset();
  });

  it('request returns response data', async () => {
    mockAxiosState.setExecutor((config) =>
      Promise.resolve(createResponse(config, {id: 1}))
    );

    const {request} = await import('../instance');

    const result = await request<{id: number}>({
      method: 'get',
      url: '/users/1',
    });

    expect(result).toEqual({id: 1});
  });

  it('refreshes token once and retries original request', async () => {
    let refreshCalls = 0;
    let protectedCalls = 0;

    mockAxiosState.setExecutor((config) => {
      if (config.url === 'auth/refresh') {
        refreshCalls += 1;
        return Promise.resolve(createResponse(config, {ok: true}));
      }

      if (config.url === '/protected') {
        protectedCalls += 1;

        if (!config._retry) {
          return Promise.reject(createAxiosError(config, 401));
        }

        return Promise.resolve(createResponse(config, {secure: true}));
      }

      return Promise.resolve(createResponse(config, null));
    });

    const {baseClient} = await import('../instance');
    const result = await baseClient({method: 'get', url: '/protected'});

    expect(result).toMatchObject({data: {secure: true}});
    expect(refreshCalls).toBe(1);
    expect(protectedCalls).toBe(2);
  });

  it('queues parallel 401 requests while refresh is in flight', async () => {
    const refreshDeferred = createDeferred<TMockResponse>();
    const callsByUrl: Record<string, number> = {};

    mockAxiosState.setExecutor((config) => {
      if (config.url === 'auth/refresh') {
        return refreshDeferred.promise;
      }

      if (config.url === '/profile' || config.url === '/settings') {
        callsByUrl[config.url] = (callsByUrl[config.url] ?? 0) + 1;

        if (!config._retry) {
          return Promise.reject(createAxiosError(config, 401));
        }

        return Promise.resolve(createResponse(config, {url: config.url}));
      }

      return Promise.resolve(createResponse(config, null));
    });

    const {baseClient} = await import('../instance');

    const firstRequest = baseClient({method: 'get', url: '/profile'});
    const secondRequest = baseClient({method: 'get', url: '/settings'});

    await Promise.resolve();
    await Promise.resolve();

    refreshDeferred.resolve(
      createResponse({method: 'get', url: 'auth/refresh'}, {ok: true})
    );

    const [firstResult, secondResult] = await Promise.all([
      firstRequest,
      secondRequest,
    ]);

    expect(firstResult).toMatchObject({data: {url: '/profile'}});
    expect(secondResult).toMatchObject({data: {url: '/settings'}});
    expect(callsByUrl['/profile']).toBe(2);
    expect(callsByUrl['/settings']).toBe(2);
  });

  it('calls onLogout and rejects queued requests if refresh fails', async () => {
    const logoutSpy = vi.fn();
    const refreshError = createAxiosError(
      {method: 'get', url: 'auth/refresh'},
      401
    );

    mockAxiosState.setExecutor((config) => {
      if (config.url === 'auth/refresh') {
        return Promise.reject(refreshError);
      }

      if (config.url === '/profile' || config.url === '/settings') {
        return Promise.reject(createAxiosError(config, 401));
      }

      return Promise.resolve(createResponse(config, null));
    });

    const {baseClient, setOnLogout} = await import('../instance');
    setOnLogout(logoutSpy);

    const firstRequest = baseClient({method: 'get', url: '/profile'});
    const secondRequest = baseClient({method: 'get', url: '/settings'});

    await expect(firstRequest).rejects.toBe(refreshError);
    await expect(secondRequest).rejects.toBe(refreshError);
    expect(logoutSpy).toHaveBeenCalledTimes(1);
  });

  it('does not trigger refresh logic for refresh endpoint or retried request', async () => {
    let refreshEndpointCalls = 0;
    let nonRetryCalls = 0;

    mockAxiosState.setExecutor((config) => {
      if (config.url === 'auth/refresh') {
        refreshEndpointCalls += 1;
        return Promise.reject(createAxiosError(config, 401));
      }

      if (config.url === '/profile') {
        if (!config._retry) {
          nonRetryCalls += 1;
        }

        return Promise.reject(createAxiosError(config, 401));
      }

      return Promise.resolve(createResponse(config, null));
    });

    const {baseClient} = await import('../instance');

    await expect(baseClient.get('auth/refresh')).rejects.toMatchObject({
      response: {status: 401},
    });

    await expect(
      baseClient({
        method: 'get',
        url: '/profile',
        _retry: true,
      } as TRetryRequestConfig)
    ).rejects.toMatchObject({
      response: {status: 401},
    });

    expect(refreshEndpointCalls).toBe(1);
    expect(nonRetryCalls).toBe(0);
  });
});

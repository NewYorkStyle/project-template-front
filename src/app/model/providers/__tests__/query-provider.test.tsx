import type {ReactNode} from 'react';

import {act, render, screen} from '@testing-library/react';
import {beforeEach, describe, expect, it, vi} from 'vitest';

const queryProviderMocks = vi.hoisted(() => ({
  clearAuth: vi.fn(),
  queryClientClear: vi.fn(),
  setOnLogout: vi.fn<(callback: () => void) => void>(),
  storedLogoutCallback: null as (() => void) | null,
}));

vi.mock('@entities', () => ({
  useAuth: () => ({
    clearAuth: queryProviderMocks.clearAuth,
  }),
}));

vi.mock('@shared', () => ({
  setOnLogout: queryProviderMocks.setOnLogout,
}));

vi.mock('@tanstack/react-query', () => ({
  QueryClient: class QueryClient {
    constructor(_config: unknown) {}

    clear = queryProviderMocks.queryClientClear;
  },
  QueryClientProvider: ({children}: {children: ReactNode}) => <>{children}</>,
}));

vi.mock('@tanstack/react-query-devtools', () => ({
  ReactQueryDevtools: () => null,
}));

describe('QueryProvider', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    queryProviderMocks.storedLogoutCallback = null;
    queryProviderMocks.setOnLogout.mockImplementation((callback) => {
      queryProviderMocks.storedLogoutCallback = callback;
    });
  });

  it('registers logout callback via setOnLogout on mount', async () => {
    const {QueryProvider} = await import('../query-provider');

    render(
      <QueryProvider>
        <div>children rendered</div>
      </QueryProvider>
    );

    expect(screen.getByText('children rendered')).toBeInTheDocument();
    expect(queryProviderMocks.setOnLogout).toHaveBeenCalledTimes(1);
    expect(queryProviderMocks.storedLogoutCallback).toBeTypeOf('function');
  });

  it('logout callback clears auth and query cache', async () => {
    const {QueryProvider} = await import('../query-provider');

    render(
      <QueryProvider>
        <div>children rendered</div>
      </QueryProvider>
    );

    act(() => {
      queryProviderMocks.storedLogoutCallback?.();
    });

    expect(queryProviderMocks.clearAuth).toHaveBeenCalledTimes(1);
    expect(queryProviderMocks.queryClientClear).toHaveBeenCalledTimes(1);
  });
});

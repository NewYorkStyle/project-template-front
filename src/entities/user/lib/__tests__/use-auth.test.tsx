/* eslint-disable @typescript-eslint/consistent-type-imports */
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {fireEvent, render, renderHook, screen} from '@testing-library/react';
import {beforeEach, describe, expect, it, vi} from 'vitest';

const sessionMocks = vi.hoisted(() => ({
  refetchSession: vi.fn(),
  useUsersControllerFindById: vi.fn(() => ({
    data: undefined,
    isPending: false,
    isSuccess: false,
    isError: false,
    refetch: sessionMocks.refetchSession,
  })),
}));

vi.mock('@api/endpoints/users', () => ({
  useUsersControllerFindById: sessionMocks.useUsersControllerFindById,
}));

const authMocks = vi.hoisted(() => ({
  authStorageClear: vi.fn(),
  cookieGet: vi.fn<(key: string) => string | undefined>(),
  cookieRemove: vi.fn<(key: string) => void>(),
  cookieSet: vi.fn<(key: string, value: string) => void>(),
  setOnLogout: vi.fn<(callback: () => void) => void>(),
}));

vi.mock('js-cookie', () => ({
  default: {
    get: authMocks.cookieGet,
    remove: authMocks.cookieRemove,
    set: authMocks.cookieSet,
  },
}));

const wireCookieMocks = () => {
  authMocks.cookieSet.mockImplementation((key, value) => {
    if (key === 'isUserLoggedIn' && value === 'true') {
      authMocks.cookieGet.mockReturnValue('true');
    }
  });
  authMocks.cookieRemove.mockImplementation((key) => {
    if (key === 'isUserLoggedIn') {
      authMocks.cookieGet.mockReturnValue(undefined);
    }
  });
};

vi.mock('@shared', () => ({
  authStorage: {
    clear: authMocks.authStorageClear,
  },
  setOnLogout: authMocks.setOnLogout,
}));

const TestConsumer = () => {
  const {clearAuth, isUserLogged, setUserLogged} = useAuth();

  return (
    <>
      <span data-testid='auth-state'>{isUserLogged ? 'logged' : 'guest'}</span>
      <button type='button' onClick={() => setUserLogged(true)}>
        login
      </button>
      <button type='button' onClick={() => setUserLogged(false)}>
        logout
      </button>
      <button type='button' onClick={clearAuth}>
        clear
      </button>
    </>
  );
};

let AuthProvider: typeof import('../use-auth').AuthProvider;
let useAuth: typeof import('../use-auth').useAuth;

describe('useAuth', () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
    authMocks.cookieGet.mockReset();
    authMocks.cookieRemove.mockReset();
    authMocks.cookieSet.mockReset();
    authMocks.authStorageClear.mockReset();
    authMocks.setOnLogout.mockReset();
    authMocks.cookieGet.mockReturnValue(undefined);
    wireCookieMocks();

    ({AuthProvider, useAuth} = await import('../use-auth'));
  });

  it('initializes auth state from cookie', () => {
    authMocks.cookieGet.mockReturnValue('true');

    render(
      <QueryClientProvider
        client={new QueryClient({defaultOptions: {queries: {retry: false}}})}
      >
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      </QueryClientProvider>
    );

    expect(screen.getByTestId('auth-state')).toHaveTextContent('logged');
  });

  it('sets and clears login cookie via setUserLogged', () => {
    render(
      <QueryClientProvider
        client={new QueryClient({defaultOptions: {queries: {retry: false}}})}
      >
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByRole('button', {name: 'login'}));
    expect(screen.getByTestId('auth-state')).toHaveTextContent('logged');
    expect(authMocks.cookieSet).toHaveBeenCalledWith('isUserLoggedIn', 'true');

    fireEvent.click(screen.getByRole('button', {name: 'logout'}));
    expect(screen.getByTestId('auth-state')).toHaveTextContent('guest');
    expect(authMocks.cookieRemove).toHaveBeenCalledWith('isUserLoggedIn');
  });

  it('clears auth flag and storage via clearAuth', () => {
    authMocks.cookieGet.mockReturnValue('true');

    render(
      <QueryClientProvider
        client={new QueryClient({defaultOptions: {queries: {retry: false}}})}
      >
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByRole('button', {name: 'clear'}));

    expect(screen.getByTestId('auth-state')).toHaveTextContent('guest');
    expect(authMocks.cookieRemove).toHaveBeenCalledWith('isUserLoggedIn');
    expect(authMocks.authStorageClear).toHaveBeenCalledTimes(1);
  });

  it('registers logout callback via setOnLogout on mount', () => {
    render(
      <QueryClientProvider
        client={new QueryClient({defaultOptions: {queries: {retry: false}}})}
      >
        <AuthProvider>
          <span>child</span>
        </AuthProvider>
      </QueryClientProvider>
    );

    expect(authMocks.setOnLogout).toHaveBeenCalledTimes(1);
  });

  it('throws if hook is used outside provider', () => {
    expect(() => renderHook(() => useAuth())).toThrowError(
      'useAuth: хук допустим только внутри AuthProvider'
    );
  });
});

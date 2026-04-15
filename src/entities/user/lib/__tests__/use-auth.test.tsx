import {fireEvent, render, renderHook, screen} from '@testing-library/react';
import {beforeEach, describe, expect, it, vi} from 'vitest';

const authMocks = vi.hoisted(() => ({
  authStorageClear: vi.fn(),
  cookieGet: vi.fn<(key: string) => string | undefined>(),
  cookieRemove: vi.fn<(key: string) => void>(),
  cookieSet: vi.fn<(key: string, value: string) => void>(),
}));

vi.mock('js-cookie', () => ({
  default: {
    get: authMocks.cookieGet,
    remove: authMocks.cookieRemove,
    set: authMocks.cookieSet,
  },
}));

vi.mock('@shared', () => ({
  authStorage: {
    clear: authMocks.authStorageClear,
  },
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
    authMocks.cookieGet.mockReturnValue(undefined);

    ({AuthProvider, useAuth} = await import('../use-auth'));
  });

  it('initializes auth state from cookie', () => {
    authMocks.cookieGet.mockReturnValue('true');

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-state')).toHaveTextContent('logged');
  });

  it('sets and clears login cookie via setUserLogged', () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    fireEvent.click(screen.getByRole('button', {name: 'login'}));
    expect(screen.getByTestId('auth-state')).toHaveTextContent('logged');
    expect(authMocks.cookieSet).toHaveBeenCalledWith('isUserLoggedIn', 'true');

    fireEvent.click(screen.getByRole('button', {name: 'logout'}));
    expect(screen.getByTestId('auth-state')).toHaveTextContent('guest');
    expect(authMocks.cookieRemove).toHaveBeenCalledWith('isUserLoggedIn');
  });

  it('clears auth cookies and storage via clearAuth', () => {
    authMocks.cookieGet.mockReturnValue('true');

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    fireEvent.click(screen.getByRole('button', {name: 'clear'}));

    expect(screen.getByTestId('auth-state')).toHaveTextContent('guest');
    expect(authMocks.cookieRemove).toHaveBeenCalledWith('refreshToken');
    expect(authMocks.cookieRemove).toHaveBeenCalledWith('accessToken');
    expect(authMocks.cookieRemove).toHaveBeenCalledWith('isUserLoggedIn');
    expect(authMocks.authStorageClear).toHaveBeenCalledTimes(1);
  });

  it('throws if hook is used outside provider', () => {
    expect(() => renderHook(() => useAuth())).toThrowError(
      'useAuth must be used within AuthProvider'
    );
  });
});

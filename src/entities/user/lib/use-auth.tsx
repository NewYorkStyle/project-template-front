import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from 'react';

import Cookies from 'js-cookie';

import {authStorage} from '@shared';

type TAuthContextValue = {
  isUserLogged: boolean;
  setUserLogged: (value: boolean) => void;
  clearAuth: () => void;
};

const AuthContext = createContext<TAuthContextValue | null>(null);

type TAuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<TAuthProviderProps> = ({children}) => {
  const [isUserLogged, setIsUserLogged] = useState<boolean>(
    () => Cookies.get('isUserLoggedIn') === 'true'
  );

  useEffect(() => {
    const loggedIn = Cookies.get('isUserLoggedIn') === 'true';
    if (loggedIn !== isUserLogged) {
      setIsUserLogged(loggedIn);
    }
  }, []);

  const setUserLogged = useCallback((value: boolean) => {
    setIsUserLogged(value);
    if (value) {
      Cookies.set('isUserLoggedIn', 'true');
    } else {
      Cookies.remove('isUserLoggedIn');
    }
  }, []);

  const clearAuth = useCallback(() => {
    setIsUserLogged(false);
    Cookies.remove('refreshToken');
    Cookies.remove('accessToken');
    Cookies.remove('isUserLoggedIn');
    authStorage.clear();
  }, []);

  const value = useMemo(
    () => ({
      isUserLogged,
      setUserLogged,
      clearAuth,
    }),
    [isUserLogged, setUserLogged, clearAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): TAuthContextValue => {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};

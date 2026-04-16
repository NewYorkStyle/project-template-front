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

import {useQueryClient} from '@tanstack/react-query';
import {isAxiosError} from 'axios';
import Cookies from 'js-cookie';

import {useUsersControllerFindById} from '@api/endpoints/users';
import {authStorage, setOnLogout} from '@shared';

type TAuthContextValue = {
  isUserLogged: boolean;
  /** По cookie пользователь «вошёл»; ждём ответ GET /users/me */
  isSessionLoading: boolean;
  /** GET /users/me успешно */
  sessionConfirmed: boolean;
  /** Ошибка запроса /users/me (например сеть); сессию не подтвердили */
  sessionError: boolean;
  refetchSession: () => void;
  setUserLogged: (value: boolean) => void;
  clearAuth: () => void;
};

const AuthContext = createContext<TAuthContextValue | null>(null);

export const useAuth = (): TAuthContextValue => {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error('useAuth: хук допустим только внутри AuthProvider');
  }
  return ctx;
};

type TAuthProviderProps = {
  children: ReactNode;
};

/** Регистрирует колбэк axios `setOnLogout`: clearAuth + сброс кеша React Query */
const AuthLogoutRegistration = () => {
  const {clearAuth} = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    setOnLogout(() => {
      clearAuth();
      queryClient.clear();
    });
  }, [clearAuth, queryClient]);

  return null;
};

export const AuthProvider: FC<TAuthProviderProps> = ({children}) => {
  const [isUserLogged, setIsUserLoggedState] = useState<boolean>(
    () => Cookies.get('isUserLoggedIn') === 'true'
  );

  const shouldFetchSession =
    typeof window !== 'undefined' && isUserLogged === true;

  const {
    data: sessionProfile,
    isError: isSessionQueryError,
    isPending: isSessionPending,
    isSuccess: isSessionSuccess,
    refetch: refetchSession,
  } = useUsersControllerFindById({
    query: {
      enabled: shouldFetchSession,
      staleTime: 60 * 1000,
      retry: (failureCount, err) => {
        if (isAxiosError(err) && err.response?.status === 401) {
          return false;
        }
        return failureCount < 2;
      },
    },
  });

  useEffect(() => {
    const loggedIn = Cookies.get('isUserLoggedIn') === 'true';
    if (loggedIn !== isUserLogged) {
      setIsUserLoggedState(loggedIn);
    }
  }, [isUserLogged]);

  const setUserLogged = useCallback((value: boolean) => {
    setIsUserLoggedState(value);
    if (value) {
      Cookies.set('isUserLoggedIn', 'true');
    } else {
      Cookies.remove('isUserLoggedIn');
    }
  }, []);

  const clearAuth = useCallback(() => {
    setIsUserLoggedState(false);
    Cookies.remove('isUserLoggedIn');
    authStorage.clear();
  }, []);

  const isSessionLoading = Boolean(shouldFetchSession && isSessionPending);
  const sessionConfirmed = Boolean(
    isUserLogged && isSessionSuccess && sessionProfile !== undefined
  );
  const sessionError = Boolean(
    shouldFetchSession && isSessionQueryError && !isSessionPending
  );

  const value = useMemo(
    () => ({
      isUserLogged,
      isSessionLoading,
      sessionConfirmed,
      sessionError,
      refetchSession,
      setUserLogged,
      clearAuth,
    }),
    [
      isUserLogged,
      isSessionLoading,
      sessionConfirmed,
      sessionError,
      refetchSession,
      setUserLogged,
      clearAuth,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      <AuthLogoutRegistration />
      {children}
    </AuthContext.Provider>
  );
};

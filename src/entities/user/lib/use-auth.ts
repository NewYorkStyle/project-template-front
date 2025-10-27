import {useState, useEffect, useCallback} from 'react';

import Cookies from 'js-cookie';

export const useAuth = () => {
  const [isUserLogged, setIsUserLogged] = useState<boolean>(
    () => Cookies.get('isUserLoggedIn') === 'true'
  );

  // Синхронизация с Cookies при изменении
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
    Cookies.remove('userId');
    Cookies.remove('isUserLoggedIn');
  }, []);

  return {
    isUserLogged,
    setUserLogged,
    clearAuth,
  };
};

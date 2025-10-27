import {useEffect, type ReactNode} from 'react';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

import {useAuth} from '@entities';
import {setOnLogout} from '@shared';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export const QueryProvider = ({children}: {children: ReactNode}) => {
  const {setUserLogged} = useAuth();

  useEffect(() => {
    setOnLogout(() => {
      setUserLogged(false);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

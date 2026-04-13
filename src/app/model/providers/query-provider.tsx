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
  const {clearAuth} = useAuth();

  useEffect(() => {
    setOnLogout(() => {
      clearAuth();
      queryClient.clear();
    });
  }, [clearAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

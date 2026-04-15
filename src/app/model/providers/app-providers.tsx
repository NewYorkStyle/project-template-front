import {AuthProvider} from '@entities';
import {TourProvider} from '@features';

import {AppInitializer} from './app-initializer';
import {QueryProvider} from './query-provider';

export const AppProviders = () => {
  return (
    <AuthProvider>
      <QueryProvider>
        <TourProvider>
          <AppInitializer />
        </TourProvider>
      </QueryProvider>
    </AuthProvider>
  );
};

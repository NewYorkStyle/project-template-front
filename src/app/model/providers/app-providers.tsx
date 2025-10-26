import {AppInitializer} from './app-initializer';
import {QueryProvider} from './query-provider';

export const AppProviders = () => {
  return (
    <QueryProvider>
      <AppInitializer />
    </QueryProvider>
  );
};

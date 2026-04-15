import {useContext} from 'react';

import {TourClientContext} from './tour-context';

export function useTourClient() {
  const ctx = useContext(TourClientContext);

  if (!ctx) {
    throw new Error('useTourClient must be used within TourProvider');
  }

  return ctx;
}

import {createContext} from 'react';

export type TTourClientValue = {
  requestTour: (tourKey: string) => void;
  requestTourIfAllowed: (tourKey: string) => void;
  stop: () => void;
};

export const TourClientContext = createContext<TTourClientValue | null>(null);

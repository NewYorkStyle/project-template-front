import type {TFunction} from 'i18next';
import type {Step} from 'react-joyride';

import {
  HOME_ONBOARDING_LOCAL_STORAGE_KEY,
  HOME_ONBOARDING_TOUR_KEY,
  getHomeOnboardingSteps,
  homeOnboardingOnTourStart,
  homeOnboardingOnTourEnd,
} from './home-onboarding-tour';

export type TTourDefinition = {
  getSteps: (t: TFunction) => readonly Step[];
  /** Ключ в localStorage для проверки/фиксации просмотра. */
  localStorageKey?: string;
  /** Ключ тура, который синхронизируется с backend. */
  backendKey?: string;
  /** Разрешён ли автостарт тура. */
  autoStart?: boolean;
  /** Вызывается перед запуском тура. */
  onTourStart?: () => void;
  /** Вызывается перед сбросом состояния при завершении тура (finish / skip / close). */
  onTourEnd?: () => void;
};

export const TOUR_REGISTRY: Readonly<Record<string, TTourDefinition>> = {
  [HOME_ONBOARDING_TOUR_KEY]: {
    autoStart: true,
    backendKey: HOME_ONBOARDING_TOUR_KEY,
    getSteps: getHomeOnboardingSteps,
    localStorageKey: HOME_ONBOARDING_LOCAL_STORAGE_KEY,
    onTourStart: homeOnboardingOnTourStart,
    onTourEnd: homeOnboardingOnTourEnd,
  },
};

export const getTourDefinition = (
  tourKey: string
): TTourDefinition | undefined => TOUR_REGISTRY[tourKey];

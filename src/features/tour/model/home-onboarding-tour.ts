import type {TFunction} from 'i18next';
import type {Step} from 'react-joyride';

import {TOUR_SELECTORS} from '@shared';

export const HOME_ONBOARDING_TOUR_KEY = 'home-onboarding:v1' as const;

/** Зарезервировано под автостарт и синхронизацию с бэком (этап 1 не пишет в LS). */
export const HOME_ONBOARDING_LOCAL_STORAGE_KEY =
  'tour:home-onboarding:v1' as const;

const tourTarget = (
  selector: (typeof TOUR_SELECTORS)[keyof typeof TOUR_SELECTORS]
) => `[data-tour="${selector}"]` as const;

const PROFILE_LINK_WAIT_MS = 2000;
const PROFILE_LINK_POLL_MS = 50;
const PROFILE_POPOVER_LAYOUT_MS = 200;
let isProfileOpenedByTour = false;

const waitForProfileLinkMounted = async (selector: string) => {
  const deadline = Date.now() + PROFILE_LINK_WAIT_MS;

  while (Date.now() < deadline) {
    if (typeof document !== 'undefined' && document.querySelector(selector)) {
      return;
    }
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, PROFILE_LINK_POLL_MS);
    });
  }
};

/** Согласовано с шагом before (Popover / кнопка-триггер). */
const isHomeProfileMenuOpenOnTrigger = (trigger: HTMLElement | null) => {
  if (!trigger) {
    return false;
  }
  if (trigger.getAttribute('aria-expanded') === 'true') {
    return true;
  }
  return trigger.getAttribute('data-state') === 'open';
};

/** Закрывает меню профиля, если открыто (ссылка в DOM). Сценарная логика home-тура. */
export const homeOnboardingOnTourStart = () => {
  isProfileOpenedByTour = false;
};

/** Закрывает меню профиля только если оно было открыто именно туром. */
export const homeOnboardingOnTourEnd = () => {
  if (!isProfileOpenedByTour) {
    return;
  }

  if (typeof document === 'undefined') {
    isProfileOpenedByTour = false;
    return;
  }

  const trigger = document.querySelector<HTMLElement>(
    tourTarget(TOUR_SELECTORS.HOME_PROFILE_TRIGGER)
  );
  const menuStillOpen = isHomeProfileMenuOpenOnTrigger(trigger);

  isProfileOpenedByTour = false;

  if (!menuStillOpen) {
    return;
  }

  trigger?.click();
};

export const getHomeOnboardingSteps = (t: TFunction): Step[] => [
  {
    target: tourTarget(TOUR_SELECTORS.HOME_SIDEBAR),
    title: t('HomeOnboarding.Steps.Sidebar.Title'),
    content: t('HomeOnboarding.Steps.Sidebar.Content'),
    placement: 'right-start',
    skipBeacon: true,
  },
  {
    target: tourTarget(TOUR_SELECTORS.HOME_LANGUAGE_SWITCH),
    title: t('HomeOnboarding.Steps.Language.Title'),
    content: t('HomeOnboarding.Steps.Language.Content'),
  },
  {
    target: tourTarget(TOUR_SELECTORS.HOME_THEME_SWITCH),
    title: t('HomeOnboarding.Steps.Theme.Title'),
    content: t('HomeOnboarding.Steps.Theme.Content'),
  },
  {
    target: tourTarget(TOUR_SELECTORS.HOME_PROFILE_TRIGGER),
    title: t('HomeOnboarding.Steps.ProfileTrigger.Title'),
    content: t('HomeOnboarding.Steps.ProfileTrigger.Content'),
  },
  {
    target: tourTarget(TOUR_SELECTORS.HOME_PROFILE_LINK),
    title: t('HomeOnboarding.Steps.ProfileLink.Title'),
    content: t('HomeOnboarding.Steps.ProfileLink.Content'),
    isFixed: true,
    placement: 'left',
    before: async () => {
      if (typeof document === 'undefined') {
        return;
      }
      const trigger = document.querySelector<HTMLElement>(
        tourTarget(TOUR_SELECTORS.HOME_PROFILE_TRIGGER)
      );
      if (!isHomeProfileMenuOpenOnTrigger(trigger)) {
        trigger?.click();
        isProfileOpenedByTour = true;
      }

      await waitForProfileLinkMounted(
        tourTarget(TOUR_SELECTORS.HOME_PROFILE_LINK)
      );

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, PROFILE_POPOVER_LAYOUT_MS);
      });
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });
    },
  },
];

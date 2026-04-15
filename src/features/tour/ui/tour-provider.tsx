import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from 'react';

import {useTranslation} from 'react-i18next';
import {
  EVENTS,
  Joyride,
  type ButtonType,
  type Locale,
  type Options,
  STATUS,
  type EventData,
  type Step,
} from 'react-joyride';

import {
  useUserToursControllerGetSeenTours,
  useUserToursControllerMarkTourAsSeen,
} from '@api/endpoints/user-tours';
import {useAuth} from '@entities';

import {TourClientContext} from '../model/tour-context';
import {getTourDefinition} from '../model/tours-registry';

import {TourTooltip} from './tour-tooltip';

type TProps = {
  children: ReactNode;
};

export const TourProvider: FC<TProps> = ({children}) => {
  const {t} = useTranslation('Tour');
  const {isUserLogged} = useAuth();
  const [run, setRun] = useState(false);
  const [activeTourKey, setActiveTourKey] = useState<string | null>(null);
  const isTerminatingRef = useRef(false);
  const seenToursQuery = useUserToursControllerGetSeenTours({
    query: {
      enabled: isUserLogged,
    },
  });
  const {mutateAsync: markTourAsSeenAsync} =
    useUserToursControllerMarkTourAsSeen();
  const seenTourKeys = useMemo(
    () => new Set((seenToursQuery.data?.tours ?? []).map((tour) => tour.key)),
    [seenToursQuery.data?.tours]
  );
  const hasTourInLocalStorage = useCallback((storageKey?: string) => {
    if (!storageKey || typeof window === 'undefined') {
      return false;
    }
    return window.localStorage.getItem(storageKey) === 'true';
  }, []);
  const markTourInLocalStorage = useCallback((storageKey?: string) => {
    if (!storageKey || typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(storageKey, 'true');
  }, []);
  const syncTourSeenInBackend = useCallback(
    async (backendKey?: string) => {
      if (!backendKey || seenTourKeys.has(backendKey)) {
        return;
      }

      try {
        await markTourAsSeenAsync({data: {key: backendKey}});
        await seenToursQuery.refetch();
      } catch {
        // Retry will happen on next requestTourIfAllowed call if needed.
      }
    },
    [markTourAsSeenAsync, seenTourKeys, seenToursQuery]
  );

  const steps: Step[] = useMemo(() => {
    if (!activeTourKey) {
      return [];
    }
    const registered = getTourDefinition(activeTourKey)?.getSteps(t);
    return registered?.length ? [...registered] : [];
  }, [activeTourKey, t]);

  const tourLocale = useMemo<Locale>(
    () => ({
      back: t('Joyride.Back'),
      close: t('Joyride.Close'),
      last: t('Joyride.Done'),
      next: t('Joyride.Next'),
      nextWithProgress: t('Joyride.NextWithProgress'),
      skip: t('Joyride.Skip'),
    }),
    [t]
  );

  const stop = useCallback(() => {
    isTerminatingRef.current = false;
    setRun(false);
    setActiveTourKey(null);
  }, []);

  const requestTour = useCallback(
    (tourKey: string) => {
      const definition = getTourDefinition(tourKey);
      const next = definition?.getSteps(t);
      if (!next?.length) {
        return;
      }
      isTerminatingRef.current = false;
      definition?.onTourStart?.();
      setActiveTourKey(tourKey);
      setRun(true);
    },
    [t]
  );
  const requestTourIfAllowed = useCallback(
    (tourKey: string) => {
      if (!isUserLogged) {
        return;
      }

      const definition = getTourDefinition(tourKey);
      if (!definition?.autoStart) {
        return;
      }
      if (hasTourInLocalStorage(definition.localStorageKey)) {
        void syncTourSeenInBackend(definition.backendKey);
        return;
      }
      if (seenToursQuery.isPending || seenToursQuery.isFetching) {
        return;
      }
      if (definition.backendKey && seenTourKeys.has(definition.backendKey)) {
        return;
      }

      requestTour(tourKey);
    },
    [
      hasTourInLocalStorage,
      isUserLogged,
      requestTour,
      seenTourKeys,
      syncTourSeenInBackend,
      seenToursQuery.isFetching,
      seenToursQuery.isPending,
    ]
  );

  const handleJoyrideEvent = useCallback(
    (data: EventData) => {
      const {status, type} = data;

      if (
        type === EVENTS.TOUR_END ||
        status === STATUS.FINISHED ||
        status === STATUS.SKIPPED
      ) {
        if (isTerminatingRef.current) {
          return;
        }
        isTerminatingRef.current = true;
        const key = activeTourKey;
        if (key) {
          const definition = getTourDefinition(key);

          if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
            markTourInLocalStorage(definition?.localStorageKey);
            void syncTourSeenInBackend(definition?.backendKey);
          }

          definition?.onTourEnd?.();
        }
        stop();
      }
    },
    [activeTourKey, markTourInLocalStorage, stop, syncTourSeenInBackend]
  );

  const contextValue = useMemo(
    () => ({
      requestTour,
      requestTourIfAllowed,
      stop,
    }),
    [requestTour, requestTourIfAllowed, stop]
  );
  const joyrideOptions = useMemo<Partial<Options>>(
    () => ({
      arrowColor: 'var(--background-elevated)',
      backgroundColor: 'var(--background-elevated)',
      buttons: ['skip', 'primary', 'back', 'close'] satisfies ButtonType[],
      showProgress: true,
      skipBeacon: true,
      textColor: 'var(--text-primary)',
      width: 'min(420px, calc(100vw - 32px))',
    }),
    []
  );

  return (
    <TourClientContext.Provider value={contextValue}>
      {children}
      <Joyride
        continuous
        floatingOptions={{
          flipOptions: {
            fallbackPlacements: ['bottom', 'left', 'right'],
          },
          shiftOptions: {padding: 16},
        }}
        locale={tourLocale}
        options={joyrideOptions}
        run={run && steps.length > 0}
        steps={steps}
        styles={{
          tooltip: {
            backgroundColor: 'transparent',
            borderRadius: 0,
            padding: 0,
          },
          tooltipContainer: {padding: 0},
          tooltipContent: {padding: 0},
          tooltipFooter: {display: 'none'},
        }}
        tooltipComponent={TourTooltip}
        onEvent={handleJoyrideEvent}
      />
    </TourClientContext.Provider>
  );
};

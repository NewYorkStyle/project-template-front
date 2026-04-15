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
  ACTIONS,
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
import {E_METRICS_EVENTS, sendEvent} from '@shared';

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
  const lastViewedStepIndexRef = useRef<number | null>(null);
  const seenToursQuery = useUserToursControllerGetSeenTours({
    query: {
      enabled: isUserLogged,
    },
  });
  const {refetch: refetchSeenTours} = seenToursQuery;
  const {mutateAsync: markTourAsSeenAsync} =
    useUserToursControllerMarkTourAsSeen();
  /** Пока идёт запрос seen-туров, не синхронизируем LS→backend (иначе дублируем POST /seen). */
  const seenToursLoadStateRef = useRef({
    isFetching: seenToursQuery.isFetching,
    isPending: seenToursQuery.isPending,
  });
  seenToursLoadStateRef.current = {
    isFetching: seenToursQuery.isFetching,
    isPending: seenToursQuery.isPending,
  };
  const markTourBackendInFlightRef = useRef(new Set<string>());
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
      if (markTourBackendInFlightRef.current.has(backendKey)) {
        return;
      }
      markTourBackendInFlightRef.current.add(backendKey);

      try {
        await markTourAsSeenAsync({data: {key: backendKey}});
        await refetchSeenTours();
      } catch {
        // Retry will happen on next requestTourIfAllowed call if needed.
      } finally {
        markTourBackendInFlightRef.current.delete(backendKey);
      }
    },
    [markTourAsSeenAsync, refetchSeenTours, seenTourKeys]
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
    lastViewedStepIndexRef.current = null;
    setRun(false);
    setActiveTourKey(null);
  }, []);

  const sendTourMetricEvent = useCallback(
    (tourKey: string | null, event: E_METRICS_EVENTS, label: string) => {
      if (!tourKey) {
        return;
      }

      sendEvent({
        event,
        label,
        namespace: `tour-${tourKey}`,
      });
    },
    []
  );

  const requestTour = useCallback(
    (tourKey: string) => {
      const definition = getTourDefinition(tourKey);
      const next = definition?.getSteps(t);
      if (!next?.length) {
        return;
      }
      isTerminatingRef.current = false;
      lastViewedStepIndexRef.current = null;
      sendTourMetricEvent(tourKey, E_METRICS_EVENTS.SHOW, 'start');
      definition?.onTourStart?.();
      setActiveTourKey(tourKey);
      setRun(true);
    },
    [sendTourMetricEvent, t]
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
      const {isFetching, isPending} = seenToursLoadStateRef.current;
      if (isPending || isFetching) {
        return;
      }
      if (hasTourInLocalStorage(definition.localStorageKey)) {
        void syncTourSeenInBackend(definition.backendKey);
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
    ]
  );

  const handleJoyrideEvent = useCallback(
    (data: EventData) => {
      const {action, index, status, type} = data;

      if (
        type === EVENTS.STEP_BEFORE &&
        typeof index === 'number' &&
        lastViewedStepIndexRef.current !== index
      ) {
        lastViewedStepIndexRef.current = index;
        sendTourMetricEvent(
          activeTourKey,
          E_METRICS_EVENTS.SHOW,
          `step_${index + 1}_view`
        );
      }

      if (type === EVENTS.STEP_AFTER && typeof index === 'number') {
        if (action === ACTIONS.NEXT) {
          sendTourMetricEvent(
            activeTourKey,
            E_METRICS_EVENTS.CLICK,
            `next_from_step_${index + 1}`
          );
        }

        if (action === ACTIONS.PREV) {
          sendTourMetricEvent(
            activeTourKey,
            E_METRICS_EVENTS.CLICK,
            `back_from_step_${index + 1}`
          );
        }
      }

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
          const terminalLabel =
            status === STATUS.FINISHED
              ? 'finish'
              : action === ACTIONS.CLOSE
                ? 'close'
                : 'skip';

          sendTourMetricEvent(key, E_METRICS_EVENTS.CLICK, terminalLabel);

          if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
            markTourInLocalStorage(definition?.localStorageKey);
            void syncTourSeenInBackend(definition?.backendKey);
          }

          definition?.onTourEnd?.();
        }
        stop();
      }
    },
    [
      activeTourKey,
      markTourInLocalStorage,
      sendTourMetricEvent,
      stop,
      syncTourSeenInBackend,
    ]
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

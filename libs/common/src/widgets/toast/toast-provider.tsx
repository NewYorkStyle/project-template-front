import style from './toast.module.less';
import {E_TOAST_SEVERITY} from '../../shared';
import {Toast} from 'primereact/toast';
import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
} from 'react';

type TToastMessage = {
  summary: string;
  severity: E_TOAST_SEVERITY;
  detail?: string;
};

type TToastContextType = {
  toastRef: React.RefObject<Toast> | null;
  showToast: ({detail, severity, summary}: TToastMessage) => void;
};

const ToastContext = createContext<TToastContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  showToast: () => {},
  toastRef: null,
});

type TToastProviderProps = {
  children: ReactNode;
};

export const ToastProvider: React.FC<TToastProviderProps> = ({children}) => {
  const toastRef = useRef<Toast>(null);

  const showToast = useCallback(
    ({detail, severity, summary}: TToastMessage) => {
      toastRef.current?.show({
        detail,
        severity,
        summary,
      });
    },
    []
  );

  useEffect(() => {
    setToastContext({showToast, toastRef});
  }, [showToast]);

  return (
    <ToastContext.Provider value={{showToast, toastRef}}>
      <Toast className={style.root} ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
};

let toastContextValue: TToastContextType | undefined;

const setToastContext = (value: TToastContextType) => {
  toastContextValue = value;
};

export const showToast = ({detail, severity, summary}: TToastMessage) => {
  if (toastContextValue) {
    toastContextValue.showToast({detail, severity, summary});
  } else {
    // eslint-disable-next-line no-console
    console.warn('ToastProvider is not mounted');
  }
};

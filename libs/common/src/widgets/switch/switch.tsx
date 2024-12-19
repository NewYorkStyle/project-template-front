import {SwitchView} from './switch.view';
import {TAnalyticsProps, sendEvent} from '../../shared';
import {E_ANALYTIC_EVENTS} from '../../shared/constants';
import {ReactNode} from 'react';

export type TIcons = {
  checked: ReactNode;
  unchecked: ReactNode;
};

/**
 * @prop {Omit<TAnalyticsProps, 'event'>} [analyticProps] Данные для аналитики.
 * @prop {boolean} checked Значение свича.
 * @prop {() => void} onChange Обработчик изменения.
 * @prop {TIcons} [icons] Иконки.
 */
type TProps = {
  analyticProps?: Omit<TAnalyticsProps, 'event'>;
  checked: boolean;
  onChange: () => void;
  icons?: TIcons;
};

/**
 * Компонент для отображения свича.
 */
export const Switch = ({analyticProps, checked, icons, onChange}: TProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange();

    if (analyticProps)
      sendEvent({
        event: E_ANALYTIC_EVENTS.CLICK,
        label: `${analyticProps.label} - ${event.target.checked}`,
        namespace: analyticProps.namespace,
      });
  };

  return <SwitchView checked={checked} icons={icons} onChange={handleChange} />;
};

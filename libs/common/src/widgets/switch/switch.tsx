import {SwitchView} from './switch.view';
import {TAnalyticsProps, sendEvent} from '../../shared';
import {E_ANALYTIC_EVENTS} from '../../shared/constants';

/**
 * @prop {Omit<TAnalyticsProps, 'event'>} analyticProps Данные для аналитики.
 * @prop {boolean} checked Значение свича.
 * @prop {() => void} onChange Обработчик изменения.
 */
type TProps = {
  analyticProps?: Omit<TAnalyticsProps, 'event'>;
  checked: boolean;
  onChange: () => void;
};

/**
 * Компонент для отображения свича.
 */
export const Switch = ({analyticProps, checked, onChange}: TProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange();

    if (analyticProps)
      sendEvent({
        event: E_ANALYTIC_EVENTS.CLICK,
        label: `${analyticProps.label} - ${event.target.checked}`,
        namespace: analyticProps.namespace,
      });
  };

  return <SwitchView checked={checked} onChange={handleChange} />;
};

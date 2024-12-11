import style from './switch.module.less';
import {E_ANALYTIC_EVENTS} from '../../constants';
import {TAnalyticsProps, sendEvent} from '../../metrics/yandex-metrica';
import {
  InputSwitch,
  InputSwitchChangeEvent,
  InputSwitchProps,
} from 'primereact/inputswitch';

/**
 * @prop {Omit<TAnalyticsProps, 'event'>} analyticProps Данные для аналитики.
 * @prop {boolean} checked Значение свича.
 * @prop {() => void} onChange Обработчик изменения.
 */
type TProps = InputSwitchProps & {
  analyticProps?: Omit<TAnalyticsProps, 'event'>;
  checked: boolean;
  onChange: () => void;
};

/**
 * Компонент обёртка над Primereact для отображения свича.
 */
export const Switch = ({
  analyticProps,
  checked,
  onChange,
  ...restProps
}: TProps) => {
  const handleChange = (event: InputSwitchChangeEvent) => {
    onChange();
    if (analyticProps)
      sendEvent({
        event: E_ANALYTIC_EVENTS.CLICK,
        label: `${analyticProps.label} - ${event.value}`,
        namespace: analyticProps.namespace,
      });
  };

  return (
    <InputSwitch
      className={style.root}
      checked={checked}
      onChange={handleChange}
      {...restProps}
    />
  );
};

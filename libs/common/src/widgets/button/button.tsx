import {TAnalyticsProps, sendEvent} from '../../shared';
import {E_ANALYTIC_EVENTS} from '../../shared/constants';
import {Button as PrimeButton, ButtonProps} from 'primereact/button';

/**
 * @prop {Omit<TAnalyticsProps, 'event'>} analyticProps Данные для аналитики.
 * @prop {() => void} onClick Обработчик клика.
 */
type TProps = ButtonProps & {
  analyticProps?: Omit<TAnalyticsProps, 'event'>;
  onClick: () => void;
};

/**
 * Компонент обёртка над Primereact для отображения кнопки.
 */
export const Button = ({analyticProps, onClick, ...restProps}: TProps) => {
  const handleClick = () => {
    onClick();
    if (analyticProps)
      sendEvent({
        event: E_ANALYTIC_EVENTS.CLICK,
        label: analyticProps.label,
        namespace: analyticProps.namespace,
      });
  };

  return <PrimeButton onClick={handleClick} {...restProps}></PrimeButton>;
};

import {ButtonView} from './button.view';
import {TAnalyticsProps, sendEvent} from '../../shared';
import {E_ANALYTIC_EVENTS} from '../../shared/constants';

/**
 * @prop {Omit<TAnalyticsProps, 'event'>} [analyticProps] Данные для аналитики.
 * @prop {() => void} onClick Обработчик клика.
 */
type TProps = {
  analyticProps?: Omit<TAnalyticsProps, 'event'>;
  onClick: () => void;
  children?: string;
  className?: string;
};

/**
 * Компонент обёртка над Primereact для отображения кнопки. Содержит логику.
 */
export const Button = ({
  analyticProps,
  children,
  className,
  onClick,
}: TProps) => {
  const handleClick = () => {
    onClick();
    if (analyticProps)
      sendEvent({
        event: E_ANALYTIC_EVENTS.CLICK,
        label: analyticProps.label,
        namespace: analyticProps.namespace,
      });
  };

  return (
    <ButtonView className={className} onClick={handleClick}>
      {children}
    </ButtonView>
  );
};

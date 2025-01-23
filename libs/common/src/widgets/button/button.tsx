import {ButtonView} from './button.view';
import {TAnalyticsProps, sendEvent} from '../../shared';
import {E_ANALYTIC_EVENTS} from '../../shared/constants';
import {ReactNode} from 'react';

/**
 * @prop {TAnalyticsProps} [analyticProps] Данные для аналитики.
 * @prop {() => void} onClick Обработчик клика.
 * @prop {boolean} [disabled] Обработчик клика.
 * @prop {boolean} [rounded] Круглая кнопка.
 * @prop {ReactNode} [icon] Иконка.
 */
type TProps = {
  analyticProps?: TAnalyticsProps;
  onClick: () => void;
  children?: string;
  className?: string;
  disabled?: boolean;
  rounded?: boolean;
  icon?: ReactNode;
};

/**
 * Компонент обёртка над Primereact для отображения кнопки. Содержит логику.
 */
export const Button = ({
  analyticProps,
  children,
  className,
  disabled,
  icon,
  onClick,
  rounded,
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
    <ButtonView
      className={className}
      onClick={handleClick}
      disabled={disabled}
      rounded={rounded}
      icon={icon}
    >
      {children}
    </ButtonView>
  );
};

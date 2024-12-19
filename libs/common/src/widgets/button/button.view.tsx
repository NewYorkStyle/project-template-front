import {Button} from 'primereact/button';
import {ReactNode} from 'react';

/**
 * @prop {() => void} onClick Обработчик клика.
 * @prop {boolean} [disabled] Обработчик клика.
 * @prop {boolean} [rounded] Круглая кнопка.
 * @prop {ReactNode} [icon] Иконка.
 */
type TProps = {
  onClick: () => void;
  children?: string;
  className?: string;
  disabled?: boolean;
  rounded?: boolean;
  icon?: ReactNode;
};

/**
 * Компонент обёртка над Primereact для отображения кнопки.
 */
export const ButtonView = ({
  children,
  className,
  disabled,
  icon,
  onClick,
  rounded,
}: TProps) => {
  return (
    <Button
      className={className}
      onClick={onClick}
      disabled={disabled}
      rounded={rounded}
      icon={icon}
    >
      {children}
    </Button>
  );
};

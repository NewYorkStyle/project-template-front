import {Button} from 'primereact/button';

/**
 * @prop {() => void} onClick Обработчик клика.
 */
type TProps = {
  onClick: () => void;
  children?: string;
  className?: string;
};

/**
 * Компонент обёртка над Primereact для отображения кнопки.
 */
export const ButtonView = ({children, className, onClick}: TProps) => {
  return (
    <Button className={className} onClick={onClick}>
      {children}
    </Button>
  );
};

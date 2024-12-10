import {Button as PrimeButton, ButtonProps} from 'primereact/button';

type TProps = ButtonProps;

/**
 * Компонент обёртка над Primereact для отображения кнопки.
 */
export const Button = (props: TProps) => {
  return <PrimeButton {...props}></PrimeButton>;
};

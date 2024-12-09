import {Button as PrimeButton, ButtonProps} from 'primereact/button';

export type TProps = ButtonProps;

export const Button = (props: TProps) => {
  return <PrimeButton {...props}></PrimeButton>;
};

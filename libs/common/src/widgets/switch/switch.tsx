import {SwitchView} from './switch.view';
import {ReactNode} from 'react';

export type TIcons = {
  checked: ReactNode;
  unchecked: ReactNode;
};

/**
 * @prop {boolean} checked Значение свича.
 * @prop {() => void} onChange Обработчик изменения.
 * @prop {TIcons} [icons] Иконки.
 */
type TProps = {
  checked: boolean;
  onChange: () => void;
  icons?: TIcons;
};

/**
 * Компонент для отображения свича. Содержит логику.
 */
export const Switch = ({checked, icons, onChange}: TProps) => {
  return <SwitchView checked={checked} icons={icons} onChange={onChange} />;
};

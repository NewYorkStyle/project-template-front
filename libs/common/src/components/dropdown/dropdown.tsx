import style from './dropdown.module.less';
import {Dropdown as PrimeDropdown, DropdownProps} from 'primereact/dropdown';
import {ReactNode} from 'react';

/**
 * @prop {string | number} value Значение элемента списка.
 * @prop {ReactNode} icon Иконка.
 * @prop {string} label Лейбл.
 */
export type TDropdownOption = {
  value: string | number;
  icon?: ReactNode;
  label: string;
};

/**
 * @prop {TDropdownOption[]} opttions Список значений.
 */
type TProps = DropdownProps & {
  options: TDropdownOption[];
};

/**
 * Компонент обёртка над Primereact для отображения выпадающего списка.
 */
export const Dropdown = (props: TProps) => {
  const itemTemplate = (option: TDropdownOption) => {
    return (
      <div className={style.itemTemplate}>
        <span>{option.icon}</span>
        &nbsp;
        <span className={style.text}>{option.label}</span>
      </div>
    );
  };

  return <PrimeDropdown {...props} itemTemplate={itemTemplate} valueTemplate={itemTemplate}></PrimeDropdown>;
};

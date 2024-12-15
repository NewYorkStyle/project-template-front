import {TDropdownOption} from './dropdown';
import style from './dropdown.module.less';
import {
  Dropdown as PrimeDropdown,
  DropdownChangeEvent,
} from 'primereact/dropdown';

/**
 * @prop {TDropdownOption[]} opttions Список значений.
 * @prop {(e: DropdownChangeEvent) => void} onChange Обработчик изменения.
 */
type TProps = {
  options: TDropdownOption[];
  onChange: (e: DropdownChangeEvent) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: TDropdownOption['value'];
};

/**
 * Компонент обёртка над Primereact для отображения выпадающего списка.
 */
export const DropdownView = ({onChange, onFocus, options, value}: TProps) => {
  const itemTemplate = (option: TDropdownOption) => {
    return (
      <div className={style.itemTemplate}>
        <span>{option.icon}</span>
        &nbsp;
        <span className={style.text}>{option.label}</span>
      </div>
    );
  };

  return (
    <PrimeDropdown
      itemTemplate={itemTemplate}
      valueTemplate={itemTemplate}
      onChange={onChange}
      onFocus={onFocus}
      options={options}
      value={value}
    />
  );
};

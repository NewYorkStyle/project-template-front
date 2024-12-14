import style from './dropdown.module.less';
import {TAnalyticsProps, sendEvent} from '../../shared';
import {E_ANALYTIC_EVENTS} from '../../shared/constants';

import {
  Dropdown as PrimeDropdown,
  DropdownChangeEvent,
} from 'primereact/dropdown';
import {ReactNode} from 'react';

/**
 * @prop {string | number} value Значение элемента списка.
 * @prop {ReactNode} icon Иконка.
 * @prop {string} label Лейбл.
 * @prop {string} analyticsLabel Лейбл для аналитики.
 */
export type TDropdownOption = {
  value: string | number | null;
  icon?: ReactNode;
  label: string;
  analyticsLabel?: string;
};

/**
 * @prop {TDropdownOption[]} opttions Список значений.
 * @prop {Omit<TAnalyticsProps, 'event'>} analyticProps Данные для аналитики.
 * @prop {(e: DropdownChangeEvent) => void} onChange Обработчик изменения.
 */
type TProps = {
  options: TDropdownOption[];
  analyticProps?: Omit<TAnalyticsProps, 'event'>;
  onChange: (e: DropdownChangeEvent) => void;
  value: TDropdownOption['value'];
};

/**
 * Компонент обёртка над Primereact для отображения выпадающего списка.
 */
export const Dropdown = ({analyticProps, onChange, options, value}: TProps) => {
  const itemTemplate = (option: TDropdownOption) => {
    return (
      <div className={style.itemTemplate}>
        <span>{option.icon}</span>
        &nbsp;
        <span className={style.text}>{option.label}</span>
      </div>
    );
  };

  const handleOnChage = (e: DropdownChangeEvent) => {
    onChange(e);

    if (analyticProps) {
      const selectedLabel = options.find(
        (option: TDropdownOption) => option.value === e.value
      )?.analyticsLabel;

      sendEvent({
        event: E_ANALYTIC_EVENTS.CLICK,
        label: `${analyticProps.label} - ${selectedLabel ?? 'item'}`,
        namespace: analyticProps.namespace,
      });
    }
  };

  const onFocus = (_e: React.FocusEvent<HTMLInputElement>) => {
    if (analyticProps) {
      sendEvent({
        event: E_ANALYTIC_EVENTS.CLICK,
        label: analyticProps.label,
        namespace: analyticProps.namespace,
      });
    }
  };

  return (
    <PrimeDropdown
      itemTemplate={itemTemplate}
      valueTemplate={itemTemplate}
      onChange={handleOnChage}
      onFocus={onFocus}
      options={options}
      value={value}
    />
  );
};

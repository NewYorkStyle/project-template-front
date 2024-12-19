import {DropdownView} from './dropdown.view';
import {TAnalyticsProps, sendEvent} from '../../shared';
import {E_ANALYTIC_EVENTS} from '../../shared/constants';

import {DropdownChangeEvent} from 'primereact/dropdown';
import {ReactNode} from 'react';

/**
 * @prop {string | number} value Значение элемента списка.
 * @prop {ReactNode} [icon] Иконка.
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
 * @prop {Omit<TAnalyticsProps, 'event'>} [analyticProps] Данные для аналитики.
 * @prop {(e: DropdownChangeEvent) => void} onChange Обработчик изменения.
 * @prop {TDropdownOption['value']} value Текущее значение дропдауна.
 */
type TProps = {
  options: TDropdownOption[];
  analyticProps?: Omit<TAnalyticsProps, 'event'>;
  onChange: (e: DropdownChangeEvent) => void;
  value: TDropdownOption['value'];
};

/**
 * Компонент обёртка над Primereact для отображения выпадающего списка. Содержит логику.
 */
export const Dropdown = ({analyticProps, onChange, options, value}: TProps) => {
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

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (analyticProps) {
      sendEvent({
        event: E_ANALYTIC_EVENTS.CLICK,
        label: analyticProps.label,
        namespace: analyticProps.namespace,
      });
    }
  };

  return (
    <DropdownView
      onChange={handleOnChage}
      onFocus={onFocus}
      options={options}
      value={value}
    />
  );
};

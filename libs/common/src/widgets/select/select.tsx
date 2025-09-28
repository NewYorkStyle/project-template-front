import {E_ANALYTIC_EVENTS, TAnalyticsProps, sendEvent} from '../../shared';
import {Select as AntdSelect, SelectProps} from 'antd';

type TOptionType = NonNullable<SelectProps['options']>[number];

type TProps = SelectProps & {
  options: (TOptionType & {
    analyticsLabel?: string;
  })[];
  analyticProps?: TAnalyticsProps;
};

export const Select = ({
  analyticProps,
  onChange,
  options,
  ...restProps
}: TProps) => {
  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }

    if (analyticProps) {
      const selectedLabel = options.find(
        (option) => option.value === value
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
    <AntdSelect
      onChange={handleChange}
      onFocus={onFocus}
      options={options}
      {...restProps}
    />
  );
};

import {E_METRICS_EVENTS, TMetricsProps} from '../../constants';
import {sendEvent} from '../../lib';
import {Select as AntdSelect, SelectProps} from 'antd';

type TOptionType = NonNullable<SelectProps['options']>[number];

type TProps = SelectProps & {
  options: (TOptionType & {
    analyticsLabel?: string;
  })[];
  analyticProps?: TMetricsProps;
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
        event: E_METRICS_EVENTS.CLICK,
        label: `${analyticProps.label} - ${selectedLabel ?? 'item'}`,
        namespace: analyticProps.namespace,
      });
    }
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (analyticProps) {
      sendEvent({
        event: E_METRICS_EVENTS.CLICK,
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

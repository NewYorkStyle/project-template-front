import {E_ANALYTIC_EVENTS, TAnalyticsProps, sendEvent} from '../../shared';
import {Segmented as AntdSegmented, SegmentedProps} from 'antd';
import {SegmentedValue} from 'antd/es/segmented';

type TProps = SegmentedProps & {
  analyticProps: TAnalyticsProps;
};

export const Segmented = ({analyticProps, onChange, ...restProps}: TProps) => {
  const handleChange = (value: SegmentedValue) => {
    if (onChange) {
      onChange(value);
    }

    if (analyticProps)
      sendEvent({
        event: E_ANALYTIC_EVENTS.CLICK,
        label: analyticProps.label,
        namespace: analyticProps.namespace,
      });
  };

  return <AntdSegmented onChange={handleChange} {...restProps} />;
};

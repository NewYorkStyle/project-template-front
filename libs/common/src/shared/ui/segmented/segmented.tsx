import {E_METRICS_EVENTS, TMetricsProps} from '../../constants';
import {sendEvent} from '../../lib';
import {Segmented as AntdSegmented, SegmentedProps} from 'antd';
import {SegmentedValue} from 'antd/es/segmented';

type TProps = SegmentedProps & {
  analyticProps: TMetricsProps;
};

export const Segmented = ({analyticProps, onChange, ...restProps}: TProps) => {
  const handleChange = (value: SegmentedValue) => {
    if (onChange) {
      onChange(value);
    }

    if (analyticProps)
      sendEvent({
        event: E_METRICS_EVENTS.CLICK,
        label: analyticProps.label,
        namespace: analyticProps.namespace,
      });
  };

  return <AntdSegmented onChange={handleChange} {...restProps} />;
};

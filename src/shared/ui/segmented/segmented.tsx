import {Segmented as AntdSegmented, type SegmentedProps} from 'antd';
import {type SegmentedValue} from 'antd/es/segmented';

import {sendEvent} from '../../lib';
import {E_METRICS_EVENTS, type TMetricsProps} from '../../lib/constants';

type TProps = SegmentedProps & {
  analyticProps?: TMetricsProps;
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

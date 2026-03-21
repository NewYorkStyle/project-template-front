import {
  Segmented as BaseSegmented,
  type TSegmentedProps,
} from '@new_york_style/project-template-ui';
import {type SegmentedValue} from 'antd/es/segmented';

import {E_METRICS_EVENTS, sendEvent, type TMetricsProps} from '../../lib';

type TProps = TSegmentedProps & {
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

  return <BaseSegmented onChange={handleChange} {...restProps} />;
};

import {Button as AntdButton, type ButtonProps} from 'antd';

import {E_METRICS_EVENTS, sendEvent, type TMetricsProps} from '../../lib';

type TProps = ButtonProps & {analyticProps?: TMetricsProps};

export const Button = ({analyticProps, onClick, ...restProps}: TProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }

    if (analyticProps)
      sendEvent({
        event: E_METRICS_EVENTS.CLICK,
        label: analyticProps.label,
        namespace: analyticProps.namespace,
      });
  };

  return <AntdButton onClick={handleClick} {...restProps} />;
};

import {E_METRICS_EVENTS, TMetricsProps} from '../../constants';
import {sendEvent} from '../../lib';
import {Button as AntdButton, ButtonProps} from 'antd';

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

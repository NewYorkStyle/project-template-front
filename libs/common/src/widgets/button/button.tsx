import {TAnalyticsProps, sendEvent} from '../../shared';
import {E_ANALYTIC_EVENTS} from '../../shared/constants';
import {Button as AntdButton, ButtonProps} from 'antd';

type TProps = ButtonProps & {
  analyticProps?: TAnalyticsProps;
};

export const Button = ({analyticProps, onClick, ...restProps}: TProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }

    if (analyticProps)
      sendEvent({
        event: E_ANALYTIC_EVENTS.CLICK,
        label: analyticProps.label,
        namespace: analyticProps.namespace,
      });
  };

  return <AntdButton onClick={handleClick} {...restProps} />;
};

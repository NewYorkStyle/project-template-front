import {
  Button as BaseButton,
  type TButtonProps,
} from '@new_york_style/project-template-ui';

import {E_METRICS_EVENTS, sendEvent, type TMetricsProps} from '../../lib';

type TProps = TButtonProps & {analyticProps?: TMetricsProps};

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

  return <BaseButton onClick={handleClick} {...restProps} />;
};

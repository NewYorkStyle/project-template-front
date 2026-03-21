import {
  Tabs as BaseTabs,
  type TTabsProps,
} from '@new_york_style/project-template-ui';

import {E_METRICS_EVENTS, sendEvent, type TMetricsProps} from '../../lib';

type TTabItemType = NonNullable<TTabsProps['items']>[number];

export type TTabItem = TTabItemType & {analyticsLabel?: string};

type TProps = Omit<TTabsProps, 'items'> & {
  analyticProps?: TMetricsProps;
  items: TTabItem[];
};

export const Tabs = ({
  analyticProps,
  items,
  onChange,
  ...restProps
}: TProps) => {
  const handleTabChange = (activeKey: string) => {
    onChange?.(activeKey);

    if (analyticProps && items) {
      const selectedTab = items.find((item) => item.key === activeKey);
      const analyticsLabel = selectedTab?.analyticsLabel ?? activeKey;

      sendEvent({
        event: E_METRICS_EVENTS.CLICK,
        label: `${analyticProps.label} - ${analyticsLabel}`,
        namespace: analyticProps.namespace,
      });
    }
  };

  return <BaseTabs onChange={handleTabChange} items={items} {...restProps} />;
};

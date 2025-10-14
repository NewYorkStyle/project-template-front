import {Tabs as AntdTabs, type TabsProps} from 'antd';

import {sendEvent} from '../../lib';
import {E_METRICS_EVENTS, type TMetricsProps} from '../../lib/constants';

type TTabItemType = NonNullable<TabsProps['items']>[number];

export type TTabItem = TTabItemType & {analyticsLabel?: string};

type TProps = Omit<TabsProps, 'items'> & {
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

  return <AntdTabs onChange={handleTabChange} items={items} {...restProps} />;
};

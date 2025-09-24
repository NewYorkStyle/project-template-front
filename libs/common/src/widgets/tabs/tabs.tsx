import {E_ANALYTIC_EVENTS, TAnalyticsProps, sendEvent} from '../../shared';
import {Tabs as AntdTabs, TabsProps} from 'antd';

type TTabItemType = NonNullable<TabsProps['items']>[number];

export type TTabItem = TTabItemType & {
  analyticsLabel?: string;
};

type TProps = Omit<TabsProps, 'items'> & {
  analyticProps?: TAnalyticsProps;
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
        event: E_ANALYTIC_EVENTS.CLICK,
        label: `${analyticProps.label} - ${analyticsLabel}`,
        namespace: analyticProps.namespace,
      });
    }
  };

  return <AntdTabs onChange={handleTabChange} items={items} {...restProps} />;
};

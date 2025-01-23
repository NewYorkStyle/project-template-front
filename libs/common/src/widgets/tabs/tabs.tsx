import {TabsView} from './tabs.view';
import {E_ANALYTIC_EVENTS, TAnalyticsProps, sendEvent} from '../../shared';
import {TabViewTabChangeEvent} from 'primereact/tabview';
import {ReactNode, useState} from 'react';

/**
 * @prop {string} label Заголовок таба.
 * @prop {ReactNode} content Содержимое таба.
 */
export type TTab = {
  label: string;
  content: ReactNode;
  analyticsLabel?: string;
};

/**
 * @prop {TAnalyticsProps} [analyticProps] Данные для аналитики.
 * @prop {() => void} onTabChange Обработчик изменения табов.
 * @prop {TTab[]} tabs Табы.
 * @prop {number} [tabWidth] Ширина табов.
 */
type TProps = {
  analyticProps?: TAnalyticsProps;
  onTabChange?: () => void;
  tabs: TTab[];
  tabWidth?: number;
};

/**
 * Компонент обёртка над Primereact для отображения табов. Содержит логику.
 */
export const Tabs = ({analyticProps, onTabChange, tabWidth, tabs}: TProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleTabChange = (e: TabViewTabChangeEvent) => {
    setActiveIndex(e.index);

    if (analyticProps) {
      const selectedLabel = tabs[e.index].analyticsLabel;

      sendEvent({
        event: E_ANALYTIC_EVENTS.CLICK,
        label: `${analyticProps.label} - ${selectedLabel ?? 'tab'}`,
        namespace: analyticProps.namespace,
      });
    }

    if (onTabChange) onTabChange();
  };

  return (
    <TabsView
      activeIndex={activeIndex}
      onTabChange={handleTabChange}
      tabs={tabs}
      tabWidth={tabWidth}
    />
  );
};

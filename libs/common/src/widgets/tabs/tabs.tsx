import {TabsView} from './tabs.view';
import {TabViewTabChangeEvent} from 'primereact/tabview';
import {ReactNode, useState} from 'react';

/**
 * @prop {string} label Заголовок таба.
 * @prop {ReactNode} content Содержимое таба.
 */
export type TTab = {
  label: string;
  content: ReactNode;
};

/**
 * @prop {() => void} onTabChange Обработчик изменения табов.
 * @prop {TTab[]} tabs Табы.
 * @prop {number} [tabWidth] Ширина табов.
 */
type TProps = {
  onTabChange?: () => void;
  tabs: TTab[];
  tabWidth?: number;
};

/**
 * Компонент обёртка над Primereact для отображения табов. Содержит логику.
 */
export const Tabs = ({onTabChange, tabWidth, tabs}: TProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleTabChange = (e: TabViewTabChangeEvent) => {
    setActiveIndex(e.index);

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

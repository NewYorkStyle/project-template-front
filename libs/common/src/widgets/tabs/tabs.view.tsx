import {TTab} from './tabs';
import style from './tabs.module.less';
import {TabPanel, TabView, TabViewTabChangeEvent} from 'primereact/tabview';

/**
 * @prop {number} activeIndex Индекс выбранного таба.
 * @prop {() => void} onTabChange Обработчик изменения табов.
 * @prop {TTab[]} tabs Табы.
 * @prop {number} [tabWidth] Ширина табов.
 */
type TProps = {
  activeIndex: number;
  onTabChange: (e: TabViewTabChangeEvent) => void;
  tabs: TTab[];
  tabWidth?: number;
};

/**
 * Компонент обёртка над Primereact для отображения табов.
 */
export const TabsView = ({
  activeIndex,
  onTabChange,
  tabWidth = 200,
  tabs,
}: TProps) => {
  return (
    <TabView
      activeIndex={activeIndex}
      onTabChange={(e: TabViewTabChangeEvent) => onTabChange(e)}
      className={style.root}
    >
      {tabs.map((tab: TTab) => (
        <TabPanel
          header={tab.label}
          headerStyle={{width: `${tabWidth}px`}}
          key={tab.label}
        >
          {tab.content}
        </TabPanel>
      ))}
    </TabView>
  );
};

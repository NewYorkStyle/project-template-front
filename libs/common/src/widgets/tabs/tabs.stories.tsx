import {TTab, Tabs} from './tabs';
import type {Meta, StoryObj} from '@storybook/react';

type TabsPropsAndCustomArgs = React.ComponentProps<typeof Tabs>;

const TabsWithHook = ({tabWidth, tabs}: {tabs: TTab[]; tabWidth?: number}) => {
  return <Tabs tabs={tabs} tabWidth={tabWidth} />;
};

const meta: Meta<TabsPropsAndCustomArgs> = {
  component: Tabs,
  render: ({tabWidth, tabs}) => (
    <TabsWithHook tabs={tabs} tabWidth={tabWidth} />
  ),
};
export default meta;

const storyTabs: TTab[] = [];

for (let i = 0; i < 5; i++) {
  storyTabs.push({
    content: `Контент таба`,
    label: `Опция ${i + 1}`,
  });
}

export const TabsStory: StoryObj = {
  argTypes: {
    analyticProps: {
      table: {
        disable: true,
      },
    },
    onTabChange: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    tabs: storyTabs,
  },
};

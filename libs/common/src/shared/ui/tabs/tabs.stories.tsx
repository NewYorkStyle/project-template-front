import {Tabs} from './tabs';
import {Typography} from '../typography';
import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';

const meta: Meta<typeof Tabs> = {
  argTypes: {
    analyticProps: {
      table: {disable: true},
    },
    centered: {
      control: 'boolean' as const,
      description: 'Центрирование табов',
    },
    destroyInactiveTabPane: {
      control: 'boolean' as const,
      description: 'Уничтожать неактивные вкладки',
    },
    size: {
      control: {type: 'select' as const},
      description: 'Размер табов',
      options: ['large', 'middle', 'small'],
    },
    type: {
      control: {type: 'select' as const},
      description: 'Тип табов',
      options: ['line', 'card'],
    },
  },
  args: {
    centered: false,
    destroyInactiveTabPane: false,
    size: 'middle',
    type: 'line',
  },
  component: Tabs,
  tags: ['autodocs'],
  title: 'Components/Tabs',
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: function Render(args) {
    const [activeKey, setActiveKey] = useState('1');

    const items = [
      {
        analyticsLabel: 'tab_1',
        children: (
          <Typography.Paragraph>Содержимое первой вкладки</Typography.Paragraph>
        ),
        key: '1',
        label: 'Вкладка 1',
      },
      {
        analyticsLabel: 'tab_2',
        children: (
          <Typography.Paragraph>Содержимое второй вкладки</Typography.Paragraph>
        ),
        key: '2',
        label: 'Вкладка 2',
      },
      {
        analyticsLabel: 'tab_3',
        children: (
          <Typography.Paragraph>
            Содержимое третьей вкладки
          </Typography.Paragraph>
        ),
        key: '3',
        label: 'Вкладка 3',
      },
    ];

    return (
      <div style={{width: '600px'}}>
        <Typography.Title level={3}>Tabs</Typography.Title>
        <Typography.Paragraph>
          Компонент вкладок для организации контента
        </Typography.Paragraph>

        <Tabs
          {...args}
          items={items}
          activeKey={activeKey}
          onChange={setActiveKey}
        />

        <Typography.Paragraph style={{marginTop: '16px'}}>
          Активная вкладка: {activeKey}
        </Typography.Paragraph>
      </div>
    );
  },
};

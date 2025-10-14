import {useState} from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Typography} from '../typography';

import {Segmented} from './segmented';

const meta: Meta<typeof Segmented> = {
  argTypes: {
    analyticProps: {
      table: {disable: true},
    },
    block: {
      control: 'boolean' as const,
      description: 'Занимает всю доступную ширину',
    },
    disabled: {
      control: 'boolean' as const,
      description: 'Отключенное состояние',
    },
    options: {
      control: 'object',
      description: 'Опции для отображения',
    },
    size: {
      control: {type: 'select' as const},
      description: 'Размер сегментированного контрола',
      options: ['large', 'middle', 'small'],
    },
  },
  args: {
    block: false,
    disabled: false,
    options: [
      {label: 'Опция 1', value: 'option1'},
      {label: 'Опция 2', value: 'option2'},
      {label: 'Опция 3', value: 'option3'},
    ],
    size: 'middle',
  },
  component: Segmented,
  tags: ['autodocs'],
  title: 'Components/Segmented',
};

export default meta;
type TStory = StoryObj<typeof Segmented>;

export const Default: TStory = {
  render: function Render(args) {
    const [value, setValue] = useState<string>('option1');

    return (
      <div style={{width: '500px'}}>
        <Typography.Title level={3}>Segmented</Typography.Title>
        <Typography.Paragraph>
          Сегментированный контрол для переключения между опциями
        </Typography.Paragraph>

        <Segmented
          {...args}
          value={value}
          onChange={(value) => setValue(value.toString())}
        />

        <Typography.Paragraph style={{marginTop: '16px'}}>
          Выбрано: {value}
        </Typography.Paragraph>
      </div>
    );
  },
};

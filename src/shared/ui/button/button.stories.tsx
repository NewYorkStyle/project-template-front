import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Button} from './button';

const meta: Meta<typeof Button> = {
  argTypes: {
    analyticProps: {
      table: {disable: true},
    },
    block: {
      control: 'boolean',
      description: 'Занимает всю ширину',
    },
    danger: {
      control: 'boolean',
      description: 'Опасный стиль',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключена ли кнопка',
    },
    ghost: {
      control: 'boolean',
      description: 'Прозрачный фон',
    },
    htmlType: {
      control: {type: 'select'},
      description: 'HTML тип кнопки',
      options: ['button', 'submit', 'reset'],
    },
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки',
    },
    shape: {
      control: {type: 'select'},
      description: 'Форма кнопки',
      options: ['default', 'circle', 'round'],
    },
    size: {
      control: {type: 'select'},
      description: 'Размер кнопки',
      options: ['small', 'middle', 'large'],
    },
    type: {
      control: {type: 'select'},
      description: 'Тип кнопки',
      options: ['default', 'primary', 'dashed', 'text', 'link'],
    },
  },
  args: {
    block: false,
    children: 'Кнопка',
    danger: false,
    disabled: false,
    ghost: false,
    loading: false,
    size: 'middle',
    type: 'default',
  },
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  render: (args) => <Button {...args} />,
};

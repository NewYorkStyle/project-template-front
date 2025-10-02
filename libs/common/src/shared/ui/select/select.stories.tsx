import {Select} from './select';
import {Typography} from '../typography';
import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';

const meta: Meta<typeof Select> = {
  argTypes: {
    allowClear: {
      control: 'boolean' as const,
      description: 'Возможность очистки',
    },
    analyticProps: {
      table: {disable: true},
    },
    disabled: {
      control: 'boolean' as const,
      description: 'Отключенное состояние',
    },
    mode: {
      control: {type: 'select' as const},
      description: 'Режим выбора',
      options: [undefined, 'multiple', 'tags'],
    },
    placeholder: {
      control: 'text',
      description: 'Плейсхолдер',
    },
    showSearch: {
      control: 'boolean' as const,
      description: 'Показывать поиск',
    },
    size: {
      control: {type: 'select' as const},
      description: 'Размер селекта',
      options: ['small', 'middle', 'large'],
    },
  },
  args: {
    allowClear: false,
    disabled: false,
    placeholder: 'Выберите опцию...',
    showSearch: false,
    size: 'middle',
  },
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string>();

    const options = [
      {label: 'Опция 1', value: 'option1'},
      {label: 'Опция 2', value: 'option2'},
      {label: 'Опция 3', value: 'option3'},
      {label: 'Опция 4', value: 'option4'},
      {label: 'Опция 5', value: 'option5'},
    ];

    return (
      <div style={{width: '400px'}}>
        <Typography.Title level={3}>Select</Typography.Title>
        <Typography.Paragraph>
          Выпадающий список с выбором опций
        </Typography.Paragraph>

        <Select {...args} options={options} value={value} onChange={setValue} />

        <Typography.Paragraph style={{marginTop: '16px'}}>
          Выбрано: {value || 'ничего'}
        </Typography.Paragraph>
      </div>
    );
  },
};

export const Multiple: Story = {
  args: {
    mode: 'multiple',
    placeholder: 'Выберите опции...',
  },
  render: function Render(args) {
    const [value, setValue] = useState<string[]>([]);

    const options = [
      {label: 'Опция 1', value: 'option1'},
      {label: 'Опция 2', value: 'option2'},
      {label: 'Опция 3', value: 'option3'},
      {label: 'Опция 4', value: 'option4'},
      {label: 'Опция 5', value: 'option5'},
    ];

    return (
      <div style={{width: '400px'}}>
        <Typography.Title level={3}>Multiple Select</Typography.Title>
        <Typography.Paragraph>Множественный выбор опций</Typography.Paragraph>

        <Select {...args} options={options} value={value} onChange={setValue} />

        <Typography.Paragraph style={{marginTop: '16px'}}>
          Выбрано: {value.length ? value.join(', ') : 'ничего'}
        </Typography.Paragraph>
      </div>
    );
  },
};

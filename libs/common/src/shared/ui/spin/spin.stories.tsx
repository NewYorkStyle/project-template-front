import {Typography} from '../typography';
import {Spin} from './spin';
import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof Spin> = {
  argTypes: {
    delay: {
      control: 'number',
      description: 'Задержка отображения спиннера в миллисекундах',
    },
    fullscreen: {
      control: 'boolean',
      description: 'Полноэкранный режим',
    },
    size: {
      control: {type: 'select'},
      description: 'Размер спиннера',
      options: ['small', 'default', 'large'],
    },
    spinning: {
      control: 'boolean',
      description: 'Отображать ли спиннер',
    },
    tip: {
      control: 'text',
      description: 'Текст под спиннером',
    },
  },
  args: {
    fullscreen: false,
    size: 'default',
    spinning: true,
    tip: 'Загрузка...',
  },
  component: Spin,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Spin',
} satisfies Meta<typeof Spin>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  render: (args) => (
    <div
      style={{
        border: '1px dashed #ccc',
        height: '300px',
        padding: '20px',
        position: 'relative',
        width: '400px',
      }}
    >
      <Spin {...args}>
        <div
          style={{
            background: '#f5f5f5',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            minHeight: '200px',
            opacity: args.spinning ? 0.5 : 1,
            padding: '20px',
            transition: 'opacity 0.3s',
          }}
        >
          <Typography.Title level={3}>Основной контент</Typography.Title>
          <Typography.Paragraph>
            Этот контент будет полупрозрачным когда спиннер активен
          </Typography.Paragraph>
        </div>
      </Spin>
    </div>
  ),
};

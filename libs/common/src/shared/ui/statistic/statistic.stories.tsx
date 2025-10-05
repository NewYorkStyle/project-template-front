import {Statistic} from './statistic';
import {Typography} from '../typography';
import type {Meta, StoryObj} from '@storybook/react';

const baseArgTypes: Meta<typeof Statistic>['argTypes'] = {
  decimalSeparator: {
    control: {type: 'text'},
    description: 'Разделитель десятичных знаков',
  },
  groupSeparator: {
    control: {type: 'text'},
    description: 'Разделитель групп разрядов',
  },
  loading: {
    control: {type: 'boolean'},
    description: 'Состояние загрузки',
  },
  precision: {
    control: {max: 10, min: 0, type: 'number'},
    description: 'Точность (количество знаков после запятой)',
  },
  prefix: {
    control: {type: 'text'},
    description: 'Префикс значения',
  },
  suffix: {
    control: {type: 'text'},
    description: 'Суффикс значения',
  },
  title: {
    control: {type: 'text'},
    description: 'Заголовок статистики',
  },
  value: {
    control: {type: 'text'},
    description: 'Значение для отображения',
  },
  valueStyle: {
    control: {type: 'object'},
    description: 'Стиль значения',
  },
};

const baseArgs = {
  decimalSeparator: '.',
  groupSeparator: ' ',
  loading: false,
  precision: 0,
  title: 'Active Users',
  value: 112893,
  valueStyle: {color: '#3f8600'},
};

const statisticMeta: Meta<typeof Statistic> = {
  argTypes: baseArgTypes,
  args: baseArgs,
  component: Statistic,
  tags: ['autodocs'],
  title: 'Components/Statistic',
};

export default statisticMeta;
type TStory = StoryObj<typeof Statistic>;

export const Default: TStory = {
  render: (args) => (
    <div style={{width: '300px'}}>
      <Typography.Title level={3}>Statistic</Typography.Title>
      <Typography.Paragraph>
        Базовый компонент для отображения статистических данных
      </Typography.Paragraph>
      <Statistic {...args} />
    </div>
  ),
};

type TTimerStory = StoryObj<typeof Statistic.Timer>;

export const Timer: TTimerStory = {
  argTypes: {
    format: {
      control: {type: 'text'},
      description: 'Формат отображения времени',
    },
    onFinish: {
      action: 'onFinish',
      description: 'Колбэк при завершении таймера',
    },
    prefix: {
      control: {type: 'text'},
      description: 'Префикс значения',
    },
    suffix: {
      control: {type: 'text'},
      description: 'Суффикс значения',
    },
    title: {
      control: {type: 'text'},
      description: 'Заголовок таймера',
    },
    value: {
      control: {type: 'number'},
      description: 'Временная метка в миллисекундах',
    },
    valueStyle: {
      control: {type: 'object'},
      description: 'Стиль значения',
    },
  },
  args: {
    format: 'D дней H часов m минут s секунд',
    title: 'Countdown',
    value: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
    valueStyle: {color: '#cf1322'},
  },
  render: (args) => (
    <div style={{width: '300px'}}>
      <Typography.Title level={3}>Timer Statistic</Typography.Title>
      <Typography.Paragraph>
        Компонент таймера обратного отсчета
      </Typography.Paragraph>
      <Statistic.Timer {...args} />
    </div>
  ),
};

export const WithPrefixSuffix: TStory = {
  args: {
    ...baseArgs,
    prefix: '₽',
    suffix: 'руб.',
    title: 'Total Revenue',
    value: 112893,
    valueStyle: {color: '#1890ff'},
  },
  render: (args) => (
    <div style={{width: '300px'}}>
      <Typography.Title level={3}>With Prefix/Suffix</Typography.Title>
      <Typography.Paragraph>
        Статистика с префиксом и суффиксом
      </Typography.Paragraph>
      <Statistic {...args} />
    </div>
  ),
};

export const WithPrecision: TStory = {
  args: {
    ...baseArgs,
    precision: 2,
    suffix: '%',
    title: 'Success Rate',
    value: 98.765,
    valueStyle: {color: '#52c41a'},
  },
  render: (args) => (
    <div style={{width: '300px'}}>
      <Typography.Title level={3}>With Precision</Typography.Title>
      <Typography.Paragraph>
        Статистика с указанной точностью отображения
      </Typography.Paragraph>
      <Statistic {...args} />
    </div>
  ),
};

export const LoadingState: TStory = {
  args: {
    ...baseArgs,
    loading: true,
    title: 'Loading Data...',
  },
  render: (args) => (
    <div style={{width: '300px'}}>
      <Typography.Title level={3}>Loading State</Typography.Title>
      <Typography.Paragraph>
        Статистика в состоянии загрузки
      </Typography.Paragraph>
      <Statistic {...args} />
    </div>
  ),
};

import {Typography} from './typography';
import type {Meta, StoryObj} from '@storybook/react';

const commonArgTypes = {
  analyticProps: {
    table: {disable: true},
  },
  code: {
    control: 'boolean' as const,
    description: 'Стиль кода',
  },
  delete: {
    control: 'boolean' as const,
    description: 'Перечеркнутый текст',
  },
  disabled: {
    control: 'boolean' as const,
    description: 'Отключенное состояние',
  },
  ellipsis: {
    control: 'boolean' as const,
    description: 'Многоточие при переполнении',
  },
  italic: {
    control: 'boolean' as const,
    description: 'Курсив',
  },
  mark: {
    control: 'boolean' as const,
    description: 'Выделенный текст',
  },
  strong: {
    control: 'boolean' as const,
    description: 'Жирный текст',
  },
  type: {
    control: {type: 'select' as const},
    description: 'Тип текста',
    options: ['secondary', 'success', 'warning', 'danger'],
  },
  underline: {
    control: 'boolean' as const,
    description: 'Подчеркнутый текст',
  },
};

const commonArgs = {
  children: 'Пример текста',
  code: false,
  delete: false,
  disabled: false,
  ellipsis: false,
  italic: false,
  mark: false,
  strong: false,
  type: undefined,
  underline: false,
};

const meta: Meta<typeof Typography.Text> = {
  argTypes: commonArgTypes,
  args: commonArgs,
  component: Typography.Text,
  tags: ['autodocs'],
  title: 'Components/Typography',
};

export default meta;

type TextStory = StoryObj<typeof Typography.Text>;
type ParagraphStory = StoryObj<typeof Typography.Paragraph>;
type TitleStory = StoryObj<typeof Typography.Title>;
type LinkStory = StoryObj<typeof Typography.Link>;

export const Text: TextStory = {
  render: (args) => (
    <div style={{width: '500px'}}>
      <Typography.Text {...args} />
    </div>
  ),
};

export const Paragraph: ParagraphStory = {
  argTypes: commonArgTypes,
  args: {
    ...commonArgs,
    children:
      'Это пример параграфа текста. Параграф обычно используется для основного текстового контента и имеет отступы сверху и снизу.',
  },
  render: (args) => (
    <div style={{width: '500px'}}>
      <Typography.Paragraph {...args} />
    </div>
  ),
};

export const Title: TitleStory = {
  argTypes: {
    ...commonArgTypes,
    level: {
      control: {type: 'select' as const},
      description: 'Уровень заголовка',
      options: [1, 2, 3, 4, 5],
    },
  },
  args: {
    ...commonArgs,
    children: 'Заголовок',
    level: 1,
  },
  render: (args) => (
    <div style={{width: '500px'}}>
      <Typography.Title {...args} />
    </div>
  ),
};

export const Link: LinkStory = {
  argTypes: commonArgTypes,
  args: {
    ...commonArgs,
    children: 'Текст ссылки',
    href: '#',
  },
  render: (args) => (
    <div style={{width: '500px'}}>
      <Typography.Link {...args} />
    </div>
  ),
};

export const AllVariants: StoryObj = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '500px',
      }}
    >
      <Typography.Title level={1}>Заголовок 1 уровня</Typography.Title>
      <Typography.Title level={2}>Заголовок 2 уровня</Typography.Title>
      <Typography.Title level={3}>Заголовок 3 уровня</Typography.Title>

      <Typography.Paragraph>
        Обычный параграф текста с некоторым содержимым для демонстрации. Здесь
        может быть любой текст который нужно отобразить в виде параграфа.
      </Typography.Paragraph>

      <Typography.Text>Обычный текст</Typography.Text>
      <Typography.Text type='secondary'>Вторичный текст</Typography.Text>
      <Typography.Text type='success'>Текст успеха</Typography.Text>
      <Typography.Text type='warning'>Текст предупреждения</Typography.Text>
      <Typography.Text type='danger'>Текст ошибки</Typography.Text>

      <Typography.Text strong>Жирный текст</Typography.Text>
      <Typography.Text italic>Курсивный текст</Typography.Text>
      <Typography.Text underline>Подчеркнутый текст</Typography.Text>
      <Typography.Text mark>Выделенный текст</Typography.Text>
      <Typography.Text code>console.log('Код');</Typography.Text>
      <Typography.Text delete>Удаленный текст</Typography.Text>

      <Typography.Link href='#'>Обычная ссылка</Typography.Link>
      <Typography.Link href='#' type='success'>
        Ссылка успеха
      </Typography.Link>
    </div>
  ),
};

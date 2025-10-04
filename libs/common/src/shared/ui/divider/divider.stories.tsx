import {Divider} from './divider';
import {Typography} from '../typography';
import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof Divider> = {
  argTypes: {
    children: {
      control: 'text',
      description: 'Текст разделителя',
    },
    dashed: {
      control: 'boolean',
      description: 'Пунктирный стиль',
    },
    orientation: {
      control: {type: 'select'},
      description: 'Выравнивание текста',
      options: ['left', 'right', 'center'],
    },
    plain: {
      control: 'boolean',
      description: 'Упрощенный стиль текста',
    },
    type: {
      control: {type: 'select'},
      description: 'Тип разделителя',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    children: 'Разделитель',
    dashed: false,
    orientation: 'center',
    plain: false,
    type: 'horizontal',
  },
  component: Divider,
  tags: ['autodocs'],
  title: 'Components/Divider',
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{maxWidth: '800px', padding: '20px'}}>
      <Typography.Paragraph>
        Верхний контент перед разделителем. Здесь может быть любой текст или
        компоненты.
      </Typography.Paragraph>

      <Divider {...args} />

      <Typography.Paragraph>
        Нижний контент после разделителя. Здесь также может быть любой текст или
        компоненты.
      </Typography.Paragraph>
    </div>
  ),
};

export const WithContent: Story = {
  render: (args) => (
    <div style={{maxWidth: '800px', padding: '20px'}}>
      <Typography.Title level={3}>Разделители с контентом</Typography.Title>

      <Typography.Paragraph>
        Первый раздел контента. Этот текст находится над первым разделителем.
      </Typography.Paragraph>

      <Divider {...args} />

      <Typography.Paragraph>
        Второй раздел контента. Этот текст находится между разделителями.
      </Typography.Paragraph>

      <Divider {...args} children='Промежуточный разделитель' />

      <Typography.Paragraph>
        Третий раздел контента. Этот текст находится под последним разделителем.
      </Typography.Paragraph>
    </div>
  ),
};

export const VerticalExample: Story = {
  args: {
    children: undefined,
    type: 'vertical',
  },
  render: (args) => (
    <div style={{padding: '20px'}}>
      <Typography.Title level={4}>Вертикальные разделители</Typography.Title>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: '16px',
          height: '100px',
        }}
      >
        <Typography.Text>Левая секция</Typography.Text>
        <Divider {...args} type='vertical' />
        <Typography.Text>Центральная секция</Typography.Text>
        <Divider {...args} type='vertical' />
        <Typography.Text>Правая секция</Typography.Text>
      </div>
    </div>
  ),
};

export const InLayout: Story = {
  render: (args) => (
    <div style={{maxWidth: '600px', padding: '20px'}}>
      <Typography.Title level={2}>Заголовок страницы</Typography.Title>
      <Typography.Paragraph>
        Это введение в содержание страницы. Здесь описывается основная тема.
      </Typography.Paragraph>

      <Divider {...args} />

      <Typography.Title level={3}>Первый раздел</Typography.Title>
      <Typography.Paragraph>
        Содержание первого раздела. Здесь размещается основная информация по
        теме.
      </Typography.Paragraph>

      <Divider {...args} children='Раздел 2' orientation='left' />

      <Typography.Title level={3}>Второй раздел</Typography.Title>
      <Typography.Paragraph>
        Содержание второго раздела. Дополнительная информация и детали.
      </Typography.Paragraph>

      <Divider {...args} children='Заключение' orientation='right' />

      <Typography.Title level={3}>Заключение</Typography.Title>
      <Typography.Paragraph>
        Итоги и выводы по представленному материалу.
      </Typography.Paragraph>
    </div>
  ),
};

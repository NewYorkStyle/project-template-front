import {Typography} from '../typography';
import {Divider} from './divider';
import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof Divider> = {
  argTypes: {
    containerWidth: {
      control: {type: 'select'},
      description: 'Ширина контейнера',
      options: ['narrow', 'medium', 'wide'],
    },
    showMultiple: {
      control: 'boolean',
      description: 'Показать несколько разделителей',
    },
  },
  args: {
    containerWidth: 'medium',
    showMultiple: false,
  },
  component: Divider,
  tags: ['autodocs'],
  title: 'Components/Divider',
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    const widthMap = {
      medium: '400px',
      narrow: '200px',
      wide: '600px',
    };

    const containerStyle = {
      transition: 'width 0.3s ease',
      width: widthMap[args.containerWidth as keyof typeof widthMap],
    };

    return (
      <div style={containerStyle}>
        <Typography.Title level={3}>Разделитель</Typography.Title>
        <Typography.Paragraph>
          Измените ширину контейнера или включите несколько разделителей
        </Typography.Paragraph>

        <Typography.Paragraph>
          Контент над разделителем с некоторым текстом для демонстрации
        </Typography.Paragraph>

        <Divider />

        <Typography.Paragraph>
          Контент под разделителем с дополнительной информацией
        </Typography.Paragraph>

        {args.showMultiple && (
          <>
            <Typography.Title level={4} style={{marginTop: '20px'}}>
              Дополнительная секция
            </Typography.Title>
            <Typography.Paragraph>
              Ещё один блок контента перед вторым разделителем
            </Typography.Paragraph>

            <Divider />

            <Typography.Paragraph>
              Финальный блок контента после всех разделителей
            </Typography.Paragraph>
          </>
        )}
      </div>
    );
  },
};

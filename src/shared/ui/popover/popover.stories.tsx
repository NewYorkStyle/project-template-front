import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Button} from '../button';
import {Typography} from '../typography';

import {Popover} from './popover';

const meta: Meta<typeof Popover> = {
  argTypes: {
    color: {
      control: 'color',
      description: 'Цвет фона поповера',
    },
    placement: {
      control: {type: 'select' as const},
      description: 'Позиция поповера',
      options: [
        'top',
        'topLeft',
        'topRight',
        'bottom',
        'bottomLeft',
        'bottomRight',
        'left',
        'leftTop',
        'leftBottom',
        'right',
        'rightTop',
        'rightBottom',
      ],
    },
    title: {
      control: 'text',
      description: 'Заголовок поповера',
    },
    trigger: {
      control: {type: 'select' as const},
      description: 'Способ активации',
      options: ['hover', 'focus', 'click'],
    },
  },
  args: {
    placement: 'top',
    title: 'Заголовок поповера',
    trigger: 'hover',
  },
  component: Popover,
  tags: ['autodocs'],
  title: 'Components/Popover',
};

export default meta;
type TStory = StoryObj<typeof Popover>;

export const Default: TStory = {
  render: (args) => (
    <div style={{padding: '100px', textAlign: 'center'}}>
      <Typography.Title level={3}>Popover</Typography.Title>
      <Typography.Paragraph>
        Наведите на кнопку или кликните для показа поповера
      </Typography.Paragraph>

      <Popover
        {...args}
        content={
          <div style={{width: '200px'}}>
            <Typography.Paragraph>
              Это содержимое поповера. Здесь может быть любой контент.
            </Typography.Paragraph>
            <Button size='small'>Действие</Button>
          </div>
        }
      >
        <Button type='primary'>Открыть поповер</Button>
      </Popover>
    </div>
  ),
};

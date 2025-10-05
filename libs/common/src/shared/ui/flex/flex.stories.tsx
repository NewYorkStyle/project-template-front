import {Flex} from './flex';
import {Typography} from '../typography';
import type {Meta, StoryObj} from '@storybook/react';

const meta: Meta<typeof Flex> = {
  argTypes: {
    align: {
      control: {type: 'select'},
      description: 'Выравнивание по поперечной оси',
      options: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
    },
    gap: {
      control: {type: 'select'},
      description: 'Расстояние между элементами',
      options: ['small', 'middle', 'large'],
    },
    justify: {
      control: {type: 'select'},
      description: 'Выравнивание по главной оси',
      options: [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
      ],
    },
    vertical: {
      control: 'boolean',
      description: 'Вертикальное направление',
    },
    wrap: {
      control: 'boolean',
      description: 'Перенос элементов',
    },
  },
  args: {
    align: 'stretch',
    gap: 'middle',
    justify: 'flex-start',
    vertical: false,
    wrap: false,
  },
  component: Flex,
  tags: ['autodocs'],
  title: 'Components/Flex',
} satisfies Meta<typeof Flex>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  render: (args) => (
    <div style={{width: '500px'}}>
      <Flex
        {...args}
        style={{
          background: '#f5f5f5',
          marginTop: '16px',
          minHeight: '200px',
          padding: '20px',
        }}
      >
        <div
          style={{
            background: '#1890ff',
            borderRadius: '6px',
            color: 'white',
            padding: '16px',
          }}
        >
          <Typography.Text style={{color: 'white'}}>Элемент 1</Typography.Text>
        </div>
        <div
          style={{
            background: '#52c41a',
            borderRadius: '6px',
            color: 'white',
            padding: '16px',
          }}
        >
          <Typography.Text style={{color: 'white'}}>Элемент 2</Typography.Text>
        </div>
        <div
          style={{
            background: '#faad14',
            borderRadius: '6px',
            color: 'white',
            padding: '16px',
          }}
        >
          <Typography.Text style={{color: 'white'}}>Элемент 3</Typography.Text>
        </div>
        <div
          style={{
            background: '#f5222d',
            borderRadius: '6px',
            color: 'white',
            padding: '16px',
          }}
        >
          <Typography.Text style={{color: 'white'}}>Элемент 4</Typography.Text>
        </div>
      </Flex>
    </div>
  ),
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Button} from '../button';

import {Drawer} from './drawer';

const meta: Meta<typeof Drawer> = {
  argTypes: {
    closable: {
      control: 'boolean',
      description: 'Возможность закрыть drawer',
    },
    keyboard: {
      control: 'boolean',
      description: 'Закрытие по клавише ESC',
    },
    maskClosable: {
      control: 'boolean',
      description: 'Закрытие по клику на маску',
    },
    placement: {
      control: {type: 'select'},
      description: 'Позиция drawer',
      options: ['top', 'right', 'bottom', 'left'],
    },
    size: {
      control: {type: 'select'},
      description: 'Размер drawer',
      options: ['default', 'large'],
    },
    title: {
      control: 'text',
      description: 'Заголовок drawer',
    },
  },
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Drawer',
};

export default meta;

type TStory = StoryObj<typeof Drawer>;

// Базовый пример с использованием декоратора для управления состоянием
const DrawerWithState = (props: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type='primary' onClick={() => setOpen(true)}>
        Открыть Drawer
      </Button>
      <Drawer {...props} open={open} onClose={() => setOpen(false)}>
        <p>Содержимое drawer</p>
        <p>Можно разместить любые компоненты</p>
      </Drawer>
    </>
  );
};

export const Default: TStory = {
  args: {
    closable: true,
    placement: 'right',
    title: 'Базовый Drawer',
  },
  render: (args) => <DrawerWithState {...args} />,
};

export const LeftPlacement: TStory = {
  args: {
    placement: 'left',
    title: 'Drawer слева',
    width: 300,
  },
  render: (args) => <DrawerWithState {...args} />,
};

export const LargeSize: TStory = {
  args: {
    placement: 'right',
    size: 'large',
    title: 'Большой Drawer',
  },
  render: (args) => <DrawerWithState {...args} />,
};

export const WithoutTitle: TStory = {
  args: {
    closable: true,
    placement: 'right',
  },
  render: (args) => <DrawerWithState {...args} />,
};

export const NotClosable: TStory = {
  args: {
    closable: false,
    keyboard: false,
    maskClosable: false,
    title: 'Не закрываемый Drawer',
  },
  render: (args) => <DrawerWithState {...args} />,
};

export const CustomWidth: TStory = {
  args: {
    placement: 'right',
    title: 'Drawer с кастомной шириной',
    width: 500,
  },
  render: (args) => <DrawerWithState {...args} />,
};

export const WithExtraContent: TStory = {
  args: {
    extra: <Button type='link'>Действие</Button>,
    placement: 'right',
    title: 'Drawer с дополнительными элементами',
  },
  render: (args) => <DrawerWithState {...args} />,
};

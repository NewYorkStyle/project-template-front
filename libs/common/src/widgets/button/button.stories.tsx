import {Button} from './button';
import type {Meta, StoryObj} from '@storybook/react';
import noop from 'lodash/noop';

type ButtonPropsAndCustomArgs = React.ComponentProps<typeof Button> & {
  text?: string;
};

const meta: Meta<ButtonPropsAndCustomArgs> = {
  component: Button,
  render: ({text}) => <Button onClick={noop}>{text}</Button>,
};
export default meta;

export const ButtonStory: StoryObj = {
  argTypes: {
    analyticProps: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
    text: {
      control: 'text',
      defaultValue: 'Текст',
    },
  },
  args: {
    text: 'Текст кнопки',
  },
};

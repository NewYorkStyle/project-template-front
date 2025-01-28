import {Button} from './button';
import {E_BUTTON_SEVERITY} from '../../shared';
import {Logged} from '../svg/logged';
import type {Meta, StoryObj} from '@storybook/react';
import noop from 'lodash/noop';

type ButtonPropsAndCustomArgs = React.ComponentProps<typeof Button> & {
  text?: string;
  disabled?: boolean;
  icon?: boolean;
  rounded?: boolean;
};

const meta: Meta<ButtonPropsAndCustomArgs> = {
  component: Button,
  render: ({disabled, icon, rounded, severity, text}) => (
    <Button
      onClick={noop}
      disabled={disabled}
      rounded={rounded}
      icon={icon ? <Logged /> : undefined}
      severity={severity}
    >
      {text}
    </Button>
  ),
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
    icon: {
      control: 'boolean',
    },
    onClick: {
      table: {
        disable: true,
      },
    },
    severity: {
      control: {type: 'select'},
      options: Object.values(E_BUTTON_SEVERITY),
    },
    text: {
      control: 'text',
    },
  },
  args: {
    disabled: false,
    icon: false,
    rounded: false,
    severity: undefined,
    text: 'Текст кнопки',
  },
};

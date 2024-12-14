import {Switch} from './switch';
import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';

type SwitchPropsAndCustomArgs = React.ComponentProps<typeof Switch>;

const SwitchWithHook = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prevState) => !prevState);
  };

  return <Switch onChange={handleChange} checked={checked} />;
};

const meta: Meta<SwitchPropsAndCustomArgs> = {
  component: Switch,
  render: SwitchWithHook,
};
export default meta;

export const SwitchStory: StoryObj = {
  argTypes: {
    analyticProps: {
      table: {
        disable: true,
      },
    },
    checked: {
      table: {
        disable: true,
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
  },
};

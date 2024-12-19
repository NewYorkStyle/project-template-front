import {Input} from './input';
import {E_KEY_FILTER} from '../../shared';
import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';

type InputPropsAndCustomArgs = React.ComponentProps<typeof Input>;

const InputWithHook = ({
  keyfilter,
  placeholder,
}: {
  placeholder?: string;
  keyfilter?: E_KEY_FILTER | RegExp;
}) => {
  const [value, setValue] = useState('');

  const handleChange = (e: string) => {
    setValue(e);
  };

  return (
    <Input
      onChange={handleChange}
      value={value}
      keyfilter={keyfilter}
      placeholder={placeholder}
    />
  );
};

const meta: Meta<InputPropsAndCustomArgs> = {
  component: Input,
  render: ({keyfilter, placeholder}) => (
    <InputWithHook placeholder={placeholder} keyfilter={keyfilter} />
  ),
};
export default meta;

export const InputStory: StoryObj = {
  argTypes: {
    keyfilter: {
      options: Object.values(E_KEY_FILTER),
    },
    onChange: {
      table: {
        disable: true,
      },
    },
    placeholder: {
      control: 'text',
    },
    value: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    keyfilter: E_KEY_FILTER.ALPHA_NUM,
    placeholder: 'Placeholder',
  },
};

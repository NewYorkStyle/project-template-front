import {Dropdown, TDropdownOption} from './dropdown';
import type {Meta, StoryObj} from '@storybook/react';
import {DropdownChangeEvent} from 'primereact/dropdown';
import {useState} from 'react';

type DropdownPropsAndCustomArgs = React.ComponentProps<typeof Dropdown>;

const DropdownWithHook = ({
  options,
}: {
  options: Omit<TDropdownOption, 'icon' | 'analyticsLabel'>[];
}) => {
  const [value, setValue] = useState(1);

  const handleChange = (e: DropdownChangeEvent) => {
    setValue(e.value);
  };

  return <Dropdown onChange={handleChange} options={options} value={value} />;
};

const meta: Meta<DropdownPropsAndCustomArgs> = {
  component: Dropdown,
  render: ({options}) => <DropdownWithHook options={options} />,
};
export default meta;

const storyOptions: TDropdownOption[] = [];
for (let i = 0; i < 5; i++) {
  storyOptions.push({
    label: `Опция ${i + 1}`,
    value: i + 1,
  });
}

export const DropdownStory: StoryObj = {
  argTypes: {
    analyticProps: {
      table: {
        disable: true,
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
    value: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    options: storyOptions,
  },
};

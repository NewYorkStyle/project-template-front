import {E_POPOVER_POSITION, Popover} from './popover';
import {Button} from '../button/button';
import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';

type PopoverPropsAndCustomArgs = React.ComponentProps<typeof Popover>;

const PopoverWithHook = ({content, position}: PopoverPropsAndCustomArgs) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleOpen = () => {
    setIsPopoverOpen((prevState) => !prevState);
  };

  const handleClose = () => {
    setIsPopoverOpen(false);
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClose={handleClose}
      position={position}
      content={content}
    >
      <Button onClick={handleOpen}>Show popover</Button>
    </Popover>
  );
};

const meta: Meta<PopoverPropsAndCustomArgs> = {
  component: Popover,
  render: PopoverWithHook,
};
export default meta;

export const PopoverStory: StoryObj = {
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
    isOpen: {
      table: {
        disable: true,
      },
    },
    onClose: {
      table: {
        disable: true,
      },
    },
    position: {
      control: {type: 'select'},
      options: Object.values(E_POPOVER_POSITION),
    },
  },
  args: {
    content: 'Popover content',
    positiom: E_POPOVER_POSITION.BOTTOM,
  },
};

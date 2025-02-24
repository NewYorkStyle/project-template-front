import {Dialog} from './dialog';
import {Button} from '../button/button';
import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';

type DialogPropsAndCustomArgs = React.ComponentProps<typeof Dialog>;

const DialogWithHook = ({children, header}: DialogPropsAndCustomArgs) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpen = () => {
    setIsDialogOpen((prevState) => !prevState);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Show Dialog</Button>
      <Dialog visible={isDialogOpen} onClose={handleClose} header={header}>
        {children}
      </Dialog>
    </>
  );
};

const meta: Meta<DialogPropsAndCustomArgs> = {
  component: Dialog,
  render: DialogWithHook,
};
export default meta;

export const DialogStory: StoryObj = {
  argTypes: {
    analyticProps: {
      table: {
        disable: true,
      },
    },
    children: {
      control: {type: 'text'},
    },
    header: {
      control: {type: 'text'},
    },
    onClose: {
      table: {
        disable: true,
      },
    },
    visible: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    children: 'Dialog content',
    header: 'Dialog header',
  },
};

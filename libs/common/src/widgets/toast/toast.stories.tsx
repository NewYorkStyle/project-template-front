import {ToastProvider, showToast} from './toast-provider';
import {E_TOAST_SEVERITY} from '../../shared';
import {Button} from '../button/button';
import type {Meta, StoryObj} from '@storybook/react';

type TToastArgs = {
  summary: string;
  severity: E_TOAST_SEVERITY;
  detail?: string;
};

const ButtonWithToast = ({detail, severity, summary}: TToastArgs) => {
  const handleButtonClick = () => {
    showToast({
      detail,
      severity,
      summary,
    });
  };

  return (
    <ToastProvider>
      <Button onClick={handleButtonClick}>Click</Button>{' '}
    </ToastProvider>
  );
};

const meta: Meta<TToastArgs> = {
  render: ({detail, severity, summary}) => (
    <ButtonWithToast summary={summary} severity={severity} detail={detail} />
  ),
};
export default meta;

export const ToastStory: StoryObj = {
  argTypes: {
    severity: {
      control: {type: 'select'},
      options: Object.values(E_TOAST_SEVERITY),
    },
  },
  args: {
    detail: 'Detail',
    severity: E_TOAST_SEVERITY.INFO,
    summary: 'Summary',
  },
};

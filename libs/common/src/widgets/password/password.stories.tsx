import {Password, TSuggestion} from './password';
import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';

type PasswordPropsAndCustomArgs = React.ComponentProps<typeof Password>;

const PasswordWithHook = ({
  feedback,
  mediumLabel,
  placeholder,
  promptLabel,
  strongLabel,
  suggestions,
  toggleMask,
  weakLabel,
}: {
  placeholder?: string;
  toggleMask?: boolean;
  feedback?: boolean;
  suggestions?: TSuggestion;
  promptLabel?: string;
  weakLabel?: string;
  mediumLabel?: string;
  strongLabel?: string;
}) => {
  const [password, setPassword] = useState('');

  const handleChange = (e: string) => {
    setPassword(e);
  };

  return (
    <Password
      onChange={handleChange}
      value={password}
      placeholder={placeholder}
      toggleMask={toggleMask}
      suggestions={suggestions}
      feedback={feedback}
      promptLabel={promptLabel}
      weakLabel={weakLabel}
      mediumLabel={mediumLabel}
      strongLabel={strongLabel}
    />
  );
};

const meta: Meta<PasswordPropsAndCustomArgs> = {
  component: Password,
  render: ({
    feedback,
    mediumLabel,
    placeholder,
    promptLabel,
    strongLabel,
    suggestions,
    toggleMask,
    weakLabel,
  }) => (
    <PasswordWithHook
      placeholder={placeholder}
      feedback={feedback}
      mediumLabel={mediumLabel}
      promptLabel={promptLabel}
      strongLabel={strongLabel}
      suggestions={suggestions}
      toggleMask={toggleMask}
      weakLabel={weakLabel}
    />
  ),
};
export default meta;

const passwordSuggestions: TSuggestion = {
  header: 'Header',
  requirements: ['requirement1', 'requirement2', 'requirement3'],
};

export const PasswordStory: StoryObj = {
  argTypes: {
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
    feedback: true,
    mediumLabel: 'Средний пароль',
    placeholder: 'Placeholder',
    promptLabel: 'Введите пароль',
    strongLabel: 'Сильный пароль',
    suggestions: passwordSuggestions,
    toggleMask: true,
    weakLabel: 'Слабый пароль',
  },
};

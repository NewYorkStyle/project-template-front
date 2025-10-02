import {Input} from './input';
import {Typography} from '../typography';
import type {Meta, StoryObj} from '@storybook/react';

const baseArgTypes = {
  allowClear: {
    control: 'boolean' as const,
    description: 'Возможность очистки',
  },
  disabled: {
    control: 'boolean' as const,
    description: 'Отключенное состояние',
  },
  placeholder: {
    control: 'text' as const,
    description: 'Плейсхолдер',
  },
  size: {
    control: {type: 'select' as const},
    description: 'Размер инпута',
    options: ['small', 'middle', 'large'],
  },
  variant: {
    control: {type: 'select' as const},
    description: 'Вариант стиля',
    options: ['outlined', 'borderless', 'filled'],
  },
};

const baseArgs = {
  allowClear: false,
  disabled: false,
  placeholder: 'Введите текст...',
  size: 'middle' as const,
  variant: 'outlined' as const,
};

const inputMeta: Meta<typeof Input> = {
  argTypes: baseArgTypes,
  args: baseArgs,
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
};

export default inputMeta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => (
    <div style={{width: '400px'}}>
      <Typography.Title level={3}>Input</Typography.Title>
      <Typography.Paragraph>Базовый компонент ввода</Typography.Paragraph>
      <Input {...args} />
    </div>
  ),
};

type PasswordStory = StoryObj<typeof Input.Password>;

export const Password: PasswordStory = {
  argTypes: baseArgTypes,
  args: {
    ...baseArgs,
    placeholder: 'Введите пароль...',
  },
  render: (args) => (
    <div style={{width: '400px'}}>
      <Typography.Title level={3}>Password Input</Typography.Title>
      <Typography.Paragraph>
        Поле для ввода пароля с переключателем видимости
      </Typography.Paragraph>
      <Input.Password {...args} />
    </div>
  ),
};

type SearchStory = StoryObj<typeof Input.Search>;

export const Search: SearchStory = {
  argTypes: baseArgTypes,
  args: {
    ...baseArgs,
    placeholder: 'Поиск...',
  },
  render: (args) => (
    <div style={{width: '400px'}}>
      <Typography.Title level={3}>Search Input</Typography.Title>
      <Typography.Paragraph>Поле поиска с кнопкой</Typography.Paragraph>
      <Input.Search {...args} />
    </div>
  ),
};

type TextAreaStory = StoryObj<typeof Input.TextArea>;

export const TextArea: TextAreaStory = {
  argTypes: {
    ...baseArgTypes,
    rows: {
      control: {max: 10, min: 1, type: 'number' as const},
      description: 'Количество строк',
    },
    showCount: {
      control: 'boolean' as const,
      description: 'Показывать счетчик символов',
    },
  },
  args: {
    ...baseArgs,
    placeholder: 'Введите многострочный текст...',
    rows: 3,
    showCount: false,
  },
  render: (args) => (
    <div style={{width: '400px'}}>
      <Typography.Title level={3}>TextArea</Typography.Title>
      <Typography.Paragraph>Многострочное поле ввода</Typography.Paragraph>
      <Input.TextArea
        rows={args.rows}
        showCount={args.showCount}
        placeholder={args.placeholder}
        disabled={args.disabled}
        size={args.size}
        variant={args.variant}
        allowClear={args.allowClear}
      />
    </div>
  ),
};

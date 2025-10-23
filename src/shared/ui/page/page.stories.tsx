import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Typography} from '../typography';

import {Page} from './page';

const meta = {
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  title: 'Components/Page',
} satisfies Meta<typeof Page>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    children: (
      <div style={{padding: '20px'}}>
        <Typography.Title level={1}>Контент страницы</Typography.Title>
        <Typography.Paragraph>
          Это пример содержимого страницы с установленным заголовком.
        </Typography.Paragraph>
      </div>
    ),
    title: 'Заголовок страницы',
  },
};

export const EmptyPage: TStory = {
  args: {
    children: null,
    title: 'Пустая страница',
  },
};

export const WithLongTitle: TStory = {
  args: {
    children: (
      <div style={{padding: '20px'}}>
        <Typography.Paragraph>
          Страница с очень длинным заголовком.
        </Typography.Paragraph>
      </div>
    ),
    title:
      'Очень длинный заголовок страницы который может не поместиться в табе браузера но компонент должен корректно его обработать',
  },
};

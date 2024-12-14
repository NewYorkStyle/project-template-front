import type {StorybookConfig} from '@storybook/react-webpack5';

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@nx/react/plugins/storybook',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  stories: ['../src/widgets/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
};

export default config;

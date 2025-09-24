import {createRequire} from 'node:module';
import {dirname, join} from 'node:path';
import type {StorybookConfig} from '@storybook/react-webpack5';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  addons: [
    getAbsolutePath('@nx/react/plugins/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  stories: ['../src/widgets/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
};

export default config;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

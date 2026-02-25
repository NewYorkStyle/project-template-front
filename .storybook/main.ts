import path from 'path';

import type {StorybookConfig} from '@storybook/react-webpack5';

const globalScssPath = path.resolve(
  __dirname,
  '../src/app/styles/variables.scss'
);

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../src/**/*.mdx'],
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
      shouldExtractLiteralValuesFromEnum: true,
    },
  },
  webpackFinal: (config) => {
    config.module?.rules?.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
    });

    config.module?.rules?.push({
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              javascriptEnabled: true,
            },
          },
        },
        {
          loader: 'style-resources-loader',
          options: {
            patterns: [globalScssPath],
          },
        },
      ],
    });

    if (config.resolve) {
      config.resolve.extensions = [
        ...(config.resolve.extensions || []),
        '.ts',
        '.tsx',
      ];
      config.resolve.alias = {
        ...config.resolve.alias,
        '@entities': path.resolve(__dirname, '../src/entities'),
        '@shared': path.resolve(__dirname, '../src/shared'),
        '@pages': path.resolve(__dirname, '../src/pages'),
        '@features': path.resolve(__dirname, '../src/features'),
        '@widgets': path.resolve(__dirname, '../src/widgets'),
        '@common': path.resolve(__dirname, '../src/common'),
      };
    }

    return config;
  },
};

export default config;

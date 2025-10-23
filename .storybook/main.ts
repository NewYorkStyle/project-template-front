import path from 'path';

import type {StorybookConfig} from '@storybook/react-webpack5';

// Упрощенная версия плагина
const withGlobalLessResources = () => (config: any) => {
  const lessResources = [
    path.resolve(__dirname, '../src/app/styles/variables.less'),
  ];

  // Находим все правила с less-loader и добавляем style-resources-loader
  config.module?.rules?.forEach((rule: any) => {
    if (rule.test && rule.test.toString().includes('less')) {
      if (Array.isArray(rule.use)) {
        const lessLoaderIndex = rule.use.findIndex(
          (use: any) =>
            typeof use === 'object' &&
            use.loader &&
            use.loader.includes('less-loader')
        );

        if (lessLoaderIndex !== -1) {
          rule.use.splice(lessLoaderIndex + 1, 0, {
            loader: 'style-resources-loader',
            options: {
              patterns: lessResources,
            },
          });
        }
      }
    }
  });

  return config;
};

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
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
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
    }

    return withGlobalLessResources()(config);
  },
};

export default config;

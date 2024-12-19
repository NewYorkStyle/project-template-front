import {ModuleFederationConfig} from '@nx/webpack';

const config: ModuleFederationConfig = {
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  name: 'authentication',
};

export default config;

import {ModuleFederationConfig} from '@nx/webpack';

const config: ModuleFederationConfig = {
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  name: 'main',
};

export default config;

import type {ModuleFederationConfig} from '@nx/module-federation';

const config: ModuleFederationConfig = {
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  name: 'main',
};

export default config;

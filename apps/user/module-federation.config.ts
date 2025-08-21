import type {ModuleFederationConfig} from '@nx/module-federation';

const config: ModuleFederationConfig = {
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  name: 'user',
};

export default config;

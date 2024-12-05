import {ModuleFederationConfig} from '@nx/webpack';

const config: ModuleFederationConfig = {
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  name: 'main',
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;

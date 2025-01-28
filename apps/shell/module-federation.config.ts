import {ModuleFederationConfig} from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: ['main', 'authentication', 'user'],
};

export default config;

import {ModuleFederationConfig} from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: ['main', 'authentication', 'user'],
};

export default config;

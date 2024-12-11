import baseConfig from './module-federation.config';
import {withReact} from '@nx/react';
import {withModuleFederation} from '@nx/react/module-federation';
import {composePlugins, withNx} from '@nx/webpack';
import {ModuleFederationConfig} from '@nx/webpack';

const prodConfig: ModuleFederationConfig = {
  ...baseConfig,
  remotes: [['main', 'http://localhost:4201/']],
};

export default composePlugins(
  withNx(),
  withReact(),
  withModuleFederation(prodConfig, {dts: false})
);

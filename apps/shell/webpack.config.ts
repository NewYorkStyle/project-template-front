import baseConfig from './module-federation.config';
import {withReact} from '@nx/react';
import {withModuleFederation} from '@nx/react/module-federation';
import {ModuleFederationConfig, composePlugins, withNx} from '@nx/webpack';

const config: ModuleFederationConfig = {
  ...baseConfig,
};

export default composePlugins(withNx(), withReact(), withModuleFederation(config, {dts: false}));

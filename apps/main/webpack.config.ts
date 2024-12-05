import baseConfig from './module-federation.config';
import {withReact} from '@nx/react';
import {withModuleFederation} from '@nx/react/module-federation';
import {composePlugins, withNx} from '@nx/webpack';

const config = {
  ...baseConfig,
};

export default composePlugins(withNx(), withReact(), withModuleFederation(config, {dts: false}));

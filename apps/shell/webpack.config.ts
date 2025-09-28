import baseConfig from './module-federation.config';
import {withGlobalLessResources} from '../../tools/webpack/plugins/with-global-less-resources';
import {withIgnoreWarnings} from '../../tools/webpack/plugins/with-ignore-warnings';
import {ModuleFederationConfig} from '@nx/module-federation';
import {withReact} from '@nx/react';
import {withModuleFederation} from '@nx/react/module-federation';
import {composePlugins, withNx} from '@nx/webpack';

const config: ModuleFederationConfig = {...baseConfig};

export default composePlugins(
  withNx(),
  withReact(),
  withModuleFederation(config, {dts: false}),
  withGlobalLessResources(),
  (config) => withIgnoreWarnings(config)
);

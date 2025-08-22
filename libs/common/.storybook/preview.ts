import 'primereact/resources/themes/lara-dark-blue/theme.css';
// eslint-disable-next-line @nx/enforce-module-boundaries
import 'apps/shell/src/styles.less';

import {Preview} from '@storybook/react';

const preview: Preview = {
  parameters: {
    layout: 'centered',
  },
};

export default preview;

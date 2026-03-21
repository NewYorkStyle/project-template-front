import '../src/app/styles/global.scss';

import React, {useState} from 'react';

import {Icon, UiProvider} from '@new_york_style/project-template-ui';
import type {Preview} from '@storybook/react-webpack5';

import {Segmented, designTokens} from '../src/shared';

const ThemeWrapper = (Story: React.ComponentType) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('sb-theme')
        : null;
    return saved === 'light' || saved === 'dark' ? saved : 'dark';
  });

  const handleChange = (value: 'dark' | 'light') => {
    setTheme(value);
    try {
      window.localStorage.setItem('sb-theme', value);
    } catch {
      // noop
    }
  };

  return (
    <UiProvider tokens={designTokens.colors[theme]}>
      <div
        data-theme={theme}
        style={{
          alignItems: 'center',
          background: designTokens.colors[theme].backgroundPrimary,
          display: 'flex',
          justifyContent: 'center',
          minHeight: '85vh',
          minWidth: '95vw',
          padding: '20px',
        }}
      >
        {/* Тоггл для переключения темы */}
        <div
          style={{
            left: '30px',
            position: 'fixed',
            top: '30px',
            zIndex: 1000,
          }}
        >
          <Segmented
            shape='round'
            options={[
              {icon: <Icon name='bulbLightning' />, value: 'light'},
              {icon: <Icon name='moon' />, value: 'dark'},
            ]}
            onChange={(value) => handleChange(value as 'dark' | 'light')}
            value={theme}
            size='small'
          />
        </div>
        <Story />
      </div>
    </UiProvider>
  );
};

const preview: Preview = {
  decorators: [ThemeWrapper],
  parameters: {
    layout: 'centered',
  },
};

export default preview;

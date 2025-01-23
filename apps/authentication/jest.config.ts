export default {
  coverageDirectory: '../../coverage/apps/authentication',
  displayName: 'authentication',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', {presets: ['@nx/react/babel']}],
  },
};

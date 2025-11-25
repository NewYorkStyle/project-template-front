export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setup-tests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(ts|tsx)',
    '<rootDir>/src/**/*.(test|spec).(ts|tsx)',
  ],
  collectCoverageFrom: [
    'src/shared/**/*.{js,jsx,ts,tsx}',
    '!src/shared/**/*.d.ts',
    '!src/shared/**/*.stories.{js,jsx,ts,tsx}',
    '!src/shared/**/*.test.{js,jsx,ts,tsx}',
    '!src/shared/**/__tests__/**',
    '!src/shared/**/__mocks__/**',
    '!src/shared/**/index.ts',
  ],
};

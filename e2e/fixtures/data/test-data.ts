import {TEST_IDS} from '../../shared/constants';

export const selectors = {
  auth: {
    password: `[data-testid="${TEST_IDS.AUTH.PASSWORD}"]`,
    signIn: `[data-testid="${TEST_IDS.AUTH.SIGN_IN}"]`,
    username: `[data-testid="${TEST_IDS.AUTH.USER_NAME}"]`,
  },
};

export const waitConfig = {
  long: 5000,
  medium: 3000,
  networkIdle: 'networkidle',
  short: 1000,
};

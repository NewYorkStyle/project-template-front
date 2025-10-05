const ROUTE_BASE = {
  AUTH: '/auth',
  MAIN: '/main',
  USER: '/user',
};

export const ROUTES = {
  AUTH: {
    LOGIN: `${ROUTE_BASE.AUTH}/login`,
    REGISTER: `${ROUTE_BASE.AUTH}/register`,
    ROOT: ROUTE_BASE.AUTH,
  },
  MAIN: {
    ROOT: ROUTE_BASE.MAIN,
  },
  NOT_FOUND: '*',
  USER: {
    PROFILE: `${ROUTE_BASE.USER}/profile`,
    ROOT: ROUTE_BASE.USER,
  },
};

export const USER_CHILD_ROUTES = {
  PROFILE: 'profile',
};

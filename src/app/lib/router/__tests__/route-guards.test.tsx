import {render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {APP_ROUTES} from '@shared';

import {ProtectedRoute} from '../protected-route';
import {PublicRoute} from '../public-route';

const routeMocks = vi.hoisted(() => ({
  useAuth: vi.fn(() => ({isUserLogged: false})),
}));

vi.mock('@entities', () => ({
  useAuth: routeMocks.useAuth,
}));

describe('router guards', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    routeMocks.useAuth.mockReturnValue({isUserLogged: false});
  });

  it('ProtectedRoute redirects guest user to auth page', () => {
    render(
      <MemoryRouter initialEntries={[APP_ROUTES.USER.ROOT]}>
        <Routes>
          <Route
            path={APP_ROUTES.USER.ROOT}
            element={
              <ProtectedRoute>
                <div>private page</div>
              </ProtectedRoute>
            }
          />
          <Route path={APP_ROUTES.AUTH.ROOT} element={<div>auth page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('auth page')).toBeInTheDocument();
  });

  it('ProtectedRoute renders children for logged user', () => {
    routeMocks.useAuth.mockReturnValue({isUserLogged: true});

    render(
      <MemoryRouter initialEntries={[APP_ROUTES.USER.ROOT]}>
        <Routes>
          <Route
            path={APP_ROUTES.USER.ROOT}
            element={
              <ProtectedRoute>
                <div>private page</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('private page')).toBeInTheDocument();
  });

  it('PublicRoute redirects logged user to from pathname', () => {
    routeMocks.useAuth.mockReturnValue({isUserLogged: true});

    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: APP_ROUTES.AUTH.ROOT,
            state: {from: {pathname: APP_ROUTES.USER.ROOT}},
          },
        ]}
      >
        <Routes>
          <Route
            path={APP_ROUTES.AUTH.ROOT}
            element={
              <PublicRoute>
                <div>auth form</div>
              </PublicRoute>
            }
          />
          <Route
            path={APP_ROUTES.USER.ROOT}
            element={<div>profile page</div>}
          />
          <Route path={APP_ROUTES.HOME.ROOT} element={<div>home page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('profile page')).toBeInTheDocument();
  });

  it('PublicRoute redirects logged user to home when from is missing', () => {
    routeMocks.useAuth.mockReturnValue({isUserLogged: true});

    render(
      <MemoryRouter initialEntries={[APP_ROUTES.AUTH.ROOT]}>
        <Routes>
          <Route
            path={APP_ROUTES.AUTH.ROOT}
            element={
              <PublicRoute>
                <div>auth form</div>
              </PublicRoute>
            }
          />
          <Route path={APP_ROUTES.HOME.ROOT} element={<div>home page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('home page')).toBeInTheDocument();
  });

  it('PublicRoute renders children for guest user', () => {
    render(
      <MemoryRouter initialEntries={[APP_ROUTES.AUTH.ROOT]}>
        <Routes>
          <Route
            path={APP_ROUTES.AUTH.ROOT}
            element={
              <PublicRoute>
                <div>auth form</div>
              </PublicRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('auth form')).toBeInTheDocument();
  });
});

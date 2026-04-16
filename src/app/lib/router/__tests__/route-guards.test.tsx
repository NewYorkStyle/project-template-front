import type {ReactElement} from 'react';

import {render, screen} from '@testing-library/react';
import {I18nextProvider} from 'react-i18next';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {APP_ROUTES, i18nInstance} from '@shared';

import {ProtectedRoute} from '../protected-route';
import {PublicRoute} from '../public-route';

const defaultAuth = {
  isUserLogged: false,
  isSessionLoading: false,
  sessionConfirmed: false,
  sessionError: false,
  refetchSession: vi.fn(),
};

const routeMocks = vi.hoisted(() => ({
  useAuth: vi.fn(() => defaultAuth),
}));

vi.mock('@entities', () => ({
  useAuth: routeMocks.useAuth,
}));

const renderWithI18n = (ui: ReactElement) =>
  render(<I18nextProvider i18n={i18nInstance}>{ui}</I18nextProvider>);

describe('router guards', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    routeMocks.useAuth.mockReturnValue({...defaultAuth});
  });

  it('ProtectedRoute redirects guest user to auth page', () => {
    renderWithI18n(
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

  it('ProtectedRoute shows spinner while session is loading', () => {
    routeMocks.useAuth.mockReturnValue({
      ...defaultAuth,
      isUserLogged: true,
      isSessionLoading: true,
    });

    const {container} = renderWithI18n(
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

    expect(container.querySelector('.ant-spin')).toBeInTheDocument();
    expect(screen.queryByText('private page')).not.toBeInTheDocument();
  });

  it('ProtectedRoute renders children when session is confirmed', () => {
    routeMocks.useAuth.mockReturnValue({
      ...defaultAuth,
      isUserLogged: true,
      sessionConfirmed: true,
    });

    renderWithI18n(
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

  it('ProtectedRoute: спиннер, если по cookie пользователь вошёл, а сессия ещё не разрешена (idle gap)', () => {
    routeMocks.useAuth.mockReturnValue({
      ...defaultAuth,
      isUserLogged: true,
      isSessionLoading: false,
      sessionConfirmed: false,
      sessionError: false,
    });

    const {container} = renderWithI18n(
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

    expect(container.querySelector('.ant-spin')).toBeInTheDocument();
    expect(screen.queryByText('private page')).not.toBeInTheDocument();
    expect(screen.queryByText('auth page')).not.toBeInTheDocument();
  });

  it('PublicRoute redirects logged user with confirmed session to from pathname', () => {
    routeMocks.useAuth.mockReturnValue({
      ...defaultAuth,
      isUserLogged: true,
      sessionConfirmed: true,
    });

    renderWithI18n(
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
    routeMocks.useAuth.mockReturnValue({
      ...defaultAuth,
      isUserLogged: true,
      sessionConfirmed: true,
    });

    renderWithI18n(
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
    renderWithI18n(
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

  it('PublicRoute: спиннер, если по cookie пользователь вошёл, а сессия ещё не разрешена (idle gap)', () => {
    routeMocks.useAuth.mockReturnValue({
      ...defaultAuth,
      isUserLogged: true,
      isSessionLoading: false,
      sessionConfirmed: false,
      sessionError: false,
    });

    const {container} = renderWithI18n(
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

    expect(container.querySelector('.ant-spin')).toBeInTheDocument();
    expect(screen.queryByText('auth form')).not.toBeInTheDocument();
  });
});

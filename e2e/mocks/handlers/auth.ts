/* eslint-disable no-console */
import {type Page} from '@playwright/test';

import {testUsers} from '../../shared/index.js';

// Вспомогательная функция для установки cookies
const setAuthCookies = async (page: Page, userId?: string) => {
  const cookies = [
    {
      domain: 'localhost',
      name: 'isUserLoggedIn',
      path: '/',
      value: 'true',
    },
    {
      domain: 'localhost',
      name: 'accessToken',
      path: '/',
      value: 'mock-access-token',
    },
    {
      domain: 'localhost',
      name: 'refreshToken',
      path: '/',
      value: 'mock-refresh-token',
    },
    {
      domain: 'localhost',
      name: 'userId',
      path: '/',
      value: userId || 'mock-user-id',
    },
  ];

  try {
    await page.context().addCookies(cookies);
  } catch (error) {
    console.error('Failed to set auth cookies:', error);
  }
};

export const setupAuthMocks = (page: Page) => {
  // Вход пользователя - POST /auth/signIn
  page.route('**/api/auth/signIn', async (route) => {
    const request = route.request();
    const postData = await request.postDataJSON();

    const user = Object.values(testUsers).find(
      (u) =>
        u.username === postData?.username && u.password === postData?.password
    );

    if (user) {
      await setAuthCookies(page, user.id);

      return route.fulfill({
        body: JSON.stringify({
          message: 'User logged in',
          user: {id: user.id, username: user.username},
        }),
        contentType: 'application/json',
        status: 200,
      });
    }

    return route.fulfill({
      body: JSON.stringify({error: 'Invalid credentials'}),
      contentType: 'application/json',
      status: 401,
    });
  });

  // Регистрация - POST /auth/signUp
  page.route('**/api/auth/signUp', async (route) => {
    const request = route.request();
    const postData = await request.postDataJSON();

    const userExists = Object.values(testUsers).some(
      (u) => u.username === postData?.username || u.email === postData?.email
    );

    if (userExists) {
      return route.fulfill({
        body: JSON.stringify({error: 'User already exists'}),
        contentType: 'application/json',
        status: 409,
      });
    }

    await setAuthCookies(page, 'new-user-id');

    return route.fulfill({
      body: JSON.stringify('User registered'),
      contentType: 'application/json',
      status: 200,
    });
  });

  // Выход - GET /auth/logout
  page.route('**/api/auth/logout', async (route) => {
    await page.context().clearCookies();

    return route.fulfill({
      body: JSON.stringify('User logged out'),
      contentType: 'application/json',
      status: 200,
    });
  });

  // Обновление токенов - GET /auth/refresh
  page.route('**/api/auth/refresh', async (route) => {
    await page.context().addCookies([
      {
        domain: 'localhost',
        name: 'accessToken',
        path: '/',
        value: 'new-mock-access-token',
      },
      {
        domain: 'localhost',
        name: 'refreshToken',
        path: '/',
        value: 'new-mock-refresh-token',
      },
    ]);

    return route.fulfill({
      body: JSON.stringify('Token refreshed'),
      contentType: 'application/json',
      status: 200,
    });
  });
};

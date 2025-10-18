import {type Page} from '@playwright/test';

import {testUsers} from '../../shared/index.js';

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
      return route.fulfill({
        body: JSON.stringify('User logged in'),
        contentType: 'application/json',
        headers: {
          'Set-Cookie': [
            'accessToken=mock-access-token; HttpOnly; Path=/; Max-Age=2592000; SameSite=Strict; Secure',
            'refreshToken=mock-refresh-token; HttpOnly; Path=/; Max-Age=2592000; SameSite=Strict; Secure',
            'userId=mock-user-id; HttpOnly; Path=/; Max-Age=2592000; SameSite=Strict; Secure',
            'isUserLoggedIn=true; Path=/; Max-Age=2592000; SameSite=Strict; Secure',
          ].join(', '),
        },
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

    return route.fulfill({
      body: JSON.stringify('User registred'),
      contentType: 'application/json',
      headers: {
        'Set-Cookie': [
          'accessToken=mock-access-token; HttpOnly; Path=/; Max-Age=2592000; SameSite=Strict; Secure',
          'refreshToken=mock-refresh-token; HttpOnly; Path=/; Max-Age=2592000; SameSite=Strict; Secure',
          'userId=mock-user-id; HttpOnly; Path=/; Max-Age=2592000; SameSite=Strict; Secure',
          'isUserLoggedIn=true; Path=/; Max-Age=2592000; SameSite=Strict; Secure',
        ].join(', '),
      },
      status: 200,
    });
  });

  // Выход - GET /auth/logout
  page.route('**/api/auth/logout', (route) => {
    return route.fulfill({
      body: JSON.stringify('User logged out'),
      contentType: 'application/json',
      headers: {
        'Set-Cookie': [
          'accessToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure',
          'refreshToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure',
          'userId=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure',
          'isUserLoggedIn=; Path=/; Max-Age=0; SameSite=Strict; Secure',
        ].join(', '),
      },
      status: 200,
    });
  });

  // Обновление токенов - GET /auth/refresh
  page.route('**/api/auth/refresh', (route) => {
    return route.fulfill({
      body: JSON.stringify('Token refreshed'),
      contentType: 'application/json',
      headers: {
        'Set-Cookie': [
          'accessToken=new-mock-access-token; HttpOnly; Path=/; Max-Age=2592000; SameSite=Strict; Secure',
          'refreshToken=new-mock-refresh-token; HttpOnly; Path=/; Max-Age=2592000; SameSite=Strict; Secure',
          'isUserLoggedIn=true; Path=/; Max-Age=2592000; SameSite=Strict; Secure',
        ].join(', '),
      },
      status: 200,
    });
  });
};

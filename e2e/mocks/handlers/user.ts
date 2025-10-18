/* eslint-disable @typescript-eslint/no-unused-vars */
import {type Page} from '@playwright/test';

import {testUsers} from '../../shared/index.js';

export const setupUsersMocks = (page: Page) => {
  // Получение профиля - GET /users/getProfile
  page.route('**/api/users/getProfile', (route) => {
    const {password, ...profile} = testUsers.admin;
    return route.fulfill({
      body: JSON.stringify(profile),
      contentType: 'application/json',
      status: 200,
    });
  });

  // Обновление профиля - POST /users/update
  page.route('**/api/users/update', async (route) => {
    const request = route.request();
    const postData = await request.postDataJSON();

    const {password, ...currentProfile} = testUsers.admin;
    const updatedProfile = {...currentProfile, ...postData};

    return route.fulfill({
      body: JSON.stringify(updatedProfile),
      contentType: 'application/json',
      status: 200,
    });
  });

  // Получение permissions - GET /users/permissions
  page.route('**/api/users/permissions', (route) => {
    return route.fulfill({
      body: JSON.stringify(['email_verified']),
      contentType: 'application/json',
      status: 200,
    });
  });

  // Запрос верификации email - GET /users/requestEmailVerification
  page.route('**/api/users/requestEmailVerification', (route) => {
    return route.fulfill({
      body: JSON.stringify('OTP sent'),
      contentType: 'application/json',
      status: 200,
    });
  });

  // Верификация email - POST /users/verifyEmail
  page.route('**/api/users/verifyEmail', (route) => {
    return route.fulfill({
      body: JSON.stringify('OTP verified'),
      contentType: 'application/json',
      status: 200,
    });
  });

  // Запрос смены email - POST /users/emailChangeRequest
  page.route('**/api/users/emailChangeRequest', (route) => {
    return route.fulfill({
      body: JSON.stringify('OTP for email change sent'),
      contentType: 'application/json',
      status: 200,
    });
  });

  // Смена email - POST /users/emailChange
  page.route('**/api/users/emailChange', (route) => {
    return route.fulfill({
      body: JSON.stringify('Email successfully changed'),
      contentType: 'application/json',
      status: 200,
    });
  });

  // Удаление пользователя - POST /users/delete
  page.route('**/api/users/delete', async (route) => {
    const request = route.request();
    const postData = await request.postDataJSON();

    if (postData?.password === testUsers.admin.password) {
      return route.fulfill({
        body: JSON.stringify('User deleted'),
        contentType: 'application/json',
        status: 200,
      });
    }

    return route.fulfill({
      body: JSON.stringify({error: 'Invalid password'}),
      contentType: 'application/json',
      status: 401,
    });
  });
};

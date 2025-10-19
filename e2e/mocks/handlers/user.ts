/* eslint-disable @typescript-eslint/no-unused-vars */
import {type Page} from '@playwright/test';

import {E_PERMISSIONS, testUsers} from '../../shared';
import {invalidOTP, validOTP} from '../data';

// Глобальное состояние для моков
let userPermissions: E_PERMISSIONS[] = [];

// Функция для установки permissions
export const setUserPermissions = (permissions: E_PERMISSIONS[]): void => {
  userPermissions = [...permissions];
};

// Функция для сброса к дефолтным значениям
export const resetUserPermissions = (): void => {
  userPermissions = [];
};

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
      body: JSON.stringify(userPermissions),
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
  page.route('**/api/users/verifyEmail', async (route) => {
    const request = route.request();
    const postData = await request.postDataJSON();

    // Проверяем OTP код
    if (postData?.otp === validOTP) {
      // После успешной верификации добавляем permission
      if (!userPermissions.includes(E_PERMISSIONS.EMAIL_VERIFIED)) {
        userPermissions.push(E_PERMISSIONS.EMAIL_VERIFIED);
      }

      return route.fulfill({
        body: JSON.stringify({
          message: 'Email successfully verified',
          success: true,
        }),
        contentType: 'application/json',
        status: 200,
      });
    } else if (postData?.otp === invalidOTP) {
      return route.fulfill({
        body: JSON.stringify({
          error: 'Invalid OTP code',
          success: false,
        }),
        contentType: 'application/json',
        status: 400,
      });
    } else {
      // Для любых других OTP кодов
      return route.fulfill({
        body: JSON.stringify({
          error: 'Invalid OTP code',
          success: false,
        }),
        contentType: 'application/json',
        status: 400,
      });
    }
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
  page.route('**/api/users/emailChange', async (route) => {
    const request = route.request();
    const postData = await request.postDataJSON();

    // Проверяем OTP код для смены email
    if (postData?.otp === validOTP) {
      // Успешная смена email - сбрасываем верификацию
      const emailVerifiedIndex = userPermissions.indexOf(
        E_PERMISSIONS.EMAIL_VERIFIED
      );
      if (emailVerifiedIndex > -1) {
        userPermissions.splice(emailVerifiedIndex, 1);
      }

      return route.fulfill({
        body: JSON.stringify({
          message: 'Email successfully changed',
          success: true,
        }),
        contentType: 'application/json',
        status: 200,
      });
    } else if (postData?.otp === invalidOTP) {
      return route.fulfill({
        body: JSON.stringify({
          error: 'Invalid OTP code',
          success: false,
        }),
        contentType: 'application/json',
        status: 400,
      });
    } else {
      return route.fulfill({
        body: JSON.stringify({
          error: 'Invalid OTP code',
          success: false,
        }),
        contentType: 'application/json',
        status: 400,
      });
    }
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

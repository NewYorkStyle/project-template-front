import {type APIRequestContext, expect} from '@playwright/test';

import {type E_PERMISSIONS} from '@entities';

import {TEST_USER_PASSWORD} from '../constants';

import {makeE2eShortToken} from './user-id';

export type TCreatedTestUser = {
  id: string;
  email: string;
  password: string;
  username: string;
};

export const createTestUser = async (
  request: APIRequestContext
): Promise<TCreatedTestUser> => {
  const token = makeE2eShortToken();
  const username = `e2e_${token}`;
  const email = `e2e_${token}@example.com`;

  const response = await request.post('/api/test/create-user', {
    data: {
      email,
      login: username,
      name: 'E2E',
      password: TEST_USER_PASSWORD,
      surname: 'User',
    },
  });

  expect(response.ok()).toBeTruthy();

  const data = (await response.json()) as {userId?: string};
  const userId = data.userId;
  expect(userId, 'create-user response must include userId').toBeTruthy();

  return {
    id: userId!,
    email,
    password: TEST_USER_PASSWORD,
    username,
  };
};

/**
 * Удаляет тестового пользователя по `userId`.
 * 404 — пользователь уже удалён (например через UI).
 */
export const deleteTestUser = async (
  request: APIRequestContext,
  userId: string
): Promise<void> => {
  const response = await request.delete('/api/test/delete-user', {
    data: {userId},
  });

  expect(
    response.ok() || response.status() === 404,
    `delete-user failed: ${response.status()}`
  ).toBeTruthy();
};

export const grantPermissions = async (
  request: APIRequestContext,
  email: string,
  permissions: E_PERMISSIONS[]
): Promise<void> => {
  const response = await request.post('/api/test/grant-permissions', {
    data: {
      email,
      permissions,
    },
  });

  expect(response.ok()).toBeTruthy();
};

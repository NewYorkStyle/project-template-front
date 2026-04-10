import {type APIRequestContext, expect} from '@playwright/test';

export type TCreatedTestUser = {
  email: string;
  password: string;
  username: string;
};

const TEST_USER_PASSWORD = 'testpass123';

function generateUniqueId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export async function createTestUser(
  request: APIRequestContext
): Promise<TCreatedTestUser> {
  const uniqueId = generateUniqueId();
  const username = `e2e_user_${uniqueId}`;
  const email = `e2e_${uniqueId}@example.com`;

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

  return {
    email,
    password: TEST_USER_PASSWORD,
    username,
  };
}

export async function deleteTestUser(
  request: APIRequestContext,
  email: string
): Promise<void> {
  const response = await request.delete('/api/test/delete-user', {
    data: {email},
  });

  expect(response.ok()).toBeTruthy();
}

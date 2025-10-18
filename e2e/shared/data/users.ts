import {type TTestUser} from '../types';

export const testUsers = {
  admin: {
    email: 'admin@example.com',
    name: 'Admin',
    password: 'admin123',
    surname: 'System',
    username: 'admin',
  },
  emptyCredentials: {
    email: '',
    password: '',
    username: '',
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'wrongpassword',
    username: 'invalid',
  },
  regularUser: {
    email: 'testuser@example.com',
    name: 'Test',
    password: 'testpass123',
    patronymic: 'Testovich',
    surname: 'User',
    username: 'testuser',
  },
} as const satisfies Record<string, TTestUser>;

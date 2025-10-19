import {type TTestUser} from '../types';

export const testUsers = {
  admin: {
    email: 'admin@example.com',
    id: 'id',
    name: 'Admin',
    password: 'admin123',
    surname: 'System',
    username: 'admin',
  },
  emptyCredentials: {
    email: '',
    id: 'id',
    password: '',
    username: '',
  },
  invalidUser: {
    email: 'invalid@example.com',
    id: 'id',
    password: 'wrongpassword',
    username: 'invalid',
  },
  regularUser: {
    email: 'testuser@example.com',
    id: 'id',
    name: 'Test',
    password: 'testpass123',
    patronymic: 'Testovich',
    surname: 'User',
    username: 'testuser',
  },
} as const satisfies Record<string, TTestUser>;

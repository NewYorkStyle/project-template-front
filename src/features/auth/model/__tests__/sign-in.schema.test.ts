import {describe, expect, it} from 'vitest';

import {createSignInSchema} from '../sign-in.schema';

describe('createSignInSchema', () => {
  const t = ((key: string) => key) as Parameters<typeof createSignInSchema>[0];
  const schema = createSignInSchema(t);

  it('passes with valid credentials', () => {
    const result = schema.safeParse({
      password: 'StrongPass1',
      username: 'demo',
    });

    expect(result.success).toBe(true);
  });

  it('fails when username contains only spaces', () => {
    const result = schema.safeParse({
      password: 'StrongPass1',
      username: '   ',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'Authentication.SignIn.LoginRequired'
      );
    }
  });

  it('fails when password contains only spaces', () => {
    const result = schema.safeParse({
      password: '   ',
      username: 'demo',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'Authentication.SignIn.PasswordRequired'
      );
    }
  });
});

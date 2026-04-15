import {describe, expect, it} from 'vitest';

import {createSignUpSchema} from '../sing-up.schema';

describe('createSignUpSchema', () => {
  const t = ((key: string) => key) as Parameters<typeof createSignUpSchema>[0];
  const schema = createSignUpSchema(t);

  it('passes with valid payload', () => {
    const result = schema.safeParse({
      email: 'user@example.com',
      password: 'StrongPass1',
      passwordConfirm: 'StrongPass1',
      username: 'demo',
    });

    expect(result.success).toBe(true);
  });

  it('fails with required email message when email is empty', () => {
    const result = schema.safeParse({
      email: '',
      password: 'StrongPass1',
      passwordConfirm: 'StrongPass1',
      username: 'demo',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some(
          (issue) =>
            issue.message === 'Authentication.SignUp.Rules.EmailRequired'
        )
      ).toBe(true);
    }
  });

  it('fails with email format message for invalid email', () => {
    const result = schema.safeParse({
      email: 'invalid-email',
      password: 'StrongPass1',
      passwordConfirm: 'StrongPass1',
      username: 'demo',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some(
          (issue) => issue.message === 'Authentication.SignUp.Rules.EmailRules'
        )
      ).toBe(true);
    }
  });

  it('fails with password rules message for weak password', () => {
    const result = schema.safeParse({
      email: 'user@example.com',
      password: 'weak',
      passwordConfirm: 'weak',
      username: 'demo',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some(
          (issue) =>
            issue.message === 'Authentication.SignUp.Rules.PasswordRules'
        )
      ).toBe(true);
    }
  });

  it('fails with password required message for empty password', () => {
    const result = schema.safeParse({
      email: 'user@example.com',
      password: '',
      passwordConfirm: '',
      username: 'demo',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some(
          (issue) =>
            issue.message === 'Authentication.SignUp.Rules.PasswordRequired'
        )
      ).toBe(true);
    }
  });

  it('fails with password confirm mismatch message', () => {
    const result = schema.safeParse({
      email: 'user@example.com',
      password: 'StrongPass1',
      passwordConfirm: 'StrongPass2',
      username: 'demo',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some(
          (issue) =>
            issue.message === 'Authentication.SignUp.Rules.PasswordConfirmRules'
        )
      ).toBe(true);
    }
  });
});

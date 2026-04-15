import {describe, expect, it} from 'vitest';

import {
  createPersonalDataSchema,
  createProfileEmailSchema,
} from '../personal-data.schema';

describe('createPersonalDataSchema', () => {
  const t = ((key: string) => key) as Parameters<
    typeof createPersonalDataSchema
  >[0];
  const schema = createPersonalDataSchema(t);

  it('passes with valid personal data and empty patronymic', () => {
    const result = schema.safeParse({
      name: 'Иван',
      patronymic: '',
      surname: 'Петров',
    });

    expect(result.success).toBe(true);
  });

  it('fails with letters-only message for invalid name', () => {
    const result = schema.safeParse({
      name: 'John123',
      patronymic: '',
      surname: 'Petrov',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some(
          (issue) => issue.message === 'Profile.PersonalData.OnlyLettersAllowed'
        )
      ).toBe(true);
    }
  });

  it('fails with surname required message when surname is empty', () => {
    const result = schema.safeParse({
      name: 'Ivan',
      patronymic: '',
      surname: '',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some(
          (issue) => issue.message === 'Profile.PersonalData.SurnameRequired'
        )
      ).toBe(true);
    }
  });
});

describe('createProfileEmailSchema', () => {
  const t = ((key: string) => key) as Parameters<
    typeof createProfileEmailSchema
  >[0];
  const schema = createProfileEmailSchema(t);

  it('passes with valid email', () => {
    const result = schema.safeParse({
      email: 'user@example.com',
    });

    expect(result.success).toBe(true);
  });

  it('fails with custom email message for invalid email', () => {
    const result = schema.safeParse({
      email: 'invalid-email',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'Profile.PersonalData.ChangeEmail.EmailRules'
      );
    }
  });
});

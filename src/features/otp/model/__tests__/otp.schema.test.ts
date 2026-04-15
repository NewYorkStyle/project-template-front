import {describe, expect, it} from 'vitest';

import {otpSchema} from '../otp.schema';

describe('otpSchema', () => {
  it('passes with non-empty otp', () => {
    const result = otpSchema.safeParse({otp: '123456'});

    expect(result.success).toBe(true);
  });

  it('fails with empty otp', () => {
    const result = otpSchema.safeParse({otp: ''});

    expect(result.success).toBe(false);
  });
});

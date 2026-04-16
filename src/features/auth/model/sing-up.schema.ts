import {type TFunction} from 'i18next';
import {z} from 'zod';

import {AuthControllerSignUpBody} from '@api/zod/auth.schema';

import {PASSWORD_MIN_LENGTH} from '../lib';

/** Поля API + локальное поле подтверждения пароля */
type TSignUpExtendField =
  | keyof z.infer<typeof AuthControllerSignUpBody>
  | 'passwordConfirm';

export const createSignUpSchema = (t: TFunction) =>
  AuthControllerSignUpBody.extend({
    username: z
      .string()
      .min(1, {message: t('Authentication.SignUp.Rules.LoginRequired')}),

    email: z
      .string()
      .min(1, {message: t('Authentication.SignUp.Rules.EmailRequired')})
      .superRefine((value, ctx) => {
        if (!z.email().safeParse(value).success) {
          ctx.addIssue({
            code: 'custom',
            message: t('Authentication.SignUp.Rules.EmailRules'),
          });
        }
      }),

    password: z.string().superRefine((value, ctx) => {
      if (!value) {
        ctx.addIssue({
          code: 'custom',
          message: t('Authentication.SignUp.Rules.PasswordRequired'),
        });
        return;
      }

      const hasError =
        value.length < PASSWORD_MIN_LENGTH ||
        !/(?=.*[a-z])/.test(value) ||
        !/(?=.*[A-Z])/.test(value) ||
        !/(?=.*\d)/.test(value);

      if (hasError) {
        ctx.addIssue({
          code: 'custom',
          message: t('Authentication.SignUp.Rules.PasswordRules'),
        });
      }
    }),

    passwordConfirm: z.string().min(1, {
      message: t('Authentication.SignUp.Rules.PasswordConfirmRequired'),
    }),
  } satisfies Record<TSignUpExtendField, z.ZodType>).superRefine(
    (values, ctx) => {
      if (
        values.passwordConfirm &&
        values.password !== values.passwordConfirm
      ) {
        ctx.addIssue({
          code: 'custom',
          path: ['passwordConfirm'],
          message: t('Authentication.SignUp.Rules.PasswordConfirmRules'),
        });
      }
    }
  );

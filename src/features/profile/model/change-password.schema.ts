import {type TFunction} from 'i18next';
import {z} from 'zod';

import {UsersControllerChangePasswordBody} from '@api/zod/users.schema';

/** Согласовано с правилами регистрации (`features/auth`). */
const PASSWORD_MIN_LENGTH = 8;

type TChangePasswordBodyField =
  | keyof z.infer<typeof UsersControllerChangePasswordBody>
  | 'newPasswordConfirm';

export const createChangePasswordSchema = (t: TFunction) =>
  UsersControllerChangePasswordBody.extend({
    currentPassword: z.string().superRefine((value, ctx) => {
      if (!value?.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: t('Authentication.SignIn.PasswordRequired', {ns: 'Auth'}),
        });
      }
    }),

    newPassword: z.string().superRefine((value, ctx) => {
      if (!value) {
        ctx.addIssue({
          code: 'custom',
          message: t('Authentication.SignUp.Rules.PasswordRequired', {
            ns: 'Auth',
          }),
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
          message: t('Authentication.SignUp.Rules.PasswordRules', {ns: 'Auth'}),
        });
      }
    }),

    newPasswordConfirm: z.string().min(1, {
      message: t('Authentication.SignUp.Rules.PasswordConfirmRequired', {
        ns: 'Auth',
      }),
    }),
  } satisfies Record<TChangePasswordBodyField, z.ZodType>).superRefine(
    (values, ctx) => {
      if (
        values.newPasswordConfirm &&
        values.newPassword !== values.newPasswordConfirm
      ) {
        ctx.addIssue({
          code: 'custom',
          path: ['newPasswordConfirm'],
          message: t('Authentication.SignUp.Rules.PasswordConfirmRules', {
            ns: 'Auth',
          }),
        });
      }
    }
  );

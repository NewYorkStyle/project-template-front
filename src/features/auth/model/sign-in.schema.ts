import {type TFunction} from 'i18next';
import {z} from 'zod';

import {AuthControllerSignInBody} from '@shared/api/generated/zod/auth.schema';

export const createSignInSchema = (t: TFunction) =>
  AuthControllerSignInBody.extend({
    password: z
      .string()
      .min(1, {message: t('Authentication.SignIn.PasswordRequired')}),
    username: z
      .string()
      .min(1, {message: t('Authentication.SignIn.LoginRequired')}),
  });

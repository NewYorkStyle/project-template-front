import {type TFunction} from 'i18next';
import {z} from 'zod';

export const createSignInSchema = (t: TFunction) =>
  z.object({
    password: z
      .string()
      .min(1, {message: t('Authentication.SignIn.PasswordRequired')}),
    username: z
      .string()
      .min(1, {message: t('Authentication.SignIn.LoginRequired')}),
  });

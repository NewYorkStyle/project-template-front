import {type TFunction} from 'i18next';
import {z} from 'zod';

export const createDeleteUserSchema = (t: TFunction) =>
  z.object({
    password: z
      .string()
      .min(1, {message: t('Profile.Delete.PasswordRequired')}),
  });

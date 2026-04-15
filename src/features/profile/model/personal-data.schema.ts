import {type TFunction} from 'i18next';
import {z} from 'zod';

import {UsersControllerUpdateBody} from '@api/zod/users.schema';
import {APLHABETIC} from '@shared';

export const createPersonalDataSchema = (t: TFunction) =>
  UsersControllerUpdateBody.extend({
    name: z
      .string()
      .min(1, {message: t('Profile.PersonalData.NameRequired')})
      .regex(APLHABETIC, {
        message: t('Profile.PersonalData.OnlyLettersAllowed'),
      }),
    patronymic: z
      .string()
      .regex(APLHABETIC, {
        message: t('Profile.PersonalData.OnlyLettersAllowed'),
      })
      .or(z.literal('')),
    surname: z
      .string()
      .min(1, {message: t('Profile.PersonalData.SurnameRequired')})
      .regex(APLHABETIC, {
        message: t('Profile.PersonalData.OnlyLettersAllowed'),
      }),
  });

export const createProfileEmailSchema = (t: TFunction) =>
  z.object({
    email: z.email({message: t('Profile.PersonalData.ChangeEmail.EmailRules')}),
  });

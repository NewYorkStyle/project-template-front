import {type z} from 'zod';

import {
  type createPersonalDataSchema,
  type createProfileEmailSchema,
} from '../model';

export type TPersonalDataFormValues = z.infer<
  ReturnType<typeof createPersonalDataSchema>
>;
export type TProfileEmailFormValues = z.infer<
  ReturnType<typeof createProfileEmailSchema>
>;

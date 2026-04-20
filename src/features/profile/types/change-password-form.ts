import {type z} from 'zod';

import {type createChangePasswordSchema} from '../model';

export type TChangePasswordFormValues = z.infer<
  ReturnType<typeof createChangePasswordSchema>
>;

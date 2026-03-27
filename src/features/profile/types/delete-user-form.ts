import {type z} from 'zod';

import {type createDeleteUserSchema} from '../model';

export type TDeleteUserFormValues = z.infer<
  ReturnType<typeof createDeleteUserSchema>
>;

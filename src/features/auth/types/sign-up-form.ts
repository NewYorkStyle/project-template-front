import {type z} from 'zod';

import {type createSignUpSchema} from '../model';

export type TSignUpFormValues = z.infer<ReturnType<typeof createSignUpSchema>>;

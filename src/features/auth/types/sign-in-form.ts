import {type z} from 'zod';

import {type createSignInSchema} from '../model';

export type TSignInFormValues = z.infer<ReturnType<typeof createSignInSchema>>;

import {type z} from 'zod';

import {type otpSchema} from '../model';

export type TOtpFormValues = z.infer<typeof otpSchema>;

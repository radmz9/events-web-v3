import { z } from 'zod';
import { codeBlock } from '../../../shared/validations';

export const validateUserCode = z.object({
    code: codeBlock
});

export type UserCodeData = z.infer<typeof validateUserCode>;
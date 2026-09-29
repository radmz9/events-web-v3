import { z } from 'zod';
import { codeBlock } from '../../../shared/validations';

export const findStudentSchema = z.object({
    code: codeBlock
});

export type FindStudentSchemaTypes = z.infer<typeof findStudentSchema>;
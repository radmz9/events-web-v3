import { z } from 'zod';
import { baseString } from '../../../shared/validations';

export const odsSchema = z.object({
    nombre: baseString
});

export type OdsFormType = z.infer<typeof odsSchema>
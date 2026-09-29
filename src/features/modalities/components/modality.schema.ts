import { z } from 'zod';
import { baseString } from '../../../shared/validations';

export const modalitySchema = z.object({
    nombre: baseString
});

export type ModalityFormType = z.infer<typeof modalitySchema>
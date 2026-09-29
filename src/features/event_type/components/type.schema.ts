import { z } from 'zod';
import { stringWithLimit } from '../../../shared/validations'; 

export const typeSchema = z.object({
    nombre: stringWithLimit(3, 50),
    encargado: stringWithLimit(3, 50),
    especificacion: stringWithLimit(2, 20)
})

export type TypeFormType = z.infer<typeof typeSchema>;
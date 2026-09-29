import { z } from 'zod';
import { baseString, codeBlock } from '../../../shared/validations';

export const staffSchema = z.object({
    codigo: codeBlock,
    nombre: baseString,
    genero: z.enum(['H', 'M']),
    idArea: z.string().min(1, 'Debes seleccionar una Área')
})

export type StaffFormType = z.infer<typeof staffSchema>;
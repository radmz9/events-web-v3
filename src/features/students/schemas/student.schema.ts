import { z } from 'zod';
import { baseString, codeBlock } from '../../../shared/validations';

export const studentSchema = z.object({
    codigo: codeBlock,
    nombre: baseString,
    genero: z.string().min(1, 'Debes seleccionar genero'),
    etnia: z.string().min(1, 'Debes seleccionar etnia'), //.transform(val => Number(val)),
    idRol: z.string().min(1, 'Debes seleccionar un estatus'),
    idCalendario: z.string().min(1, 'Debes seleccionar calendario'),
    idSede: z.string().min(1, 'Debes seleccionar sede'),
    idArea: z.string().optional().transform((val) => (val === "" ? undefined : val)).pipe(z.string().min(1, 'Debes seleccionar area').optional())
});

export type StudentFormType = z.infer<typeof studentSchema>;
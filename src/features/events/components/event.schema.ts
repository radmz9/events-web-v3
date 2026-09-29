import { z } from 'zod';
import { baseString } from '../../../shared/validations';

export const eventSchema = z.object({
    nombre: baseString,
    responsable: baseString,
    idTipo: z.string().min(1, 'Debes seleccionar un tipo'),
    fecha: z.string().date(),
    hora: z.string().regex(
        /^(?:[01]\d|2[0-3]):[0-5]\d$/, 
        { message: "Formato de hora invalido. Debe ser HH:MM (24h)" }
    ),
    duracion: z.number().min(1, 'El valor debe ser numerico'),
    idLugar: z.string().optional().transform((val) => (val === "" ? undefined : val)).pipe(z.string().min(1, 'Debes seleccionar un lugar').optional()),
    otroLugar: z.string().optional().transform((val) => (val === "" ? undefined : val)).pipe(baseString.optional()),
    idArea: z.string().min(1, 'Debes seleccionar una área').optional(),
    idSede: z.string().min(1, 'Debes seleccionar una sede').optional(),
    idOds: z.string().min(1, 'Debes seleccionar una ods').optional(),
    idModalidad: z.string().min(1, 'Debes seleccionar una modalidad').optional(),
    idTematica: z.string().min(1, 'Debes seleccionar una temática').optional(),
})
export type EventFormType = z.infer<typeof eventSchema>;
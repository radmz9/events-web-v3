import { z } from 'zod';
import { baseString, stringWithLimit } from '../../../shared/validations';

export const placeSchema = z.object({
    nombre: baseString,
    ubicacion: baseString,
    capacidad: z.number().int().max(999, 'Debe ser menor o igual a 999'),    
    especificacion: stringWithLimit(2, 50)
});

export type PlaceFormType = z.infer<typeof placeSchema>;
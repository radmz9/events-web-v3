import { z } from 'zod';
import { baseKey, baseString } from '../../../shared/validations';

export const areaSchema = z.object({
    clave: baseKey,
    nombre: baseString,
    dependencia: z.string().optional().transform((val) => (val === "" ? undefined : val)).pipe(baseString.optional())
});

export type AreaFormValues = z.infer<typeof areaSchema>;
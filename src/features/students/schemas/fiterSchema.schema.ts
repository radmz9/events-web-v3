import { z } from 'zod';

export const filterSchema = z.object({
    areaId: z.string().min(1, 'Debes seleccionar una Área'),
    calendarId: z.string().min(1, 'Debes seleccionar un calendario')
});

export type FilterFormSchema = z.infer<typeof filterSchema>;
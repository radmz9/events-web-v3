import { z } from 'zod';

export const csvSchema = z.object({
    type: z.string().min(1, 'Debes seleccionar el tipo'),
    csvFile: z
        // .custom<FileList>((v) => v instanceof FileList, {
        //     message: 'El archivo es obligatorio'
        // })
        // .refine((files) => files.length > 0, 'El archivo es oligatorio')
        // .transform((files) => files[0])
        .instanceof(File, { message: 'El archivo es obligatorio' })
        .refine((file) => file.type === 'text/csv' || file.name.endsWith('.csv'), {
            message: 'Solo se permiten archivos CSV'
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: 'El archivo no debe pesar mas de 5MB'
        })
});

export type CsvFormValues = z.infer<typeof csvSchema>;
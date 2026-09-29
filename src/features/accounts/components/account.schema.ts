import { z } from 'zod';
import { passwordBlock } from '../../../shared/validations';

export const accountSchema = z.object({
    user_codigo: z.string().min(1, 'Debes seleccionar un Usuario'),
    managedAreaId: z.string().min(1, 'Debes seleccionar un Usuario'),
    password: passwordBlock,
    confirmPassword: passwordBlock
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ['confirmPassword']
    })

export type AccountFormValues = z.infer<typeof accountSchema>;

export type CreateAccountPayload = Omit<AccountFormValues, 'confirmPassword'>;
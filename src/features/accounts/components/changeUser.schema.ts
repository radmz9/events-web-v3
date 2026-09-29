import { z } from 'zod';
import { passwordBlock } from '../../../shared/validations';

export const changeUserSchema = z.object({
    user_codigo: z.string().min(1, 'Debes seleccionar un usuario'),
    password: passwordBlock,
    confirmPassword: passwordBlock
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ['confirmPassword']
    })

export type ChangeUserFormValues = z.infer<typeof changeUserSchema>;

export type UpdateAccountPayload = Omit<ChangeUserFormValues, 'confirmPassword'>;
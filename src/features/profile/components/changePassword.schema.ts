import { z } from "zod";
import { passwordBlock } from "../../../shared/validations";

export const changePasswordSchema = z.object({
        oldPassword: passwordBlock,
        newPassword: passwordBlock,
        confirmPassword: passwordBlock
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ['confirmPassword']
    });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
import { z } from "zod";
import { codeBlock, passwordBlock } from "../../../shared/validations";

export const loginSchema = z.object({
    user: codeBlock, 
    password: passwordBlock 
});

export type LoginFormValues = z.infer<typeof loginSchema>
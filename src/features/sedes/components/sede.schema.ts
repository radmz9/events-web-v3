import { z } from "zod";
import { validationMessages as msg } from "../../../shared/messages/validation.messages";
import { REGEX } from "../../../shared/rules/regex";

export const sedeSchema = z.object({
    nombre:     
        z.string()
        .min(3, msg.min_length(3))
        .max(50, msg.max_length(50))
        .regex(REGEX.ONLY_LETTERS, msg.onlyLetters)
});

export type SedeFormType = z.infer<typeof sedeSchema>;
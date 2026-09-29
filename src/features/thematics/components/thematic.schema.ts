import { z } from "zod";
import { baseString } from "../../../shared/validations";

export const thematicSchema = z.object({
    nombre: baseString
})

export type ThematicFormType = z.infer<typeof thematicSchema>
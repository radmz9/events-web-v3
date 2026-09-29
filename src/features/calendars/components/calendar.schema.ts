import { z } from "zod";
import { calendarPattern } from "../../../shared/validations";

export const calendarSchema = z.object({
    nombre: calendarPattern
});

export type CalendarFormType = z.infer<typeof calendarSchema>;
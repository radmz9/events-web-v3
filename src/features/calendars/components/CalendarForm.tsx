import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calendarSchema } from "./calendar.schema";
import type { CalendarFormType } from "./calendar.schema";
import { Input, Form, Button } from "../../../common/ui";
import { handleServerErrors } from "../../../shared/utils/handle-server-errors";
import type { Calendar } from "../types/calendar.types";
import { useCreateCalendarMutation, useUpdateCalendarMutation } from "../api/calendarApi";

type Props = {
    calendar?: Calendar;
    onSuccess: () => void;
}

export const CalendarForm = ({ calendar, onSuccess }: Props) => {
    const [createCalendar, { isLoading: isCreating }] = useCreateCalendarMutation();
    const [updateCalendar, { isLoading: isUpdating }] = useUpdateCalendarMutation();
    const currentYear = new Date().getFullYear();

    const isEdit = !!calendar;

    const { register, handleSubmit, setError, formState: { errors } } = useForm<CalendarFormType>({
        resolver: zodResolver(calendarSchema),
        defaultValues: isEdit ? {
            nombre: calendar.nombre
        } : {
            nombre: undefined
        }
    });

    const onSubmit = async(values: CalendarFormType) => {
        try {
            if(isEdit && calendar){
                // const { id, ...updatedValues } = values;
                await updateCalendar({ calendarId: calendar.id, calendar: values })
            }else {
                await createCalendar(values).unwrap();
            }
            onSuccess();
        } catch (error) {
            console.log(error)
            handleServerErrors(error, setError)
        }
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Calendario Escolar"
                placeholder={`Ej. ${currentYear}A o ${currentYear}B`}
                maxLength={5}
                error={errors.nombre?.message}
                {...register('nombre')}
            />

            <Button type="submit" className="mt-4" isLoading={isCreating || isUpdating}>
                { isEdit ? 'Guardar Cambios' : 'Crear'}
            </Button>
        </Form>
    )
}
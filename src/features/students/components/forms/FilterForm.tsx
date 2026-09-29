import { useForm } from "react-hook-form"
import { Button, Form, SimpleSelect } from "../../../../common/ui"
import { type FilterFormSchema, filterSchema } from "../../schemas/fiterSchema.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGetAreasByTypeQuery } from "../../../areas/api/areaApi"
import { useGetCalendarsQuery } from "../../../calendars/api/calendarApi"
import { toOptions } from "../../../../shared/utils/toOption.helper"
import type { SearchFilters } from "../RootView"

interface Props {
    onSuccess: (filters: SearchFilters) => void;
}

export const FilterForm = ({ onSuccess }: Props) => {
    const { data: areas = [], isLoading: loadingAreas } = useGetAreasByTypeQuery(1)
    const { data: calendars = [], isLoading: loadingCalendars } = useGetCalendarsQuery();

    const areaOptions = toOptions(areas, { value: 'id', label: 'nombre' });
    const calendarOptions = toOptions(calendars, { value: 'id', label: 'nombre' });

    const loadingOptions = loadingAreas || loadingCalendars;

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FilterFormSchema>({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            areaId: "",
            calendarId: ""
        }
    });

    const onSubmit = (data: FilterFormSchema) => {
        onSuccess({ areaId: data.areaId, calendarId: data.calendarId });
    }

    if(loadingOptions) return <p>Cargando....</p>
    return(
        <Form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
            <SimpleSelect
                label="Área"
                id="idArea"
                placeholder="Selecciona una área"
                options={areaOptions}
                error={errors.areaId?.message}
                {...register('areaId')}
            />

            <SimpleSelect 
                label="Calendario"
                id="idCalendario"
                placeholder="Selecciona un calendario"
                options={calendarOptions}
                error={errors.calendarId?.message}
                {...register('calendarId')}
            />

            <Button type="submit" isLoading={isSubmitting}>
                Consultar
            </Button>
        </Form>
    )
}
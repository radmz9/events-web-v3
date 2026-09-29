import { useForm, Controller } from "react-hook-form";
import { Button, Form, Input } from "../../../common/ui";
import { type Option , SimpleSelect} from "../../../common/ui/SimpleSelect";
import { useCreateEventMutation, useUpdateEventMutation } from "../api/eventApi";
import type { EventType } from "../types/event.types";
import { type EventFormType, eventSchema } from "./event.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleServerErrors } from "../../../shared/utils/handle-server-errors";

export interface EventFormProps {
    event?: EventType;
    areaOptions?: Option[];
    placeOptions: Option[];
    typeOptions: Option[];
    sedeOptions: Option[];
    odsOptions: Option[];
    modalityOptions: Option[];
    thematicOptions: Option[];
    page: number;
    size: number;
}

interface Props extends EventFormProps {
    onSuccess: () => void;
}

export const EventForm = ({ 
    event,
    areaOptions,
    placeOptions,
    typeOptions,
    sedeOptions,
    odsOptions,
    modalityOptions,
    thematicOptions,
    page,
    size,
    onSuccess
 }: Props) => {
    const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
    const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();
    const isEdit = !!event;
    const { control, register, handleSubmit, setError, setValue, formState: { errors } } = useForm<EventFormType>({
        resolver: zodResolver(eventSchema),
        defaultValues: isEdit ? {
            nombre: event.nombre,
            responsable: event.responsable,
            idTipo: event.idTipo,
            fecha: event.fecha,
            hora: event.hora,
            duracion: event.duracion,
            idLugar: event.idLugar || undefined,
            otroLugar: event.idLugar === "null" ? event.lugar : "",
            idArea: event.idArea,
            idSede: event.idSede,
            idOds: event.idOds,
            idModalidad: event.idModalidad,
            idTematica: event.idTematica
        } : {
            nombre: "",
            responsable: "",
            idTipo: undefined,
            fecha: "",
            hora: "",
            duracion: undefined,
            idLugar: "",
            otroLugar: undefined,
            idArea: undefined,
            idSede: undefined,
            idOds: undefined,
            idModalidad: undefined,
            idTematica: undefined
        },
        shouldUnregister: true
    });

    const onSubmit = async(values: EventFormType) => {
        const payload = {
            ...values,
            idLugar: values.otroLugar === undefined ? values.idLugar : null,
            otroLugar: values.idLugar === undefined ? values.otroLugar : null
        }
        try {
            if(isEdit && event) await updateEvent({ eventId: event.id, body: payload, pagination: { page, size } }).unwrap()
            else await createEvent({ body: payload, pagination: { page, size } }).unwrap();
            onSuccess();
        } catch (error) {
            console.log(error)
            handleServerErrors(error, setError)
        }
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Nombre"
                placeholder="Escribe el nombre del evento"
                maxLength={250}
                error={errors.nombre?.message}
                {...register('nombre')}
            />

            <Input
                label="Encargado/Responsable"
                placeholder="Escribe el nombre del evento"
                maxLength={250}
                error={errors.responsable?.message}
                {...register('responsable')}
            />

            <div
                className="flex items-center gap-2"
            >
                <Input
                    label="Fecha"
                    type="date"
                    error={errors.fecha?.message}
                    {...register('fecha')}
                />

                <Input
                    label="Hora"
                    type="time"
                    error={errors.hora?.message}
                    {...register('hora')}
                />

                <Input 
                    label="Duración"
                    placeholder="Ejemplo: 2 o 2.5"
                    type="number"
                    step={"any"}
                    maxLength={3}
                    error={errors.duracion?.message}
                    {...register('duracion', { valueAsNumber: true })}
                />
            </div>

            <div className="flex items-center gap-2">
                <SimpleSelect
                    label="Tipo"
                    id="idTipo"
                    placeholder="Selecciona un tipo"
                    options={typeOptions}
                    error={errors.idTipo?.message}
                    {...register('idTipo')}
                />

                <SimpleSelect
                    label="Sede"
                    id="idSede"
                    placeholder="Selecciona una sede"
                    options={sedeOptions}
                    error={errors.idSede?.message}
                    {...register('idSede')}
                />
            </div>

            <div className="flex items-center gap-3">
                <SimpleSelect
                    label="Ods"
                    id="idOds"
                    placeholder="Selecciona una Ods"
                    options={odsOptions}
                    error={errors.idOds?.message}
                    {...register('idOds')}
                />

                <SimpleSelect
                    label="Modalidad"
                    id="idModalidad"
                    placeholder="Selecciona una modalidad"
                    options={modalityOptions}
                    error={errors.idModalidad?.message}
                    {...register('idModalidad')}
                />
            </div>

            <SimpleSelect
                label="Temática"
                id="idTematica"
                placeholder="Selecciona una temática"
                options={thematicOptions}
                error={errors.idTematica?.message}
                {...register('idTematica')}
            />

            {areaOptions?.length ? (<SimpleSelect
                label="Área"
                id="idArea"
                placeholder="Selecciona una área"
                options={areaOptions}
                error={errors.idArea?.message}
                {...register('idArea')}
            /> ) : null}

            <Controller 
                name="idLugar"
                control={control}
                render={({ field }) => (
                    <SimpleSelect
                        label="Lugar"
                        id="idLugar"
                        placeholder="Selecciona un lugar"
                        options={placeOptions}
                        error={errors.idLugar?.message}
                        {...field}
                        onChange={(value) => {
                            field.onChange(value);
                            if(value){
                                setValue('otroLugar', '');
                            }
                        }}
                        // {...register('idLugar')}
                    />
                )}
            />

            <Controller 
                name="otroLugar"
                control={control}
                render={({ field }) => (
                    <Input 
                        label="Puedes escribir otro lugar si es que no se encuentra en la lista."
                        placeholder="Este campo puede estar vacio."
                        maxLength={250}
                        error={errors.otroLugar?.message}
                        {...field}
                        onChange={(e) => {
                            field.onChange(e);
                            if(e.target.value) {
                                setValue('idLugar', "");
                            }
                        }}
                        // {...register('otroLugar')}
                    />       
                )}
            />
            
            <Button type="submit" className="mt-4" isLoading={isCreating || isUpdating}>
                { isEdit ? 'Guardar cambios' : 'Crear' }
            </Button>

        </Form>
    )
}
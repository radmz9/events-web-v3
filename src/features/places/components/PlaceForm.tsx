import { useForm } from "react-hook-form";
import { useCreatePlaceMutation, useUpdatePlaceMutation } from "../api/placeApi";
import type { Place } from "../types/place.types"
import { placeSchema } from "./place.schema";
import type { PlaceFormType } from "./place.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleServerErrors } from "../../../shared/utils/handle-server-errors";
import { Button, Form, Input } from "../../../common/ui";

type Props = {
    place?: Place;
    onSuccess: () => void;
}

export const PlaceForm = ({ place, onSuccess }: Props) => {
    const [createPlace, { isLoading: isCreating }] = useCreatePlaceMutation();
    const [updatePlace, { isLoading: isUpdating }] = useUpdatePlaceMutation();

    const isEdit = !!place;

    const { register, handleSubmit, setError, formState: { errors } } = useForm<PlaceFormType>({
        resolver: zodResolver(placeSchema),
        defaultValues: isEdit ? {
            nombre: place.nombre,
            ubicacion: place.ubicacion,
            capacidad: place.capacidad,
            especificacion: place.especificacion
        } : {
            nombre: "",
            ubicacion: "",
            capacidad: 0,
            especificacion: ""
        }
    });

    const onSubmit = async(values: PlaceFormType) => {
        try {
            if(isEdit && place){
                await updatePlace({ placeId: place.id, place: values }).unwrap();
            }else{
                await createPlace(values).unwrap()
            }
            onSuccess();
        } catch (error) {
            console.log(error)
            handleServerErrors(error, setError);
        }
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Nombre"
                placeholder="Solo letras"
                maxLength={250}
                error={errors.nombre?.message}
                {...register('nombre')}
            />

            <Input
                label="Ubicación"
                placeholder="Solo letras"
                maxLength={250}
                error={errors.ubicacion?.message}
                {...register('ubicacion')}
            />
            <div className="flex items-center columns-2 justify-between gap-4">
                <Input
                    label="Capacidad"
                    type="number"
                    min={1}
                    max={999}
                    placeholder="Ej. 250"
                    error={errors.capacidad?.message}
                    {...register('capacidad', { valueAsNumber: true })}
                />

                <Input
                    label="Especificación"
                    placeholder="Solo letras"
                    maxLength={250}
                    error={errors.especificacion?.message}
                    {...register('especificacion')}
                />
            </div>

            <Button type="submit" className="mt-4" isLoading={isCreating || isUpdating}>
                {isEdit ? 'Guardar Cambios' : 'Enviar'}
            </Button>
        </Form>
    )
}
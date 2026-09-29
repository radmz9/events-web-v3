import { useForm } from "react-hook-form";
import { useCreateTypeMutation, useUpdateTypeMutation } from "../api/typeApi";
import type { Type } from "../types/type.types";
import { type TypeFormType, typeSchema } from "./type.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleServerErrors } from "../../../shared/utils/handle-server-errors";
import { Button, Form, Input } from "../../../common/ui";

type Props = {
    type?: Type;
    onSuccess: () => void;
}

export const TypeForm = ({ type, onSuccess }: Props) => {
    const [createType, { isLoading: isCreating }] = useCreateTypeMutation();
    const [updateType, { isLoading: isUpdating }] = useUpdateTypeMutation();

    const isEdit = !!type;

    const { register, handleSubmit, setError, formState: { errors } } = useForm<TypeFormType>({
        resolver: zodResolver(typeSchema),
        defaultValues: isEdit ? {
            nombre: type.nombre,
            encargado: type.encargado,
            especificacion: type.especificacion
        } : {
            nombre: "",
            encargado: "",
            especificacion: ""
        }
    });

    const onSubmit = async (values: TypeFormType) => {
        try {
            if(isEdit && type) await updateType({ typeId: type.id, type: values }).unwrap();
            else await createType(values).unwrap();
            onSuccess();
        } catch (error) {
            console.log(error);
            handleServerErrors(error, setError);
        }
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Nombre"
                placeholder="Solo letras"
                maxLength={50}
                error={errors.nombre?.message}
                {...register('nombre')}
            />

            <Input
                label="Encargado"
                placeholder="Ej: Tallerista/Ponente, etc."
                maxLength={50}
                error={errors.encargado?.message}
                {...register('encargado')}
            />

            <Input
                label="Especificación"
                placeholder="Ej. La, El, etc."
                maxLength={50}
                error={errors.especificacion?.message}
                {...register('especificacion')}
            />

            <Button type="submit" className="mt-4" isLoading={isCreating || isUpdating}>
                { isEdit ? 'Guardar Cambios' : 'Enviar' }
            </Button>
        </Form>
    )
}
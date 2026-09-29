import { useForm } from "react-hook-form";
import { useCreateModalityMutation, useUpdateModalityMutation } from "../api/modalityApi";
import type { Modality } from "../types/modality.types"
import { type ModalityFormType, modalitySchema } from "./modality.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleServerErrors } from "../../../shared/utils/handle-server-errors";
import { Button, Form, Input } from "../../../common/ui";

type Props = {
    modality?: Modality;
    onSuccess: () => void;
}

export const ModalityForm = ({ modality, onSuccess }: Props) => {
    const [createModality, { isLoading: isCreating }] = useCreateModalityMutation();
    const [updateModality, { isLoading: isUpdating }] = useUpdateModalityMutation();

    const isEdit = !!modality;

    const { register, handleSubmit, setError, formState: { errors } } = useForm<ModalityFormType>({
        resolver: zodResolver(modalitySchema),
        defaultValues: isEdit ? {
            nombre: modality.nombre
        } : {
            nombre: ""
        }
    });

    const onSubmit = async(values: ModalityFormType) => {
        try {
            if(isEdit && modality) await updateModality({ modalityId: modality.id, modality: values }).unwrap()
            else await createModality(values).unwrap()
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
                placeholder="Solo letras"
                maxLength={250}
                error={errors.nombre?.message}
                {...register('nombre')}
            />

            <Button type="submit" className="mt-4" isLoading={isCreating || isUpdating}>
                { isEdit ? 'Guardar Cambios' : 'Enviar' }
            </Button>
        </Form>
    )
}


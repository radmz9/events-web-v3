import { useForm } from "react-hook-form";
import { useCreateSedeMutation, useUpdateSedeMutation } from "../api/sedeApi";
import type { Sede } from "../types/sede.types"
import { sedeSchema } from "./sede.schema";
import type { SedeFormType } from "./sede.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleServerErrors } from "../../../shared/utils/handle-server-errors";
import { Button, Form, Input } from "../../../common/ui";

type Props = {
    sede?: Sede;
    onSuccess: () => void;
}

export const SedeForm = ({ sede, onSuccess }: Props) => {
    const [createSede, { isLoading: isCreating }] = useCreateSedeMutation();
    const [updateSede, { isLoading: isUpdating }] = useUpdateSedeMutation();

    const isEdit = !!sede;

    const { register, handleSubmit, setError, formState: { errors } } = useForm<SedeFormType>({
        resolver: zodResolver(sedeSchema),
        defaultValues: isEdit ? {
            nombre: sede.nombre
        } : {
            nombre: ""
        }
    });

    const onSubmit = async(values: SedeFormType) => {
        try {
            if(isEdit && sede){
                await updateSede({ sedeId: sede.id, sede: values }).unwrap();
            }else{
                await createSede(values).unwrap();
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
                label="Sede"
                placeholder="Solo letras"
                maxLength={50}
                error={errors.nombre?.message}
                {...register('nombre')}
            />

            <Button type="submit" className="mt-4" isLoading={isCreating || isUpdating}>
                {isEdit ? 'Guardar cambios' : 'Enviar'}
            </Button>
        </Form>
    )
}
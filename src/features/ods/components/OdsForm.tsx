import { useForm } from "react-hook-form";
import { useCreateOdsMutation, useUpdateOdsMutation } from "../api/odsApi";
import type { Ods } from "../types/ods.types";
import { type OdsFormType, odsSchema } from "./ods.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleServerErrors } from "../../../shared/utils/handle-server-errors";
import { Button, Form, Input } from "../../../common/ui";

type Props = {
    ods?: Ods;
    onSuccess: () => void;
}

export const OdsForm = ({ ods, onSuccess }: Props) => {
    const [createOds, { isLoading: isCreating }] = useCreateOdsMutation();
    const [updateOds, { isLoading: isUpdating }] = useUpdateOdsMutation();

    const isEdit = !!ods;

    const { register, handleSubmit, setError, formState: { errors } } = useForm<OdsFormType>({
        resolver: zodResolver(odsSchema),
        defaultValues: isEdit ? {
            nombre: ods.nombre
        } : {
            nombre: ""
        }
    });

    const onSubmit = async (values: OdsFormType) => {
        try {
            if(isEdit && ods) await updateOds({ odsId: ods.id, ods: values }).unwrap()
            else await createOds(values).unwrap();
            onSuccess();
        } catch (error) {
            console.log(error);
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
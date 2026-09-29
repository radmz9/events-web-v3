import { useForm } from "react-hook-form";
import { useCreateThematicMutation, useUpdateThematicMutation } from "../api/thematicApi";
import type { Thematic } from "../types/thematic.types"
import { type ThematicFormType, thematicSchema } from "./thematic.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleServerErrors } from "../../../shared/utils/handle-server-errors";
import { Button, Form, Input } from "../../../common/ui";

type Props = {
    thematic?: Thematic;
    onSuccess: () => void;
}

export const ThematicForm = ({ thematic, onSuccess }: Props) => {
    const [createThematic, { isLoading: isCreating }] = useCreateThematicMutation();
    const [updateThematic, { isLoading: isUpdating }] = useUpdateThematicMutation();

    const isEdit = !!thematic;

    const { register, handleSubmit, setError, formState: { errors } } = useForm<ThematicFormType>({
        resolver: zodResolver(thematicSchema),
        defaultValues: isEdit ? {
            nombre: thematic.nombre
        } : {
            nombre: ""
        }
    });

    const onSubmit = async (values: ThematicFormType) => {
        try {
            if(isEdit && thematic) await updateThematic({ thematicId: thematic.id, thematic: values }).unwrap();
            else await createThematic(values);
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
                maxLength={250}
                error={errors.nombre?.message}
                {...register('nombre')}
            />

            <Button type="submit" className="mt-4" isLoading={isCreating || isUpdating}>
                { isUpdating ? 'Guardar Cambios' : 'Enviar' }
            </Button>
        </Form>
    )
}
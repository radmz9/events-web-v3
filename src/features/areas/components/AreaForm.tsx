import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { areaSchema } from "./area.schema";
import type { AreaFormValues } from "./area.schema";
import { Input, Button, Form } from "../../../common/ui";
import { handleServerErrors } from "../../../shared/utils/handle-server-errors";
import { useCreateAreaMutation, useUpdateAreaMutation } from "../api/areaApi";
import type { Area } from "../types/area.types";

type Props = {
    typeId: number;
    area?: Area;
    onSuccess: () => void;
}

export const AreaForm = ({ typeId, area, onSuccess }: Props) => {
    const [createArea, { isLoading: isCreating }] = useCreateAreaMutation();
    const [updateArea, { isLoading: isUpdating }] = useUpdateAreaMutation();

    const isEdit = !!area;

    const { register, handleSubmit, setError, formState: { errors } } = useForm<AreaFormValues>({
        resolver: zodResolver(areaSchema),
        defaultValues: isEdit ? {
            clave: area.clave,
            nombre: area.nombre,
            dependencia: area.dependencia ?? ""
        } : { 
            clave: "",
            nombre: "",
            dependencia: ""
        }
    })

    const onSubmit = async(values: AreaFormValues) => {
        try {
            if(isEdit && area){
                const { nombre, dependencia } = values;
                await updateArea({areaId: area.id, area: { nombre, dependencia}}).unwrap()
            }else{
                await createArea({...values, id_tipo_area: typeId }).unwrap();
            }
            onSuccess();
        } catch (error) {
            console.log(error)
            handleServerErrors(error, setError)
        }
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            {!isEdit && (
                <Input
                    label="Clave"
                    placeholder="Ej: ADMI"
                    minLength={3}
                    maxLength={6}
                    error={errors.clave?.message}
                    {...register('clave')}
                />
            )}

            <Input
                label="Nombre"
                placeholder="Ingeniería/Licenciatura en....."
                minLength={3}
                maxLength={250}
                error={errors.nombre?.message}
                {...register('nombre')}
            />
            { typeId !== 4 && ( 
                <Input
                    label="Dependencia"
                    placeholder="Institución / División"
                    minLength={3}
                    maxLength={250}
                    error={errors.dependencia?.message}
                    {...register('dependencia')}
                />
            ) }

            <Button type="submit" className="mt-4" isLoading={isCreating || isUpdating}>
                { isEdit ? 'Actualizar Cambios' : 'Guardar Registro' }
            </Button>
        </Form>
    )
}
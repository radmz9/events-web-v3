import { useForm } from "react-hook-form";
import { useCreateStaffMutation, useUpdateStaffMutation } from "../api/staffApi";
import type { Staff } from "../types/staff.types";
import { type StaffFormType, staffSchema } from "./staff.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleServerErrors } from "../../../shared/utils/handle-server-errors";
import { Button, Form, Input, SimpleSelect } from "../../../common/ui";
import { genderOptions } from "./genders.options";
import type { Option } from "../../../common/ui/SimpleSelect";

type Props = {
    typeId: number;
    staff?: Staff;
    areaOptions: Option[];
    onSuccess: () => void;
}

export const StaffForm = ({ typeId, staff, areaOptions, onSuccess }: Props) => {
    const [createStaff, { isLoading: isCreating }] = useCreateStaffMutation();
    const [updateStaff, { isLoading: isUpdating }] = useUpdateStaffMutation();
    const isEdit = !!staff;

    const { register, handleSubmit, setError, formState: { errors } } = useForm<StaffFormType>({
        resolver: zodResolver(staffSchema),
        defaultValues: isEdit ? {
            codigo: staff.codigo,
            nombre: staff.nombre,
            genero: staff.idGenero as StaffFormType['genero'],
            idArea: staff.idArea
        } : {
            codigo: "",
            nombre: "",
            genero: undefined,
            idArea: ""
        }
    });
    
    const onSubmit = async(values: StaffFormType) => {
        try {
            if(isEdit && staff) await updateStaff({ staffId: staff.id, typeId, body: { ...values, idRol: typeId } }).unwrap();
            else await createStaff({ typeId, body: { ...values, idRol: typeId } }).unwrap();
            onSuccess();
        } catch (error) {
            console.log(error);
            handleServerErrors(error, setError);
        }
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Código"
                placeholder="Letras y numeros"
                maxLength={9}
                error={errors.codigo?.message}
                {...register('codigo')}
            />

            <Input
                label="Nombre"
                placeholder="Solo Letras"
                maxLength={250}
                error={errors.nombre?.message}
                {...register('nombre')}
            />

            <SimpleSelect
                label="Género"
                id="idGenero"
                placeholder="Selecciona una opción"
                options={genderOptions}
                error={errors.genero?.message}
                {...register('genero')}
            />

            <SimpleSelect
                label="Área"
                id="idArea"
                placeholder={'Selecciona una opción'}
                options={areaOptions}
                error={errors.idArea?.message}
                {...register('idArea')}
            />

            <Button type="submit" className="mt-4" isLoading={isCreating || isUpdating}>
                { isEdit ? 'Guardar cambios' : 'Enviar' }
            </Button>
        </Form>
    )
}
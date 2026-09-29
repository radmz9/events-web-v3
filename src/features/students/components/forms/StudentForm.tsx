import { Button, Form, Input, SimpleSelect } from "../../../../common/ui";
import type { Option } from "../../../../common/ui/SimpleSelect";
import type { StudentTypes } from "../../types/student.types";
import { ethnicityOptions } from "../../constants/ethnicity.constant";
import { genderOptions } from "../../../staff/components/genders.options";
import { roleOptions } from "../../constants/roles.constant";
import { useCreateStudentMutation, useUpdateStudentMutation } from "../../api/studentApi";
import { useForm } from "react-hook-form";
import { type StudentFormType, studentSchema } from "../../schemas/student.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleServerErrors } from "../../../../shared/utils/handle-server-errors";
import { toast } from "sonner";
import { useAppSelector } from "../../../../app/hooks";

export interface StudentFormProps {
    student?: StudentTypes;
    areaOptions?: Option[];
    calendarOptions: Option[];
    sedeOptions: Option[];
}

interface Props extends StudentFormProps {
    onSuccess: () => void;
}

export const StudentForm = ({ student, areaOptions, calendarOptions, sedeOptions, onSuccess }: Props) => {
    const { role, idArea } = useAppSelector(state => state.auth);
    const [createStudent, { isLoading: isCreating }] = useCreateStudentMutation();
    const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();
    const isEdit = !!student;
    console.log(areaOptions)
    const { register, handleSubmit, setError, formState: { errors } } = useForm<StudentFormType>({
        resolver: zodResolver(studentSchema),
        defaultValues: isEdit ? {
            codigo: student.codigo,
            nombre: student.nombre,
            genero: student.idGenero,
            etnia: student.idEtnia,
            idRol: student.idRol,
            idCalendario: student.idCalendario,
            idSede: student.idSede,
            idArea: student.idArea
        } : {
            codigo: "",
            nombre: "",
            genero: undefined,
            etnia: undefined,
            idRol: undefined,
            idCalendario: undefined,
            idSede: undefined,
            idArea: undefined
        }
    });

    const onSubmit = async (values: StudentFormType) => {
        let payload = {};
        if(role === 'ROOT'){
            payload = values
        }else{
            payload = { ...values, idArea }
        }
        try {
            if(isEdit) await updateStudent({ studentId: student.id, student: payload }).unwrap();
            else {
                await createStudent(payload).unwrap();
                toast.success('Registro exitoso!', {
                    description: `${values.nombre}, ha sido registrado.`,
                    duration: 3000
                });
            }
            onSuccess();
        } catch (error) {
            console.log(error);
            handleServerErrors(error, setError)
        }
    }
    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Código"
                placeholder="Ej. ABCD12345"
                maxLength={9}
                error={errors.codigo?.message}
                {...register('codigo')}
            />

            <Input
                label="Nombre"
                placeholder="Nombre completo"
                maxLength={250}
                error={errors.nombre?.message}
                {...register('nombre')}
            />
            <div className="flex gap-2">
                <SimpleSelect 
                    label="Etnia"
                    id="etnia"
                    placeholder="Selecciona"
                    options={ethnicityOptions}
                    error={errors.etnia?.message}
                    {...register('etnia')}
                />

                <SimpleSelect 
                    label="Genero"
                    id="genero"
                    placeholder="Selecciona"
                    options={genderOptions}
                    error={errors.genero?.message}
                    {...register('genero')}
                />
            </div>

            <div className="flex gap-2">
                <SimpleSelect 
                    label="Estatus"
                    id="estatus"
                    placeholder="Selecciona"
                    options={roleOptions}
                    error={errors.idRol?.message}
                    {...register('idRol')}
                />

                <SimpleSelect 
                    label="Calendario"
                    id="calendario"
                    placeholder="Selecciona"
                    options={calendarOptions}
                    error={errors.idCalendario?.message}
                    {...register('idCalendario')}
                />

                <SimpleSelect 
                    label="Sede"
                    id="sede"
                    placeholder="Selecciona"
                    options={sedeOptions}
                    error={errors.idSede?.message}
                    {...register('idSede')}
                />
            </div>


            { areaOptions && (
                <SimpleSelect 
                    label="Área"
                    id="area"
                    placeholder="Selecciona área"
                    options={areaOptions}
                    error={errors.idArea?.message}
                    {...register('idArea')}
                />
            ) }

            <Button type="submit" className="mt-4" isLoading={isCreating || isUpdating}>
                { isEdit ? 'Guardar cambios' : 'Registrar' }
            </Button>
        </Form>
    )
}
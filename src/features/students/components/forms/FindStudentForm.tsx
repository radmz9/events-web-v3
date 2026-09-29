import { useForm } from "react-hook-form"
import { Button, Form, Input } from "../../../../common/ui"
import { findStudentSchema, type FindStudentSchemaTypes } from "../../schemas/findStudent.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { handleServerErrors } from "../../../../shared/utils/handle-server-errors"


export const FindStudentForm = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<FindStudentSchemaTypes>({
        resolver: zodResolver(findStudentSchema),
        defaultValues: {
            code: ""
        }
    });
    const onSubmit = async(code: FindStudentSchemaTypes) => {
        try {
            
        } catch (error) {
            console.log(error);
            handleServerErrors(error, setError)
        }
    }
    return(
        <Form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
            <Input
                label="Código"
                placeholder="Escribe el codigo del estudiante"
                error={errors.code?.message}
                {...register('code')}
            />
            <Button type="submit" className="mt-4">
                Buscar
            </Button>
        </Form>
    )
}
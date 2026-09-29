import { useForm } from "react-hook-form"
import { validateUserCode, type UserCodeData } from "../../../search/components/code.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { handleServerErrors } from "../../../../shared/utils/handle-server-errors";
import { useLazySearchStudentQuery } from "../../../search/api/searchApi";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "../../../../common/ui";


export const SearchForm = () => {
    const [searchStudent, { isLoading }] = useLazySearchStudentQuery();
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { errors } } = useForm<UserCodeData>({
        resolver: zodResolver(validateUserCode),
        defaultValues: {
            code: ""
        }
    });

    const onSubmit = async (values: UserCodeData) => {
        try {
            const code = values.code;
            await searchStudent(code).unwrap();
            navigate(`/comunidad/alumnos/${code}`);
        } catch (error) {
            console.log(error);
            handleServerErrors(error, setError)
        }
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
            <Input 
                label="Código"
                placeholder="Escribe el código del alumno"
                minLength={7}
                maxLength={9}
                error={errors.code?.message}
                {...register('code')}
            />

            <Button type="submit" className="mt-4" disabled={isLoading}>
                Buscar
            </Button>
        </Form>
    )
}
import { useForm } from "react-hook-form";
import { validateExternal, type ExternalInfoData } from "./attendance.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button, Form, Input, SimpleSelect } from "../../../../common/ui";
import { genderOptions } from "../../../staff/components/genders.options";
import { useRegisterExternalMutation } from "../../api/attendanceApi";
import { handleServerErrors } from "../../../../shared/utils/handle-server-errors";

export const ExternalForm = () => {
    const [ eventSignIn, { isLoading } ] = useRegisterExternalMutation()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        reset,
        setError
    } = useForm<ExternalInfoData>({
        resolver: zodResolver(validateExternal),
        mode: 'onChange'
    })

    const onSubmit = async (data: ExternalInfoData) => {
        try {
            await eventSignIn(data).unwrap()
        } catch (error) {
            console.log(error)
            handleServerErrors(error, setError)
        }
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset()
        }
    }, [isSubmitSuccessful, reset])

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Nombre"
                placeholder="Escribe tu nombre completo"
                minLength={3}
                maxLength={250}
                error={errors.nombre?.message}
                {...register('nombre')}
            />

            <Input
                label="Dependencia"
                placeholder="Escribe la dependencia a la que perteneces"
                minLength={3}
                maxLength={250}
                error={errors.dependencia?.message}
                {...register('dependencia')}
            />

            <SimpleSelect
                label="Género"
                id="idGenero"
                placeholder="Selecciona una opcion"
                options={genderOptions}
                error={errors.genero?.message}
                {...register('genero')}
            />

            <Button type="submit" className="mt-4" isLoading={isLoading}>
                Registrarme
            </Button>
        </Form>
    )
}
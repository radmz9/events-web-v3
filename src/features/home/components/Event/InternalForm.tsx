import { useForm } from "react-hook-form";
import { type InternalCodeData, validateCode } from "./attendance.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input } from "../../../../common/ui";
import { useEffect } from "react";
import { useRegisterInternalMutation, attendanceApi } from "../../api/attendanceApi";
import { handleServerErrors } from "../../../../shared/utils/handle-server-errors";
import { useAppSelector } from "../../../../app/hooks";

export const InternalsForm = () => {
    const selectInternals = attendanceApi.endpoints.getEventAttendace.select(undefined);
    const { data: records, isLoading: loadingRecords } = useAppSelector(selectInternals);
    const [eventSignIn, { isLoading }] = useRegisterInternalMutation();
    const { 
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        reset,
        setError
     } = useForm<InternalCodeData>({
        resolver: zodResolver(validateCode),
        mode: 'onChange',
        defaultValues: {
            userCode: '',
        }
    });

    const onSubmit = async (data: InternalCodeData) => {
        try {
            const isRegistered = records?.internals.some(r => r.codigo === data.userCode);
            if(isRegistered){
                setError('userCode', { message: 'Ya te has registrado previamente al evento' })
            }else{
                await eventSignIn(data).unwrap()
            }
        } catch (error) {
            console.log(error)
            handleServerErrors(error, setError)
        }
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset();
        }
    }, [isSubmitSuccessful, reset])

    if(loadingRecords) return <p>Sincronizando estado local.....</p>

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Código"
                placeholder="Escribe tu código de usuario"
                minLength={7}
                maxLength={9}
                error={errors.userCode?.message}
                {...register('userCode')}
            />

            <Button type="submit" className="mt-4" isLoading={isLoading}>
                Registrarme
            </Button>
        </Form>
    )
}
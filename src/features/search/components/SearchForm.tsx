import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateUserCode } from "./code.schema";
import type { UserCodeData } from "./code.schema";
import { Input, Form, Button } from "../../../common/ui";
import { useNavigate } from "react-router-dom";
import { useLazySearchUserEventsQuery } from "../api/searchApi";
import { handleServerErrors } from "../../../shared/utils/handle-server-errors";

export const SearchForm = () => {
    const navigate = useNavigate();
    const [triggerSearch, { isLoading }] = useLazySearchUserEventsQuery();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<UserCodeData>({
        resolver: zodResolver(validateUserCode),
        defaultValues: {
            code: ''
        },
        mode: 'onChange'
    });

    const onSubmit = async (data: UserCodeData) => {
        try {
            const user = await triggerSearch(data.code, true).unwrap();
            if(user){
                navigate('/historial/eventos', {
                    state: { 
                        code: data.code,
                        fromForm: true
                    }
                })
            }
        } catch (error) {
            console.log(error)
            handleServerErrors(error, setError)
        }
    }
    return(
        <Form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
            <Input
                label="Código"
                placeholder="Escribe tu código"
                maxLength={9}
                error={errors.code?.message}
                {...register('code')}
            />

            <Button type="submit" className="mt-4" isLoading={isLoading}>
                Enviar
            </Button>
        </Form>
    )
}
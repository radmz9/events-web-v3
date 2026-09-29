import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateEventKey } from "./key.schema";
import type { EventKeyData } from "./key.schema";
import { Input, Form, Button } from "../../../common/ui";
import { handleServerErrors } from "../../../shared/utils/handle-server-errors";
import { useNavigate } from "react-router-dom";
import { useCheckEventMutation } from "../api/activeEventApi";

export const HomeForm = () => {
    const [checkEvent, { isLoading } ] = useCheckEventMutation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<EventKeyData>({
        resolver: zodResolver(validateEventKey),
        mode: 'onChange'
    })
    const onSubmit = async (data: EventKeyData) => {
        try {
            await checkEvent(data).unwrap()
            navigate('/evento/registros');
        } catch (error) {
            console.log(error)
            handleServerErrors(error, setError)
        }
    }
    return(
        <Form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
            <Input
                label="Clave"
                placeholder="Ej. A1B1C"
                maxLength={5}
                error={errors.eventKey?.message}
                {...register('eventKey')}
            />

            <Button type="submit" className="mt-4" isLoading={isLoading}>
                Enviar
            </Button>
        </Form>
    )
}
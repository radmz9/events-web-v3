import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./login.schema";
import type { LoginFormValues } from "./login.schema";
import { Input, Button, Form } from "../../../common/ui";
import { handleServerErrors } from "../../../shared/utils/handle-server-errors";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../api/authApi";
import { setCredentials } from "../services/authSlice";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            user: '',
            password: ''
        }
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const userData = await login(data).unwrap();
            dispatch(setCredentials(userData));
            navigate('/perfil');
        } catch (error) {
            handleServerErrors(error, setError)
        }
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
            <Input
                label="Usuario"
                placeholder="Nombre de usuario"
                minLength={7}
                maxLength={9}
                error={errors.user?.message}
                {...register('user')}
            />

            <Input
                label="Contraseña"
                placeholder="Contraseña"
                minLength={8}
                maxLength={20}
                error={errors.password?.message}
                autoComplete="off"
                type="password"
                {...register('password')}
            />

            <Button type="submit" className="mt-4" isLoading={isLoading}>
                Entrar
            </Button>
        </Form>
    )
}
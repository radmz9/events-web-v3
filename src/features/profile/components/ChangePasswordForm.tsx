import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "../../accounts/api/accountsApi";
import { changePasswordSchema, type ChangePasswordFormValues } from "./changePassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleServerErrors } from "../../../shared/utils/handle-server-errors";
import { Button, Form, Input } from "../../../common/ui";
import { toast } from "sonner";

interface Props {
    onSuccess: () => void;
}

export const ChangePasswordForm = ({ onSuccess }: Props) => {
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async(values: ChangePasswordFormValues) => {
        try {
            const payload = { oldPassword: values.oldPassword, newPassword: values.newPassword };
            await changePassword(payload).unwrap();
            toast.success('Hecho!', {
                description: 'La contraseña ha sido actualizada',
                duration: 5000
            })
            onSuccess();
        } catch (error) {
            console.log(error)
            handleServerErrors(error, setError);
        }
    }
    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                type="password"
                label="Contraseña actual"
                placeholder="Solo letras y numeros"
                maxLength={20}
                error={errors.oldPassword?.message}
                autoComplete="off"
                {...register('oldPassword')}
            />

            <Input
                type="password"
                label="Nueva contraseña"
                placeholder="Solo letras y numeros"
                maxLength={20}
                error={errors.newPassword?.message}
                autoComplete="off"
                {...register('newPassword')}
            />

            <Input
                type="password"
                label="Vuelve a escribir la nueva contraseña"
                placeholder="Solo letras y numeros"
                maxLength={20}
                error={errors.confirmPassword?.message}
                autoComplete="off"
                {...register('confirmPassword')}
            />

            <Button type="submit" className="mt-4" isLoading={isLoading}>
                Actualizar
            </Button>
        </Form>
    )
}
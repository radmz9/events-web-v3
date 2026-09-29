import { Controller, useForm } from "react-hook-form";
import type { Option } from "../../../common/ui/SimpleSelect";
import { accountApi, useChangeUserFromAreaMutation } from "../api/accountsApi";
import { handleServerErrors } from "../../../shared/utils/handle-server-errors";
import { Button, Form, Input, SearchSelect } from "../../../common/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeUserSchema, type ChangeUserFormValues } from "./changeUser.schema";
import { useAppSelector } from "../../../app/hooks";

interface Props {
    accountId: number;
    staffOptions: Option[];
    onSuccess: () => void;
}

export const ToggleUserForm = ({ accountId, staffOptions, onSuccess }: Props) => {
    const [changeUser, { isLoading }] = useChangeUserFromAreaMutation();
    const { data: accounts = [] } = useAppSelector(accountApi.endpoints.getAccounts.select(undefined));
    const accountToEdit = accounts.find(acc => acc.id === accountId);
    const {
        control,
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<ChangeUserFormValues>({
        resolver: zodResolver(changeUserSchema),
        defaultValues: {
            user_codigo: '',
            password: '',
            confirmPassword: ''
        }
    });

    if(!accountToEdit) return <p>Cargando datos de la cuenta.....</p>

    const onSubmit = async(values: ChangeUserFormValues) => {
        try {
            await changeUser({ accountId, body: { user_codigo: values.user_codigo, password: values.password } }).unwrap();
            onSuccess();
        } catch (error) {
            console.log(error);
            handleServerErrors(error, setError);
        }
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            <p className="bg-emerald-600 rounded-2xl p-2 text-white">{accountToEdit.rolName} actual: <b className="font-mono">{accountToEdit.nombre}</b></p>
            <Controller 
                name="user_codigo"
                control={control}
                render={({ field, fieldState }) => (
                    <SearchSelect
                        label="Usuario"
                        options={staffOptions}
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                    />
                )}
            />

            <div className="flex gap-3 justify-between">

                <Input
                    type="password"
                    label="Contraseña"
                    placeholder="Solo letras y numeros"
                    maxLength={20}
                    error={errors.password?.message}
                    autoComplete="off"
                    {...register('password')}
                />

                <Input
                    type="password"
                    label="Escribe nuevamente la contraseña"
                    placeholder="Solo letras y numeros"
                    maxLength={20}
                    error={errors.confirmPassword?.message}
                    autoComplete="off"
                    {...register('confirmPassword')}
                />

            </div>

            <Button type="submit" className="mt-4" isLoading={isLoading}>
                Guardar Cambios
            </Button>
        </Form>
    )
}
import { Controller, useForm } from "react-hook-form";
import type { Option } from "../../../common/ui/SimpleSelect";
import { useCreateAccountMutation } from "../api/accountsApi";
import { handleServerErrors } from "../../../shared/utils/handle-server-errors";
import { Button, Form, Input, SearchSelect } from "../../../common/ui";
import { accountSchema, type AccountFormValues, type CreateAccountPayload } from "./account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SimpleSelect } from "../../../common/ui/SimpleSelect";
import type { AccountDto } from "../types/account.dto";

interface Props {
    areaOptions: Option[];
    staffOptions: Option[];
    onSuccess: () => void;
}

export const AccountForm = ({ areaOptions, staffOptions, onSuccess }: Props) => {
    const [createAccount, { isLoading }] = useCreateAccountMutation();
    const {
        control,
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<AccountFormValues>({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            user_codigo: '',
            password: '',
            confirmPassword: '',
            managedAreaId: ''
        }
    });

    const onSubmit = async(values: CreateAccountPayload) => {
        const payload: AccountDto = { user_codigo: values.user_codigo, managedAreaId: values.managedAreaId, password: values.password };
        try {
            await createAccount(payload).unwrap();
            onSuccess();
        } catch (error) {
            console.log(error);
            handleServerErrors(error, setError);
        }
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
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

            <SimpleSelect
                label="Área"
                id="idArea"
                placeholder="Selecciona una área"
                options={areaOptions}
                error={errors.managedAreaId?.message}
                {...register('managedAreaId')}
            />

            <div
                className="flex gap-3 justify-between"
            >
                <Input
                    label="Contraseña"
                    type="password"
                    placeholder="Solo letras y numeros"
                    maxLength={20}
                    error={errors.password?.message}
                    autoComplete="off"
                    {...register('password')}
                />

                <Input
                    label="Escribe nuevamente la contraseña"
                    type="password"
                    placeholder="Solo letras y numeros"
                    maxLength={20}
                    error={errors.confirmPassword?.message}
                    autoComplete="off"
                    {...register('confirmPassword')}
                />

            </div>

            <Button type="submit" className="mt-4" isLoading={isLoading}>
                Registrar
            </Button>
        </Form>
    )
}
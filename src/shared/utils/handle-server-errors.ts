import type { Path } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import type { UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

interface ApiErrorResponse {
    data: Record<string, string | []>;
    status: number;
}

const INVALID_PARAM = "INVALID_PARAM";

export const handleServerErrors = <T extends FieldValues>(
    error: unknown,
    setError: UseFormSetError<T>
) => {
    const backendErrors = error as ApiErrorResponse;

    if(backendErrors?.data && typeof backendErrors.data === 'object'){
        if(backendErrors.status === 400){
            if(backendErrors.data.code_error === INVALID_PARAM){
                toast.error('Párametro no valido',{
                    description: backendErrors.data.message,
                    duration: 5000
                })
            }else{
                Object.entries(backendErrors.data).forEach(([property, message]) => {
                    if(typeof message === 'string'){
                        setError(property as Path<T>, {
                            type: property,
                            message: message as string
                        })
                    }else{
                        setError(property as Path<T>, {
                            type: property,
                            message: message.join(' \n')
                        })
                    }
                })
            }
        }
        if(backendErrors.status === 409){
            return toast.error('Registro duplicado', {
                description: `Ya se encuentra un registro con la misma información`,
                duration: 5000
            })
        }
    }
}

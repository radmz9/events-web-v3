import { toast } from "sonner";

interface ApiErrorResponse {
    status: number;
    data: {
        message?: string | string[];
        error?: string;
    }
}

export const showApiError = (error: unknown) => {
    const serverError = error as ApiErrorResponse;

    if(!serverError?.data){
        return toast.error("Error de conexion", {
            description: "No se pudo establecer comunicación con el servidor."
        })
    }

    const { status, data } = serverError;

    if(status == 409){
        return toast.error(`Conflicto`, {
            description: `El registro no puede ser eliminado ya que es dependiente de otros registros.`,
            duration: 5000
        })
    }

    if (Array.isArray(data.message)) {
        data.message.forEach((errObj) => {
            Object.entries(errObj).forEach(([field, msg]) => {
                toast.error(`Error en el campo: ${field}`, {
                    description: msg,
                    id: `error-${field}`, 
                });
            });
        });
        return;
    }

    toast.error(`Error: ${status}`, {
        description: typeof data.message === 'string' ? data.message : 'Ocurrío un error al procesar la solicitud'
    })
}

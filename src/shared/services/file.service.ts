import { toast } from "sonner";
import { BASE_URL } from "../../app/services/baseApi";
import { getFileName } from "./getFilename.service";
import { store } from "../../app/store";

interface PDFResponse {
    blob: Blob;
    fileName: string | null;
}

export async function fetchPDF(
    endpoint: string,
    errorDescription = 'No se pudo generar el archivo.'
): Promise<PDFResponse>{
    const state = store.getState();
    const authToken = state.auth.token;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            ...(authToken && {
                Authorization: `Bearer ${authToken}`
            })
        }
    });

    if(response.status === 401) {
        toast('Error', {
            description: "Tú sesión ha expirado",
            duration: 5000
        })
    }

    if(!response.ok){
        toast.error('Hubo un error', {
            description: errorDescription,
            duration: 5000
        });

        throw new Error(errorDescription);
    }

    const fileName = getFileName(
        response.headers.get('Content-Disposition')
    )

    return {
        blob: await response.blob(),
        fileName
    }
}
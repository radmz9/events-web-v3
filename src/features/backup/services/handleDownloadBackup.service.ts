import { toast } from "sonner";
import { fetchPDF } from "../../../shared/services/file.service"

interface Props {
    setIsCreating: (isCreating: boolean) => void;
}

export const handleDownloadBackup = async ({ setIsCreating }: Props) => {
    setIsCreating(true);
    try {
        const { blob, fileName } = await fetchPDF(
            '/backup/download',
            'No se pudo generar el resplado de la base de datos.'
        )

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        a.download = fileName || `backup-${new Date().toISOString().slice(0,10)}.sql.gz`;

        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        toast.success('Respaldo descargado con exito!');
        setIsCreating(false);
    } catch (error) {
        setIsCreating(false);
        console.log(error);
    }
}
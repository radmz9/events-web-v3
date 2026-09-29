import { Download, Eye } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPDF } from "../../../../shared/services/file.service";
import { openPDF } from "../../../../shared/services/openPDF.service";
import { downloadFile } from "../../../../shared/services/downloadFile.service";

export const GenerateFile = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { code } = useParams();

    const handleViewPdf = async(code: string) => {
        setIsLoading(true);
        try {
            const { blob } = await fetchPDF(`/users/report/${code}`);

            openPDF(blob);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const handleDownloadPDF = async(code: string) => {
        setIsLoading(true);
        try {
            const { blob, fileName } = await fetchPDF(`/users/report/${code}`);

            downloadFile(blob, `${fileName}.pdf`);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    if(!code) return null;

    return(
        <div className="flex items-center justify-between w-96">
            <button 
                className="flex items-center gap-2 bg-emerald-500 px-4 py-2 rounded-lg text-white cursor-pointer hover:bg-emerald-800 disabled:bg-slate-500"
                disabled={isLoading}
                onClick={() => handleDownloadPDF(code)}
            >
                <Download />
                Generar PDF
            </button>

            <button 
                className="flex items-center gap-2 bg-emerald-500 px-4 py-2 rounded-lg text-white cursor-pointer hover:bg-emerald-800 disabled:bg-slate-500"
                disabled={isLoading}
                onClick={() => handleViewPdf(code)}
            >
                <Eye />
                { isLoading ? 'Generando...' : 'Vista Previa'}
            </button>
        </div>
    )
}
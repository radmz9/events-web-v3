import { Download, Eye } from "lucide-react";
import { useParams } from "react-router-dom";
import { fetchPDF } from "../../../shared/services/file.service";
import { openPDF } from "../../../shared/services/openPDF.service";
import { downloadFile } from "../../../shared/services/downloadFile.service";
import { useState } from "react";

export const Actions = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { eventId } = useParams();

    const handleViewPdf = async(eventId: string) => {
        setIsLoading(true)
        try {
            const { blob } = await fetchPDF(`/records/event/pdf/${eventId}`);

            openPDF(blob);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDownloadPDF = async(eventId: string) => {
        setIsLoading(true)
        try {
            const { blob, fileName } = await fetchPDF(`/records/event/pdf/${eventId}`);

            downloadFile(blob, `${fileName}.pdf`);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    if(!eventId) return null;
    return(
        <div className="flex items-center justify-between">
            <button
                className="flex items-center gap-2 bg-emerald-500 px-4 py-2 rounded-lg text-white cursor-pointer hover:bg-emerald-800 disabled:bg-slate-500"
                onClick={() => handleDownloadPDF(eventId)}
                disabled={isLoading}
            >
                <Download />
                Generar PDF
            </button>
            <button
                className="flex items-center gap-2 bg-emerald-500 px-4 py-2 rounded-lg text-white cursor-pointer hover:bg-emerald-800 disabled:bg-slate-500"
                onClick={() => handleViewPdf(eventId)}
                disabled={isLoading}
            >
                <Eye />
                { isLoading ? 'Generando....' : 'Vista Previa' }
            </button>
        </div>
    )
}
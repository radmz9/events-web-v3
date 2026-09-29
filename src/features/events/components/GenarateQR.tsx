import { QrCode } from "lucide-react";
import { useState } from "react";
import { fetchPDF } from "../../../shared/services/file.service";
import { downloadFile } from "../../../shared/services/downloadFile.service";

interface Props {
    eventId: string;
}

export const GenerateQR = ({ eventId }: Props) => {
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const handleDownloadQR = async (eventId: string) => {
        setIsCreating(true)
        try {
            const { blob, fileName } = await fetchPDF(`/events/qr/${eventId}/download`);

            downloadFile(blob, `${fileName}.pdf`)
        } catch (error) {
            console.log(error)
        } finally {
            setIsCreating(false)
        }
    }
    return(
        <button
            className="border border-slate-500 px-1 py-1 bg-slate-50 hover:bg-slate-500 hover:text-white rounded-lg cursor-pointer disabled:bg-slate-500"
            onClick={() => handleDownloadQR(eventId)}
            disabled={isCreating}
            title="Generar QR"
        >
            <QrCode />
        </button>
    )
}
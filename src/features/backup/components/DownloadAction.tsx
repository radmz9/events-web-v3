import { useState } from "react"
import { handleDownloadBackup } from "../services/handleDownloadBackup.service";
import { DatabaseBackup } from "lucide-react";
import { useAppSelector } from "../../../app/hooks";

export const DownloadAction = () => {
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const { role } = useAppSelector(state => state.auth);
    if(role !== 'ROOT') return null;
    return(
        <button
            disabled={isCreating}
            className="flex gap-2 bg-sky-400 px-4 py-3 rounded-lg text-white font-semibold cursor-pointer hover:bg-sky-600 disabled:bg-slate-600"
            onClick={() => handleDownloadBackup({ setIsCreating })}
        >
            <DatabaseBackup />
            Respaldar BD
        </button>
    )
}
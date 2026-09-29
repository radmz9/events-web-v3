import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
    title?: string;
    fn?: () => void;
}

export const GoBackButton = ({
    title = 'Regresar',
    fn
}: Props) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        if(fn) fn();
        else navigate(-1)
    }

    return(
        <button 
            className="flex items-center justify-center gap-2 border border-slate-200 py-2 px-3 text-xs font-light text-slate-500 rounded-md hover:bg-slate-50 cursor-pointer"
            onClick={handleClick}
        >
            <ArrowLeft className="h-4 w-4" />
            {title}
        </button>
    )
}
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
    url: string;
}

export const ViewButton = ({
    url
}: Props) => {
    const navigate = useNavigate();
    const handleClick = () => navigate(url);

    return(
        <button
            className="cursor-pointer text-emerald-500 hover:text-emerald-700"
            onClick={handleClick}
            aria-label="Ver detalles"
        >
            <Info />
        </button>
    )
}
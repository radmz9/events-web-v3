import { Eraser } from "lucide-react";

interface Props {
    icon?: React.ReactNode;
    action: () => void;
    className?: string;
}

export const DeleteButton = ({
    icon,
    className,
    action
}: Props) => {
    return(
        <button
            className={`
                cursor-pointer text-red-600 hover:text-red-900
                ${className}
            `}
            onClick={action}
            aria-label="Eliminar"
        >
            { icon || <Eraser className="" /> }
        </button>
    )
}
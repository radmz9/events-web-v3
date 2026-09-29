import { SquarePen } from "lucide-react";

interface Props {
    icon?: React.ReactNode,
    className?: string,
    action: () => void;
}

export const UpdateButton = ({ 
    icon,
    className,
    action
}: Props) => {
    return(
        <button
            className={`
                cursor-pointer text-sky-600 hover:text-sky-900
                ${className}
            `}
            onClick={action}
            aria-label="Editar"
        >
            {icon || <SquarePen className="" />}
        </button>
    )
}
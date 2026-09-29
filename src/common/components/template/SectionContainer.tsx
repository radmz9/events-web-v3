import type { ReactNode } from "react";
import { ListPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TableToolBar } from "../utils/TableToolBar";

interface SectionContainerProps {
    title: string;
    onAction?: () => void;
    actionIcon?: LucideIcon;
    actionLabel?: string;
    total?: number;
    children?: ReactNode;
}

export const SectionContainer = ({ 
    title,
    onAction,
    total,
    actionIcon: ActionIcon = ListPlus,
    actionLabel = "Agregar",
    children
}: SectionContainerProps) => {
    return(
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between p-6 rounded-lg border bg-white border-slate-200 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                    {title}
                </h1>
                { onAction && (
                    <button
                        onClick={onAction}
                        className="group flex items-center justify-center p-2 text-white bg-sky-600 rounded-xl shadow-lg shadow-sky-200 transition-all hover:cursor-pointer hover:bg-sky-700 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                        title={actionLabel}
                    >
                        <ActionIcon className="w-5 h-5" />
                    </button>
                ) }
            </div>
            { total !== undefined && total > 0 && (
                <TableToolBar total={total} />
            ) }
            <div className="w-full">
                {children}
            </div>
        </div>
    )
}
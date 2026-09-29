interface TableToolbarPros {
    total: number;
    label?: string;
}

export const TableToolBar = ({ total, label = "registros encontrados" }: TableToolbarPros) => {
    if(total === 0) return null;
    return(
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-100 bg-sky-50/30">    
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <p className="text-xs text-sky-700">
                {total} <span className="text-slate-500 font-normal">{label}</span>
            </p>
        </div>
    )
}
import { useState } from "react";
import { Columns3, ChevronDown } from "lucide-react";
import { type Column } from "@tanstack/react-table";

type Props<TData> = {
    allColumns: () => Column<TData, unknown>[];
}

export const ColumnVisibiltyMenu = <TData,>({ allColumns }: Props<TData>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return(
        <div className="relative w-max">
            <button 
                onClick={() => setIsOpen(prev => !prev)}
                className="px-3.5 py-2 text-slate-700 text-sm font-semibold rounded-md flex items-center gap-2 cursor-pointer bg-white border border-slate-300 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
                <Columns3 />
                Columnas
                <ChevronDown />
            </button>
            <ul 
                id="dropdown-menu" aria-labelledby="dropdown-toggle"
                className={`${isOpen? 'block' : 'hidden'} absolute right-0 mt-2 p-2 min-w-48 w-full text-slate-800 text-sm font-medium bg-white border border-slate-300 rounded-md shadow-lg z-20 overflow-hidden`}
            >
                {
                    allColumns()
                    .filter(column => column.getCanHide())
                    .map(column => { 
                        const leafColumns = column.getLeafColumns();
                        const isGroup = leafColumns.length > 0;

                        const checked = isGroup
                            ? leafColumns.some(col => col.getIsVisible())
                            : column.getIsVisible();
                        return (
                            <li 
                                key={column.id}
                                className="dropdown-item w-full p-2 flex items-center rounded-md transition-colors hover:text-slate-900 hover:bg-slate-100 focus-within:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            >
                                <div className="flex items-center group">
                                    <input
                                        type="checkbox"
                                        name={column.id}
                                        className="flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 outline-slate-300 dark:outline-neutral-700
                                            bg-white dark:bg-neutral-800
                                            group-has-[input:checked]:bg-blue-600
                                            group-has-[input:checked]:outline-blue-600
                                            group-focus-within:outline-2
                                            group-focus-within:outline-blue-600
                                            hover:cursor-pointer" 
                                        checked={checked}
                                        // checked={column.getIsVisible()}
                                        // onChange={column.getToggleVisibilityHandler()}
                                        onChange={(e) => {
                                            if(isGroup) leafColumns.forEach(col => col.toggleVisibility(e.target.checked));
                                            else column.toggleVisibility(e.target.checked);
                                        }}
                                    />
                                    <span className="ml-3">
                                        {typeof column.columnDef.header === 'string'
                                            ? column.columnDef.header
                                            : String(column.id)}
                                    </span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )

}
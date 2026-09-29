import type { PaginationState } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";

type Props = {
    pagination: PaginationState;
    setPagination: React.Dispatch<
        React.SetStateAction<PaginationState>
    >;
    pageCount: number;
}

export const Pagination = ({
    pagination,
    setPagination,
    pageCount
}: Props) => {
    if(pageCount <= 1 ) return null;
    
    const handlePrevious = () => {
        if(pagination.pageIndex > 0) setPagination(prev => ({...prev, pageIndex:  prev.pageIndex - 1 }));
    }

    const handleNext = () => {
        if(pagination.pageIndex < pageCount -1) setPagination(prev => ({...prev, pageIndex: prev.pageIndex + 1}));
    }

    const handlePageSizeChange = (pageSize: number) => {
        setPagination(prev => ({...prev, pageSize, pageIndex: 0 }));
    }
    return(
        <div className="flex items-center justify-between mt-4 p-4">
            <button
                className="bg-slate-400 p-2 rounded-lg text-xs text-white flex items-center hover:cursor-pointer hover:bg-slate-600"
                onClick={handlePrevious} 
                disabled={pagination.pageIndex === 0}
            >
                <ChevronLeft className="h-4 w-4" />
                Anterior
            </button>
            
            <span
                className="text-xs"
            >
                Página { pagination.pageIndex + 1 } de { pageCount }
            </span>

            <button
                className="bg-slate-400 p-2 rounded-lg text-xs text-white flex items-center hover:cursor-pointer hover:bg-slate-600"
                onClick={handleNext}
                disabled={pagination.pageIndex === pageCount - 1}
            >
                Siguiente
                <ChevronRight className="h-4 w-4" />
            </button>

            <select 
                className="text-xs border border-slate-200 p-2 rounded-lg font-mono"
                name="size" 
                id="size" 
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            >
                {[10,25,50].map((size) => (
                    <option key={size} value={size}>
                        {size} por página
                    </option>
                ))}
            </select>

        </div>
    )
}
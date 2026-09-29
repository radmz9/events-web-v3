import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";

type Props = {
    pageIndex: number;
    pages: number;
    handlePrev: () => void;
    handleNext: () => void;
    handlePageSizeChange: (e: React.ChangeEvent) => void;
}

export const Pagination = ({ pageIndex, pages, handleNext, handlePrev, handlePageSizeChange }: Props) => {
    return(
        <div className="flex w-full items-center p-6 bg-slate-50 gap-4 justify-between">
            <button 
                onClick={handlePrev}
                className="bg-slate-400 p-2 rounded-lg text-xs text-white flex items-center hover:cursor-pointer hover:bg-slate-600"
                disabled={pageIndex === 0}
            >
                <ChevronLeft className="h-4 w-4" />
                Anterior
            </button>
            <span
                className="text-xs"
            >
                Página {pageIndex + 1} de {pages}
            </span>
            <button 
                onClick={handleNext}
                className="bg-slate-400 p-2 rounded-lg text-xs text-white flex items-center hover:cursor-pointer hover:bg-slate-600"
                disabled={pageIndex === pages - 1}
            >
                Siguiente
                <ChevronRight className="h-4 w-4" />
            </button>
            <select
                className="text-xs border border-slate-200 p-2 rounded-lg"
                onChange={handlePageSizeChange}
            >
                <option value={""}>Filas</option>
                {[25,50,75].map((r, i) => <option key={i} value={r}>{r} por página</option> )}
            </select>
        </div>
    )
}
import type { PaginationState } from "@tanstack/react-table";
import { Search } from "lucide-react";

type Props = {
    search: string;
    setSearch: (search: string) => void;
    setPagination?: React.Dispatch<
        React.SetStateAction<PaginationState>
    >;
}

export const SearchInput = ({ search, setSearch, setPagination }: Props) => {
    return(
        <div
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-600"
        >
            <Search className="text-slate-400" />

            <input 
                // className="border border-slate-500 m-4 p-2 rounded-lg bg-white"
                className="text-sm text-slate-900 w-full outline-none"
                type="text"
                placeholder="Buscar por nombre..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    if(setPagination){
                        setPagination(prev => ({ ...prev, pageIndex: 0 }))
                    }  
                }}
            />
        </div>
    )
}
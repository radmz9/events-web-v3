import { useMemo, useState } from "react";

export function useNameFilter<T extends { nombre: string }>(
    data: T[]
){
    const [search, setSearch] = useState<string>("");

    const filteredData = useMemo(() => {
        if(!search) return data;

        const value = search.toLowerCase();

        return data.filter(item => item.nombre.toLowerCase().includes(value))
    },[data, search]);

    return {
        search,
        setSearch,
        filteredData
    }
}
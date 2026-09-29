import type React from "react";
import { getCoreRowModel, getPaginationRowModel, useReactTable, type ColumnDef, type PaginationState, type VisibilityState } from "@tanstack/react-table";

interface UseTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];

    pagination?: PaginationState;
    setPagination?: React.Dispatch<
        React.SetStateAction<PaginationState>
    >;

    columnVisibility?: VisibilityState;
    setColumnVisibility?: React.Dispatch<
        React.SetStateAction<VisibilityState>
    >;
}

export function useTanStackTable<T>({
    data,
    columns,
    pagination,
    setPagination,
    columnVisibility,
    setColumnVisibility
}: UseTableProps<T>){
    const table = useReactTable<T>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
            ...(pagination && { pagination }),
            ...(columnVisibility && { columnVisibility }),
        },
        
        ...( setPagination && {
            onPaginationChange: setPagination,
        }),

        ...(setColumnVisibility && {
            onColumnVisibilityChange: setColumnVisibility,
        }),

        ...(pagination && {
            getPaginationRowModel: getPaginationRowModel()
        })

    });

    return table;
}
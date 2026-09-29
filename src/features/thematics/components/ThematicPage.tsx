import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { useDeleteResourse } from "../../../shared/utils/useDeleteResourse";
import { useDeleteThematicMutation, useGetThematicsQuery } from "../api/thematicApi";
import type { Thematic } from "../types/thematic.types";
import { openModal } from "../../modals/services/modalSlice";
import { SectionContainer } from "../../../common/components/template/SectionContainer";
import { type ColumnDef, type PaginationState } from "@tanstack/react-table";
import { useNameFilter } from "../../../common/hooks/useNameFilter.hook";
import { useTanStackTable } from "../../../common/hooks/tanstack-table.hook";
import { Meta, Pagination, SearchInput, TableContent } from "../../../common/components/stack";
import { DeleteButton, UpdateButton } from "../../../common/ui";

export const ThematicPage = () => {
    const { data: thematics = [], isLoading, isError } = useGetThematicsQuery();
    const { executeDelete } = useDeleteResourse();
    const [deleteThematic] = useDeleteThematicMutation();
    const dispatch = useAppDispatch();

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const { search, setSearch, filteredData } = useNameFilter(thematics);

    const columns: ColumnDef<Thematic>[] = [
        { header: 'Temática', accessorKey: 'nombre' },
        { 
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <UpdateButton 
                        action={() => dispatch(openModal({ type: 'EDIT_THEMATIC', title: 'Editar Temática', data: { thematic: row.original } }))}
                    />

                    <DeleteButton 
                        action={() => executeDelete(row.original.nombre, row.original.id, deleteThematic)}
                    />
                </div>
            )
        }
    ];

    const table = useTanStackTable({
        data: filteredData,
        columns,
        pagination,
        setPagination
    });

    const rows = table.getRowModel().rows.length;
    const total = thematics.length;
    const pageCount = table.getPageCount();

    if(isError) return <div className="p-5 text-red-500">Error al cargar la pagina</div>

    const handleCreateThematic = () => dispatch(openModal({ type: 'CREATE_THEAMTIC', title: 'Temática', data: { foo: 'Tematica' } }));

    return(
        <SectionContainer
            title="Temáticas"
            onAction={handleCreateThematic}
            actionLabel="Neva Temática"
        >
            <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-md">
                <div className="flex items-center justify-between p-6">
                    <SearchInput search={search} setSearch={setSearch} setPagination={setPagination} />
                    <Meta rows={rows} total={total} />
                </div>

                <TableContent table={table} isLoading={isLoading} />

                <Pagination 
                    pageCount={pageCount}
                    pagination={pagination}
                    setPagination={setPagination}
                />
            </div>
        </SectionContainer>
    )
}
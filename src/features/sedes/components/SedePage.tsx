import { useAppDispatch } from "../../../app/hooks";
import { useDeleteResourse } from "../../../shared/utils/useDeleteResourse";
import { useDeleteSedeMutation, useGetSedesQuery } from "../api/sedeApi"
import type { Sede } from "../types/sede.types";
import { openModal } from "../../modals/services/modalSlice";
import { SectionContainer } from "../../../common/components/template/SectionContainer";
import { type PaginationState, type ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useNameFilter } from "../../../common/hooks/useNameFilter.hook";
import { useTanStackTable } from "../../../common/hooks/tanstack-table.hook";
import { Meta, Pagination, SearchInput, TableContent } from "../../../common/components/stack";
import { DeleteButton, UpdateButton } from "../../../common/ui";

export const SedePage = () => {
    const { data: sedes = [], isLoading, isError } = useGetSedesQuery();
    const { executeDelete } = useDeleteResourse();
    const [deleteSede] = useDeleteSedeMutation();
    const dispatch = useAppDispatch();

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const { search, setSearch, filteredData } = useNameFilter(sedes);

    const columns: ColumnDef<Sede>[] = [
        { header: 'Id', accessorKey: 'id' },
        { header: 'Nombre', accessorKey: 'nombre' },
        {
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <div className="flex gap-3">
                    <UpdateButton 
                        action={() => dispatch(openModal({ type: 'EDIT_SEDE', title: 'Editar Sede', data: { sede: row.original } }))}
                    />

                    <DeleteButton 
                        action={() => executeDelete(row.original.nombre, row.original.id, deleteSede)}
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
    const total = sedes.length;
    const pageCount = table.getPageCount();

    if(isError) return <div className="p-5 text-red-500">Error al cargar la pagina</div>

    const handleCreateSede = () => dispatch(openModal({ type: 'CREATE_SEDE', title: 'Nueva Sede', data: { foo: 'Sede' } }))

    return(
        <SectionContainer
            title="Sedes"
            onAction={handleCreateSede}
            actionLabel="Nueva Sede"
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
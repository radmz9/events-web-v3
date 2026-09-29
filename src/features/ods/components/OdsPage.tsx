import { useAppDispatch } from "../../../app/hooks";
import { useDeleteResourse } from "../../../shared/utils/useDeleteResourse";
import { useDeleteOdsMutation, useGetOdsQuery } from "../api/odsApi"
import type { Ods } from "../types/ods.types";
import { SectionContainer } from "../../../common/components/template/SectionContainer";
import { openModal } from "../../modals/services/modalSlice";
import { useState } from "react";
import { type ColumnDef, type PaginationState } from "@tanstack/react-table";
import { useNameFilter } from "../../../common/hooks/useNameFilter.hook";
import { useTanStackTable } from "../../../common/hooks/tanstack-table.hook";
import { Meta, Pagination, SearchInput, TableContent } from "../../../common/components/stack";
import { DeleteButton, UpdateButton } from "../../../common/ui";

export const OdsPage = () => {
    const { data: ods = [], isLoading, isError } = useGetOdsQuery();
    const { executeDelete } = useDeleteResourse();
    const [deleteOds] = useDeleteOdsMutation();
    const dispatch = useAppDispatch();

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const { search, setSearch, filteredData } = useNameFilter(ods);

    const columns: ColumnDef<Ods>[] = [
        { header: 'Ods', accessorKey: 'nombre' },
        { 
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <div className="flex gap-3">
                    <UpdateButton 
                        action={() => dispatch(openModal({ type: 'EDIT_ODS', title: 'Editar Ods', data: { ods: row.original } }))}
                    />

                    <DeleteButton 
                        action={() => executeDelete(row.original.nombre, row.original.id, deleteOds)}
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

    if(isError) return <div className="p-5 text-red-500">Error al cargar la pagina</div>

    const rows = table.getRowModel().rows.length;
    const total = ods.length;
    const pageCount = table.getPageCount();

    const handleCreateOds = () => dispatch(openModal({ type: 'CREATE_ODS', title: 'Ods', data: { foo: 'Ods' } }));

    return (
        <SectionContainer
            title="Ods"
            onAction={handleCreateOds}
            actionLabel="Nuevo Ods"
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
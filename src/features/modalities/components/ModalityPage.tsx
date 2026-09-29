import { useAppDispatch } from "../../../app/hooks";
import { useDeleteResourse } from "../../../shared/utils/useDeleteResourse";
import { useDeleteModalityMutation, useGetModalitiesQuery } from "../api/modalityApi"
import type { Modality } from "../types/modality.types";
import { SectionContainer } from "../../../common/components/template/SectionContainer";
import { openModal } from "../../modals/services/modalSlice";
import { Meta, Pagination, SearchInput, TableContent } from "../../../common/components/stack";
import { useState } from "react";
import { type ColumnDef, type PaginationState } from "@tanstack/react-table";
import { useNameFilter } from "../../../common/hooks/useNameFilter.hook";
import { useTanStackTable } from "../../../common/hooks/tanstack-table.hook";
import { DeleteButton, UpdateButton } from "../../../common/ui";

export const ModalityPage = () => {
    const { data: modalities = [], isLoading, isError } = useGetModalitiesQuery();
    const { executeDelete } = useDeleteResourse();
    const [deleteModality] = useDeleteModalityMutation();
    const dispatch = useAppDispatch();

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const { search, setSearch, filteredData } = useNameFilter(modalities);

    const columns: ColumnDef<Modality>[] = [
        { header: 'Modalidad', accessorKey: 'nombre' },
        {
            id: 'actions',
            header: 'Acciones',
            cell: ({row}) => (
                <div className="flex gap-2">
                    <UpdateButton
                        action={() => dispatch(openModal({ type: 'EDIT_MODALITY', title: 'Editar Modalidad', data: { modality: row.original } }))}
                    />

                    <DeleteButton 
                        action={() => executeDelete(row.original.nombre, row.original.id, deleteModality)}
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
    })

    if(isError) return <div className="p-5 text-red-500">Error al cargar la pagina</div>

    const handleCreateModality = () => dispatch(openModal({ type: 'CREATE_MODALITY', title: 'Modalidad', data: { foo: 'modalidad' } }));
    
    const rows = table.getRowModel().rows.length;
    const total = modalities.length;
    return(
        <SectionContainer
            title="Modalidades"
            onAction={handleCreateModality}
            actionLabel="Nueva Modalidad"
        >
            <div className="overflow-x-auto rounded-lg border border-slate-200 shadwo-md">
                <div className="flex items-center justify-between p-6">
                    <SearchInput search={search} setSearch={setSearch} setPagination={setPagination} />
                    <Meta rows={rows} total={total} />
                </div>
                
                <TableContent
                    table={table}
                    isLoading={isLoading}
                />

                <Pagination
                    pagination={pagination}
                    setPagination={setPagination}
                    pageCount={table.getPageCount()}
                />
                
            </div>
        </SectionContainer>
    )
}
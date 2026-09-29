import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { useDeleteResourse } from "../../../shared/utils/useDeleteResourse";
import { useDeleteTypeMutation, useGetTypesQuery } from "../api/typeApi";
import type { Type } from "../types/type.types";
import { openModal } from "../../modals/services/modalSlice";
import { SectionContainer } from "../../../common/components/template/SectionContainer";
import { type VisibilityState, type PaginationState, type ColumnDef } from "@tanstack/react-table";
import { useNameFilter } from "../../../common/hooks/useNameFilter.hook";
import { useTanStackTable } from "../../../common/hooks/tanstack-table.hook";
import { ColumnVisibiltyMenu, Meta, Pagination, SearchInput, TableContent } from "../../../common/components/stack";
import { DeleteButton, UpdateButton } from "../../../common/ui";

export const TypePage = () => {
    const { data: types = [], isLoading, isError } = useGetTypesQuery();
    const { executeDelete } = useDeleteResourse();
    const [deleteType] = useDeleteTypeMutation();
    const dispatch = useAppDispatch();

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const { search, setSearch, filteredData } = useNameFilter(types);

    const columns: ColumnDef<Type>[] = [
        { header: 'Nombre', accessorKey: 'nombre' },
        { header: 'Encargado', accessorKey: 'encargado' },
        { header: 'Especificación', accessorKey: 'especificacion' },
        {
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <div className="flex gap-3">
                    <UpdateButton 
                        action={() => dispatch(openModal({ type: 'EDIT_TYPE', title: 'Editar Tipo', data: { type: row.original } }))}
                    />

                    <DeleteButton 
                        action={() => executeDelete(row.original.nombre, row.original.id, deleteType)}
                    />
                </div>
            )
        }
    ];

    const table = useTanStackTable({
        data: filteredData,
        columns,
        pagination,
        setPagination,
        columnVisibility,
        setColumnVisibility
    });

    const rows = table.getRowModel().rows.length;
    const total = types.length;
    const pageCount = table.getPageCount();

    if(isError) return <div className="p-5 text-red-500">Error al cargar la pagina</div>

    const handleCreateType = () => dispatch(openModal({ type: 'CREATE_TYPE', title: 'Tipo de Evento', data: { foo: 'Tipo' } }));

    return(
        <SectionContainer
            title="Tipos de Eventos"
            onAction={handleCreateType}
            actionLabel="Nuevo Tipo de Evento"
        >
            <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-md">
                <div className="flex items-center justify-between p-6">
                    <SearchInput search={search} setSearch={setSearch} setPagination={setPagination} />
                    <Meta rows={rows} total={total} />
                    <ColumnVisibiltyMenu allColumns={table.getAllColumns} />
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
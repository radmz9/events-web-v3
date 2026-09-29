import { useMemo, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { SectionContainer } from "../../../common/components/template/SectionContainer";
import { useDeleteResourse } from "../../../shared/utils/useDeleteResourse";
import { openModal } from "../../modals/services/modalSlice";
import { useDeletePlaceMutation, useGetPlacesQuery } from "../api/placeApi"
import type { Place } from "../types/place.types";
import { type ColumnDef, type PaginationState, type VisibilityState } from "@tanstack/react-table";
import { useNameFilter } from "../../../common/hooks/useNameFilter.hook";
import { useTanStackTable } from "../../../common/hooks/tanstack-table.hook";
import { ColumnVisibiltyMenu, Meta, Pagination, SearchInput, TableContent } from "../../../common/components/stack";
import { DeleteButton, UpdateButton } from "../../../common/ui";

export const PlacePage = () => {
    const { data: places = [], isLoading, isError } = useGetPlacesQuery();
    const { executeDelete } = useDeleteResourse();
    const [deletePlace] = useDeletePlaceMutation();
    const dispatch = useAppDispatch();

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const { search, setSearch, filteredData } = useNameFilter(places);

    const columns: ColumnDef<Place>[] = useMemo(() => [
        { header: 'Nombre', accessorKey: 'nombre' },
        { header: 'Ubicación', accessorKey: 'ubicacion' },
        { header: 'Capacidad', accessorKey: 'capacidad' },
        { header: 'Especificación', accessorKey: 'especificacion' },
        {
            id: 'actions',
            header: 'Acciones',
            enableHiding: false,
            cell: ({ row }) => (
                <div className="flex gap-3">
                    <UpdateButton 
                        action={() => dispatch(openModal({ type: 'EDIT_PLACE', title: 'Editar Lugar', data: { place: row.original } }))}
                    />

                    <DeleteButton
                        action={() => executeDelete(row.original.nombre, row.original.id, deletePlace)}
                    />
                </div>
            )
        }
    ], [dispatch, executeDelete, deletePlace]);

    const table = useTanStackTable({
        data: filteredData,
        columns,
        pagination,
        setPagination,
        columnVisibility,
        setColumnVisibility
    });

    const rows = table.getRowModel().rows.length;
    const total = places.length;
    const pageCount = table.getPageCount();

    if(isError) return <div className="p-5 text-red-500">Error al cargar la pagina</div>

    const handleCreatePlace = () => dispatch(openModal({ type: 'CREATE_PLACE', title: 'Nuevo Lugar', data: { foo: 'Lugar' } }))
    return(
        <SectionContainer
            title='Lugares'
            onAction={handleCreatePlace}
            actionLabel="Nuevo Lugar"
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
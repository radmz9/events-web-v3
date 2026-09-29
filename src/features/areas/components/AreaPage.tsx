import { useGetAreasByTypeQuery, useDeleteAreaMutation } from "../api/areaApi";
import type { Area } from "../types/area.types";
import { useAppDispatch } from "../../../app/hooks";
import { openModal } from "../../modals/services/modalSlice";
import { useDeleteResourse } from "../../../shared/utils/useDeleteResourse";
import { SectionContainer } from "../../../common/components/template/SectionContainer";
import { useMemo, useState } from "react";
import { type VisibilityState, type ColumnDef, type PaginationState } from "@tanstack/react-table";
import { useNameFilter } from "../../../common/hooks/useNameFilter.hook";
import { useTanStackTable } from "../../../common/hooks/tanstack-table.hook";
import { ColumnVisibiltyMenu, Meta, Pagination, SearchInput, TableContent } from "../../../common/components/stack";
import { DeleteButton, UpdateButton } from "../../../common/ui";

type AreaPageProps = {
    typeId: number;
    title: string;
}

export const AreaPage = ({ typeId, title }: AreaPageProps) => {
    const { data: areas = [], isLoading, isFetching, isError } = useGetAreasByTypeQuery(typeId);
    const dispatch = useAppDispatch();
    const { executeDelete } = useDeleteResourse();
    const [deleteArea] = useDeleteAreaMutation();

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0, 
        pageSize: 10
    });
    
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const { search, setSearch, filteredData } = useNameFilter(areas);

    const columns: ColumnDef<Area>[] = useMemo(() =>  [
        { header: 'Clave', accessorKey: 'clave' },
        { header: 'Nombre', accessorKey: 'nombre' },
        { header: 'Dependencia', accessorKey: 'dependencia' },
        {
            id: 'actions',
            header: 'Acciones',
            enableHiding: false,
            cell: ({ row }) => (
                <div className="flex gap-3 justify-center">
                    <UpdateButton 
                        action={() => dispatch(openModal({ type: 'EDIT_AREA', title: 'Editar Area', data: { area: row.original, typeId } }))}
                    />

                    <DeleteButton
                        action={() => executeDelete(row.original.nombre, row.original.id, deleteArea)}
                    />
                </div>
            )
        }
    ], [dispatch, executeDelete, deleteArea, typeId]);

    const finalColumns = typeId !== 4 ? columns : columns.filter((c) => c.header !== 'Dependencia');

    const table = useTanStackTable({
        data: filteredData,
        columns: finalColumns,
        pagination,
        setPagination,
        columnVisibility,
        setColumnVisibility
    });

    const rows = table.getRowModel().rows.length;
    const total = areas.length;

    if(isError) return <div className="p-5 text-red-500">Error al cargar las &aacute;reas</div>

    const handleCreateArea = () => {
        dispatch(openModal({ type: 'CREATE_AREA', title: 'Crear', data: { typeId } }))
    }

    return(
        <SectionContainer
            title={title}
            onAction={handleCreateArea}
            actionLabel="Nuevo Registro"
        >
            <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-md">
                <div className="flex items-center justify-between p-6">
                    <SearchInput search={search} setSearch={setSearch} setPagination={setPagination} />
                    <Meta rows={rows} total={total} />
                    <ColumnVisibiltyMenu allColumns={table.getAllColumns} />
                </div>
                <TableContent table={table} isLoading={isLoading || isFetching} />

                <Pagination
                    pagination={pagination}
                    setPagination={setPagination}
                    pageCount={table.getPageCount()}
                />
            </div>
            
        </SectionContainer>
    )
}
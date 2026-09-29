import { useMemo, useState } from "react";
import { UserPen, UserRoundX } from "lucide-react";
import { useAppDispatch } from "../../../app/hooks";
import { useDeleteResourse } from "../../../shared/utils/useDeleteResourse";
import { useDeleteStaffMutation, useGetStaffQuery } from "../api/staffApi";
import type { Staff } from "../types/staff.types";
import { openModal } from "../../modals/services/modalSlice";
import { SectionContainer } from "../../../common/components/template/SectionContainer";
import { useGetAreasByTypeQuery } from "../../areas/api/areaApi";
import { toOptions } from "../../../shared/utils/toOption.helper";
import { type PaginationState, type ColumnDef, type VisibilityState } from "@tanstack/react-table";
import { useTanStackTable } from "../../../common/hooks/tanstack-table.hook";
import { useNameFilter } from "../../../common/hooks/useNameFilter.hook";
import { ColumnVisibiltyMenu, Meta, Pagination, SearchInput, TableContent } from "../../../common/components/stack";
import { DeleteButton, UpdateButton, ViewButton } from "../../../common/ui";

type StaffPageProps = {
    typeId: number;
    title: string;
}

export const StaffPage = ({ typeId, title }: StaffPageProps) => {
    const { data: staff = [], isLoading, isFetching, isError } = useGetStaffQuery(typeId);
    const { data: areas = [] } = useGetAreasByTypeQuery(typeId === 5 ? 3 : 2);
    const { executeDelete } = useDeleteResourse();
    const [deleteStaff] = useDeleteStaffMutation();
    const dispatch = useAppDispatch();

    const areaOptions = toOptions(areas, { value: 'id', label: 'nombre' });

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const { search, setSearch, filteredData } = useNameFilter(staff);

    const columns: ColumnDef<Staff>[] = useMemo(() => [
        { header: 'Código', accessorKey: 'codigo' },
        { header: 'Nombre', accessorKey: 'nombre' },
        { header: 'Género', accessorKey: 'genero' },
        { header: 'Área', accessorKey: 'area' },
        {
            id: 'actions',
            header: 'Acciones',
            enableHiding: false,
            cell: ({ row }) => (
                <div className="flex gap-4">
                    <UpdateButton 
                        action={() => dispatch(openModal({ type: 'EDIT_STAFF', title: 'Editar Registro', data: { typeId, staff: row.original, areaOptions } }))}
                        icon={<UserPen />}
                    />

                    <ViewButton url={`/comunidad/personal/${row.original.codigo}`} />

                    <DeleteButton 
                        action={() => executeDelete(row.original.nombre, row.original.id, deleteStaff)}
                        icon={<UserRoundX />}
                    />
                </div>
            )
        }
    ], [dispatch, executeDelete, deleteStaff, areaOptions, typeId]);

    const table = useTanStackTable({
        data: filteredData,
        columns,
        pagination,
        setPagination,
        columnVisibility,
        setColumnVisibility
    });

    const rows = table.getRowModel().rows.length;
    const total = staff.length;

    if(isError) return <div className="p-5 text-red-500">Error al cargar la pagina</div>

    const handleCreateStaff = () => {
        dispatch(openModal({ type: 'CREATE_STAFF', title: 'Crear', data: { typeId, areaOptions } }))
    }

    return(
        <SectionContainer
            title={title}
            onAction={handleCreateStaff}
            actionLabel="Nuevo"
        >
            <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-md">
                <div className="flex items-center justify-between p-6">
                    <SearchInput search={search} setSearch={setSearch} setPagination={setPagination} />
                    <Meta rows={rows} total={total} />
                    <ColumnVisibiltyMenu allColumns={table.getAllColumns} />
                </div>

                <TableContent table={table} isLoading={isLoading || isFetching} />
                { rows < total ? (
                    <Pagination
                        pagination={pagination}
                        setPagination={setPagination}
                        pageCount={table.getPageCount()}
                    />
                ) : null }
            </div>
        </SectionContainer>
    )
}
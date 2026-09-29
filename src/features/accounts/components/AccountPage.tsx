import { useMemo, useState } from "react";
import { useAppDispatch } from "../../../app/hooks"
import { SectionContainer } from "../../../common/components/template/SectionContainer"
import { useDeleteAccountMutation, useGetAccountsQuery, useGetAvailableAreasQuery, useGetAvailableStaffQuery } from "../api/accountsApi";
import type { AuthAccount } from "../types/accounts.types";
import { openModal } from "../../modals/services/modalSlice";
import { toOptions } from "../../../shared/utils/toOption.helper";
import { useDeleteResourse } from "../../../shared/utils/useDeleteResourse";
import { type ColumnDef, type PaginationState } from "@tanstack/react-table";
import { useNameFilter } from "../../../common/hooks/useNameFilter.hook";
import { useTanStackTable } from "../../../common/hooks/tanstack-table.hook";
import { Meta, Pagination, SearchInput, TableContent } from "../../../common/components/stack";
import { DeleteButton, UpdateButton } from "../../../common/ui";
import { Replace } from "lucide-react";

export const AccountPage = () => {
    const dispatch = useAppDispatch();
    const { data: accounts = [], isLoading, isError } = useGetAccountsQuery();
    const { data: areas = [], isLoading: loadingAreas } = useGetAvailableAreasQuery();
    const { data: staff = [], isLoading: loadingStaff } = useGetAvailableStaffQuery();
    const { executeDelete } = useDeleteResourse();
    const [deleteAccount] = useDeleteAccountMutation();

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const { search, setSearch, filteredData } = useNameFilter(accounts);

    const areaOptions = toOptions(areas, { value: 'id', label: 'nombre' });
    const staffOptions = toOptions(staff, { value: 'id', label: 'nombre' });

    const columns: ColumnDef<AuthAccount>[] = useMemo(() => [
        { header: 'Usuario', accessorKey: 'user_codigo' },
        { header: 'Nombre', accessorKey: 'nombre' },
        { header: 'Área', accessorKey: 'managedAreaName' },
        { header: 'Cargo', accessorKey: 'rolName' },
        {
            id: 'actions',
            header: 'Acciones',
            cell: ({row}) => (
                <div className="flex gap-3">
                    <UpdateButton 
                        action={() => dispatch(openModal({ type: 'UPDATE_ACCOUNT', title: `Editar: ${row.original.managedAreaName}`, data: { accountId: row.original.id, staffOptions } }))}
                        icon={<Replace />}
                    />

                    <DeleteButton 
                        action={() => executeDelete(row.original.nombre, row.original.id, deleteAccount)}
                    />
                </div>
            )
        }
    ], [dispatch, executeDelete, deleteAccount, staffOptions]);

    const table = useTanStackTable({
        data: filteredData,
        columns,
        pagination,
        setPagination
    });

    const rows = table.getRowModel().rows.length;
    const total = accounts.length;
    const pageCount = table.getPageCount();

    if(isError) return <div className="p-5 text-red-500">Error al cargar las cuentas</div>

    const handleCreateAccount = () => {
        dispatch(openModal({ type: 'CREATE_ACCOUNT', title: 'Crear Cuenta', data: { areaOptions, staffOptions } }))
    }
    return(
        <SectionContainer
            title="Cuentas"
            onAction={handleCreateAccount}
            actionLabel="Nueva cuenta"
        >   
            <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-md">
                { loadingAreas || loadingStaff && <p className="">Cargando datos.....</p> }
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
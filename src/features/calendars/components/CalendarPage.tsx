import { type PaginationState, type VisibilityState, type ColumnDef } from "@tanstack/react-table";
import { SectionContainer } from "../../../common/components/template/SectionContainer";
import { useDeleteCalendarMutation, useGetCalendarsQuery } from "../api/calendarApi";
import type { Calendar } from "../types/calendar.types";
import { useMemo, useState } from "react";
import { useTanStackTable } from "../../../common/hooks/tanstack-table.hook";
import { useNameFilter } from "../../../common/hooks/useNameFilter.hook";
import { useAppDispatch } from "../../../app/hooks";
import { openModal } from "../../modals/services/modalSlice";
import { useDeleteResourse } from "../../../shared/utils/useDeleteResourse";
import { ColumnVisibiltyMenu, Meta, Pagination, TableContent, SearchInput } from "../../../common/components/stack";
import { DeleteButton, UpdateButton } from "../../../common/ui";

export const CalendarPage = () => {
    const dispatch = useAppDispatch();
    const { executeDelete } = useDeleteResourse();
    const [deleteCalendar] = useDeleteCalendarMutation();
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const { data: calendars = [], isLoading, isError } = useGetCalendarsQuery();

    const { search, setSearch, filteredData } = useNameFilter(calendars);

    const columns: ColumnDef<Calendar>[] = useMemo(() =>  [
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'nombre', header: 'Calendario' },
        {
            id: 'acciones',
            header: 'Acciones',
            enableHiding: false,
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <UpdateButton 
                        action={() => dispatch(openModal({ type: 'EDIT_CALENDAR', title: 'Editar Calendario Escolar', data: { calendar: row.original } }))}
                    />

                    <DeleteButton 
                        action={() => executeDelete(row.original.nombre, row.original.id, deleteCalendar)}
                    />
                </div>
            )
        }
    ], [dispatch, executeDelete, deleteCalendar]);

    const table = useTanStackTable({
        data: filteredData,
        columns,
        pagination,
        setPagination,
        columnVisibility,
        setColumnVisibility
    });

    const rows = table.getRowModel().rows.length;
    const total = calendars.length;

    const handleCreateCalendar = () => dispatch(openModal({ type: 'CREATE_CALENDAR', title: 'Crear Calendario Escolar', data: { foo: 'calendario' } }))

    if(isError) return <div className="p-5 text-red-500">Error al cargar la pagina</div>
    return(
        <SectionContainer
            title="Calendarios Escolares"
            onAction={handleCreateCalendar}
            actionLabel="Nuevo Calendario Escolar"
        >
            <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-md">
                <div className="flex items-center justify-between p-6">
                    <SearchInput search={search} setSearch={setSearch} setPagination={setPagination} />
                    <Meta rows={rows} total={total} />
                    <ColumnVisibiltyMenu allColumns={table.getAllColumns} />
                </div>

                <TableContent table={table} isLoading={isLoading} />

                <Pagination 
                    pagination={pagination} 
                    setPagination={setPagination}
                    pageCount={table.getPageCount()} 
                />
            </div>
        </SectionContainer>
    )
}
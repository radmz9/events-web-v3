import { useMemo } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import type { StudentTypes } from "../types/student.types"
import { useTanStackTable } from "../../../common/hooks/tanstack-table.hook"
import { useNameFilter } from "../../../common/hooks/useNameFilter.hook"
import { TableContent, Meta, SearchInput } from "../../../common/components/stack"
import type { SearchFilters } from "./RootView"
import { useDeleteStudentMutation, useGetStudentsByAreaQuery } from "../api/studentApi"
import { skipToken } from "@reduxjs/toolkit/query"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { openModal } from "../../modals/services/modalSlice"
import { useGetCalendarsQuery } from "../../calendars/api/calendarApi"
import { useGetSedesQuery } from "../../sedes/api/sedeApi"
import { useGetAreasByTypeQuery } from "../../areas/api/areaApi"
import { toOptions } from "../../../shared/utils/toOption.helper"
import { useDeleteResourse } from "../../../shared/utils/useDeleteResourse"
import { DeleteButton, UpdateButton, ViewButton } from "../../../common/ui"

interface Props {
    filters: SearchFilters | null;
}

const EMPTY_STATE: StudentTypes[] = [];

export const StudentTable = ({ filters }: Props) => {
    const { role } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const { data: calendars = [] } = useGetCalendarsQuery();
    const { data: sedes = [] } = useGetSedesQuery();
    const { data: areas = [] } = useGetAreasByTypeQuery(
        role === 'ROOT' ? 1 : skipToken
    );

    const areaOptions = areas ? toOptions(areas, { value: 'id', label: 'nombre' }) : undefined;
    const calendarOptions = toOptions(calendars, { value: 'id', label: 'nombre' });
    const sedeOptions = toOptions(sedes, { value: 'id', label: 'nombre' });

    const { data, isLoading, isFetching } = useGetStudentsByAreaQuery(
        filters ? { areaId: filters.areaId, calendarId: filters.calendarId } : skipToken
    );

    const { executeDelete } = useDeleteResourse();
    const [deleteStudent] = useDeleteStudentMutation()

    const students = data ?? EMPTY_STATE;

    const { search, setSearch, filteredData } = useNameFilter(students);

    const columns: ColumnDef<StudentTypes>[] = useMemo(() => [
        { header: 'Código', accessorKey: 'codigo' },
        { header: 'Nombre', accessorKey: 'nombre' },
        { header: 'Género', accessorKey: 'genero' },
        { header: 'Etnia', accessorKey: 'etnia' },
        { header: 'Estatus', accessorKey: 'rol' },
        { header: 'Calendario', accessorKey: 'calendario' },
        { header: 'Sede', accessorKey: 'sede' },
        {
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <div className="flex gap-3 justify-center">
                    <UpdateButton 
                        action={() => dispatch(openModal({ type: 'UPDATE_STUDENT', title: 'Editar Estudiante', data: {
                            student: row.original,
                            areaOptions, calendarOptions, sedeOptions
                        } }))}
                    />

                    <ViewButton url={`/comunidad/alumnos/${row.original.codigo}`} />

                    <DeleteButton 
                        action={() => executeDelete(row.original.nombre, row.original.id, deleteStudent)}
                    />
                </div>
            )
        }
    ], [dispatch, areaOptions, calendarOptions, sedeOptions, executeDelete, deleteStudent]);

    const table = useTanStackTable({
        data: filteredData,
        columns,
    });

    const rows = table.getRowModel().rows.length;
    const total = students.length

    if(!filters) return null;

    return(
        <div className="overflow-x-auto rounded-lg border border-l-sky-200 shadow-md">
            <div className="flex items-center justify-between p-6">
                <SearchInput search={search} setSearch={setSearch} />
                <Meta rows={rows} total={total} />
            </div>
            <TableContent table={table} isLoading={isLoading || isFetching}/>
        </div>
    )
}
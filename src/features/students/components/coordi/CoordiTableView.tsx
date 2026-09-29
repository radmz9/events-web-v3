import { useDispatch } from "react-redux";
import type { StudentTypes } from "../../types/student.types";
import { useNavigate } from "react-router-dom";
import { useGetCalendarsQuery } from "../../../calendars/api/calendarApi";
import { useGetSedesQuery } from "../../../sedes/api/sedeApi";
import { toOptions } from "../../../../shared/utils/toOption.helper";
import { useDeleteStudentMutation, useGetMyStudentsQuery } from "../../api/studentApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useDeleteResourse } from "../../../../shared/utils/useDeleteResourse";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { UserPen, Info, UserX } from "lucide-react";
import { openModal } from "../../../modals/services/modalSlice";
import { useTanStackTable } from "../../../../common/hooks/tanstack-table.hook";
import { Meta, SearchInput, TableContent } from "../../../../common/components/stack";
import { useNameFilter } from "../../../../common/hooks/useNameFilter.hook";

interface Props {
    calendarId: string | null;
}

const EMPTY_STATE: StudentTypes[] = [];

export const CoordiTableView = ({ calendarId }: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data: calendars = [] } = useGetCalendarsQuery();
    const { data: sedes = [] } = useGetSedesQuery();

    const calendarOptions = toOptions(calendars, { value: 'id', label: 'nombre' });
    const sedeOptions = toOptions(sedes, { value: 'id', label: 'nombre' });

    const { data, isLoading, isFetching } = useGetMyStudentsQuery(
        calendarId ? calendarId : skipToken
    );

    const { executeDelete } = useDeleteResourse();
    const [deleteStudent] = useDeleteStudentMutation();

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
                    <UserPen 
                        aria-label="Editar"
                        className="cursor-pointer text-sky-600 hover:text-sky-900 hover:h-6"
                        onClick={() => dispatch(openModal({ type: 'UPDATE_STUDENT', title: 'Editar Estudiante', data: {
                            student: row.original,
                            calendarOptions, sedeOptions
                        } }))}
                    />

                    <Info 
                        className="cursor-pointer text-emerald-500 hover:text-emerald-700"
                        aria-label="Ver detalles"
                        onClick={() => navigate(`/comunidad/alumnos/${row.original.codigo}`)}
                    />

                    <UserX 
                        className="cursor-pointer text-red-600 hover:text-red-900 hover:h-6"
                        aria-label="Eliminar"
                        onClick={() => executeDelete(row.original.nombre, row.original.id, deleteStudent)}
                    />
                </div>
            )
        }
    ], [dispatch, calendarOptions, sedeOptions, executeDelete, deleteStudent, navigate ]);

    const table = useTanStackTable({
        data: filteredData,
        columns
    });

    const rows = table.getRowModel().rows.length;
    const total = students.length;

    if(!calendarId) return null;

    return(
        <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-md">
            <div className="flex items-center justify-between p-6">
                <SearchInput search={search} setSearch={setSearch} />
                <Meta rows={rows} total={total} />
            </div>

            <TableContent table={table} isLoading={isLoading || isFetching} />
        </div>
    )
}
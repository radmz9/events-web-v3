import type { ColumnDef } from "@tanstack/react-table";
import type { ReportByGender } from "../types/by_gender.types";

export const reportByGenderColumns: ColumnDef<ReportByGender>[] = [
    { header: 'Área', accessorKey: 'area',
        cell: ({ getValue }) => (
            <div className="text-xs max-w-40 line-clamp-2">
                {getValue<string>()}
            </div>
        )
    },
    { header: 'Evento', accessorKey: 'nombre',
        cell: ({ getValue, row }) => (
            <div className="text-xs max-w-72">
                <p className="line-clamp-2">
                    <span className="font-medium">{row.original.tipo}</span>{": "}
                    {getValue<string>()}
                </p>
            </div>
        )
    },
    { header: 'Temática', accessorKey: 'tematica',
        cell: ({ getValue }) => (
            <div className="text-xs max-w-40">
                {getValue<string>()}
            </div>
        )
    },
    { header: 'Ods', accessorKey: 'ods',
        cell: ({ getValue }) => (
            <div className="text-xs max-w-40">
                {getValue<string>()}
            </div>
        )
    },
    {
        header: 'Alumnos',
        columns: [
            { header: 'H', accessorKey: 'stats.alumnos.hombres', cell: ({ getValue }) => (
                <div className="text-xs text-center">
                    {getValue<number>()}
                </div>
            ) },
            { header: 'M', accessorKey: 'stats.alumnos.mujeres', cell: ({ getValue }) => (
                <div className="text-xs text-center">
                    {getValue<number>()}
                </div>
            ) },
            { header: 'I', accessorKey: 'stats.alumnos.indigenas', cell: ({ getValue }) => (
                <div className="text-xs text-center">
                    {getValue<number>()}
                </div>
            ) },
            { header: 'T', accessorKey: 'stats.alumnos.total', cell: ({ getValue }) => (
                <div className="text-xs text-center font-bold">
                    {getValue<number>()}
                </div>
            ) },
        ]
    },
    {
        header: 'Egresados',
        columns: [
            { header: 'H', accessorKey: 'stats.egresados.hombres', cell: ({ getValue }) => (
                <div className="text-xs text-center">
                    {getValue<number>()}
                </div>
            ) },
            { header: 'M', accessorKey: 'stats.egresados.mujeres', cell: ({ getValue }) => (
                <div className="text-xs text-center">
                    {getValue<number>()}
                </div>
            ) },
            { header: 'I', accessorKey: 'stats.egresados.indigenas', cell: ({ getValue }) => (
                <div className="text-xs text-center">
                    {getValue<number>()}
                </div>
            ) },
            { header: 'T', accessorKey: 'stats.egresados.total', cell: ({ getValue }) => (
                <div className="text-xs text-center font-bold">
                    {getValue<number>()}
                </div>
            ) },
        ]
    },
    {
        header: 'Profesores',
        columns: [
            { header: 'H', accessorKey: 'stats.profesores.hombres', cell: ({ getValue }) => (
                <div className="text-xs text-center">
                    {getValue<number>()}
                </div>
            ) },
            { header: 'M', accessorKey: 'stats.profesores.mujeres', cell: ({ getValue }) => (
                <div className="text-xs text-center">
                    {getValue<number>()}
                </div>
            ) },
            { header: 'T', accessorKey: 'stats.profesores.total', cell: ({ getValue }) => (
                <div className="text-xs text-center font-bold">
                    {getValue<number>()}
                </div>
            ) },
        ]
    },
    {
        header: 'Administrativos',
        columns: [
            { header: 'H', accessorKey: 'stats.administrativos.hombres', cell: ({ getValue }) => (
                <div className="text-xs text-center">
                    {getValue<number>()}
                </div>
            ) },
            { header: 'M', accessorKey: 'stats.administrativos.mujeres', cell: ({ getValue }) => (
                <div className="text-xs text-center">
                    {getValue<number>()}
                </div>
            ) },
            { header: 'T', accessorKey: 'stats.administrativos.total', cell: ({ getValue }) => (
                <div className="text-xs text-center font-bold">
                    {getValue<number>()}
                </div>
            ) },
        ]
    },
    { header: 'Total', accessorKey: 'stats.total', cell: ({ getValue }) => (
        <div className="text-xs text-center font-bold">
            {getValue<number>()}
        </div>
    ) }
];
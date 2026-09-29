import type { ColumnDef } from "@tanstack/react-table";
import type { ReportByRoles } from "../types/by_roles.types";
import dayjs from "dayjs";

export const reportByRolesColumns: ColumnDef<ReportByRoles>[] = [
    { 
        header: 'Área', 
        accessorKey: 'area',
        cell: ({ getValue }) => (
            <div className="text-xs max-w-40 line-clamp-2">
                {getValue<string>()}
            </div>
        )
    },
    { header: 'Evento', accessorKey: 'nombre',
        cell: ({ getValue, row }) => (
            <div className="text-xs max-w-72">
                <p className="line-clamp-3">
                    <span className="font-medium">{row.original.tipo}</span>{": "}
                    {getValue<string>()}
                </p>
            </div>
        )
    },
    { header: 'Modalidad', accessorKey: 'modalidad',
        cell: ({ getValue }) => (
            <div className="text-xs ">
                {getValue<string>()}
            </div>
        )
    },
    { header: 'Temática', accessorKey: 'tematica',
        cell: ({ getValue }) => (
            <div className="text-xs ">
                {getValue<string>()}
            </div>
        )
    },
    { header: 'Fecha', accessorKey: 'fecha',
        cell: ({ getValue }) => (
            <div className="text-xs text-center ">
                {dayjs(getValue<string>()).format('MMM D')}
            </div>
        )
    },
    { header: 'Estudiantes', accessorKey: 'stats.estudiantes',
        cell: ({ getValue }) => (
            <div className="text-xs text-center">
                {getValue<number>()}
            </div>
        )
    },
    { header: 'Docentes', accessorKey: 'stats.profesores',
        cell: ({ getValue }) => (
            <div className="text-xs text-center">
                {getValue<number>()}
            </div>
        )
    },
    { header: 'Administrativos', accessorKey: 'stats.administrativos',
        cell: ({ getValue }) => (
            <div className="text-xs text-center">
                {getValue<number>()}
            </div>
        )
    },
    { header: 'Externos', accessorKey: 'stats.externos',
        cell: ({ getValue }) => (
            <div className="text-xs text-center tabular-nums">
                {getValue<number>()}
            </div>
        )
    },
    { header: 'Total', accessorKey: 'stats.total',
        cell: ({ getValue }) => (
            <div className="text-xs text-center font-bold tabular-nums">
                {getValue<number>()}
            </div>
        )
    }
]
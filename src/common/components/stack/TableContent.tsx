import { flexRender, type Table } from "@tanstack/react-table"
import { TableSkeleton } from "../utils/TableSkeleton";
import { TableEmptyState } from "../utils/TableEmptyState";

type Props<TData> = {
    isLoading?: boolean;
    table: Table<TData>;
}

export const TableContent = <TData, >({ table, isLoading = false }: Props<TData>) => {
    const columns = table.getFlatHeaders().length;
    const pageRows = table.getPaginationRowModel().rows.length;

    if(isLoading) return <TableSkeleton columnsCount={columns} />
    
    if(pageRows === 0) return <TableEmptyState />

    return(
        <table className="w-full text-left text-sm text-slate-600 border border-t-slate-200">
            <thead className="bg-slate-50 text-sm uppercase text-center text-slate-500 tracking-wider">
                { table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        { headerGroup.headers.map(header => { 
                            const isGroup = header.column.columns.length > 0;
                            return(
                                <th key={header.id} colSpan={header.colSpan}>
                                    { header.isPlaceholder ? null : (
                                        <div className={`px-4 py-3 font-semibold ${isGroup ? "bg-slate-400 rounded-md text-slate-100 border border-r-slate-200" : ""}`}>
                                            { flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            ) }
                                        </div>
                                    ) }
                                </th>
                            )}
                        )}
                    </tr>
                )) }
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
                { table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-sky-50/40 transition-colors group">
                        { row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="px-4 py-3">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        )) }
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
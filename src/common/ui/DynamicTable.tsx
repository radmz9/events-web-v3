import type { Props } from "../types/types"
import { TableSkeleton } from "../components/utils/TableSkeleton"
import { TableEmptyState } from "../components/utils/TableEmptyState"

export const DynamicTable = <T extends { id: number }> ({ columns, data, isLoading }: Props<T>) => {
    if(isLoading) return <TableSkeleton columnsCount={columns.length} />

    if(data.length === 0) return <TableEmptyState />

    return(
        <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
            <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500 tracking-wider">
                    <tr>
                        {columns.map((c) => (
                            <th key={c.header} className="px-6 py-3 font-semibold">
                                {c.header}
                            </th>
                        ))} 
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                    { data.map((item) => (
                        <tr key={item.id} className="hover:bg-sky-50/40 transition-colors group">
                            { columns.map((c) => (
                                <td key={c.header} className="whitespace-nowrap px-6 py-4 text-slate-700">
                                    {c.render ? c.render(item) : (item[c.key as keyof T] as React.ReactNode)}
                                </td>
                            )) }
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    )
}
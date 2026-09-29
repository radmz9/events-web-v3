interface TableSkeletonProps {
    columnsCount: number;
    rowsCount?: number;
}

export const TableSkeleton = ({ columnsCount, rowsCount = 5 }: TableSkeletonProps) => {
    return(
        <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm animate-pulse">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50">
                    <tr>
                        {Array.from({ length: columnsCount }).map((_, i) => (
                            <th className="px-6 py-3" key={i}>
                                <div className="h-4 w-20 bg-slate-200 rounded" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                    {Array.from({ length: rowsCount }).map((_, i) => (
                        <tr key={i}>
                            {Array.from({ length: columnsCount }).map((_, j) => (
                                <td className="px-6 py-4" key={j}>
                                    <div className="h-4 bg-slate-100 rounded w-full" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
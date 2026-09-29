import type React from "react";

export type TopHeader = {
    colspan?: number;
    title: string;
}

type TableProps = {
    topHeaders?: TopHeader[];
    headers: string[];
    children: React.ReactNode;
}

export const ReportTable = ({ headers, topHeaders, children }: TableProps) => {
    return(
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    { topHeaders && (
                        <tr>
                            {topHeaders.map((s, i) => (
                                <th key={i} 
                                    colSpan={s.colspan} 
                                    className={`px-4 py-3 text-center uppercase text-sm font-semibold text-slate-900`}
                                >
                                    {s.title}
                                </th>
                            ))}
                        </tr>
                    ) }
                    <tr>
                        { headers.map((h, i) =>(
                            <th key={i} className="px-4 py-3 text-center text-sm font-semibold text-slate-700">
                                {h}
                            </th>
                        )) }
                    </tr>
                </thead>
                {children}
            </table>
        </div>
    )
}
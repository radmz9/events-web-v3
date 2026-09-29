import { useState } from "react";
import { generateYears } from "./year.constant"
import { useGeneralReportQuery } from "../api/reportsApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { Header } from "./Header";
import { YearWrapper } from "./YearWrapper";

const YEARS = generateYears();

export const GeneralReport = () => {
    const [year, setYear] = useState<string>("");
    const { data, isLoading, isFetching } = useGeneralReportQuery(
        year === "" ? skipToken : Number(year)
    );

    const title = 'Reporte General de Eventos por Área.'
    return(
        <div className="space-y p-6">
            <Header
                title={title}
                years={YEARS}
                selectedYear={year}            
                onYearChange={setYear}
                total={data?.total}
            />

            <YearWrapper year={year} isLoading={isLoading || isFetching}>
                <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                    <table className="min-w-full table-fixed divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th>Áreas</th>
                                { data?.types.map((t, i) => (
                                    <th 
                                        className="p-2 text-center text-xs text-slate-700 font-semibold border border-slate-200" key={i}
                                        style={{ writingMode: 'sideways-rl', transform: 'rotate(180deg)' }}
                                    >
                                        {t.nombre}
                                    </th>
                                )) }
                                <th className="px-4 py-3 text-center text-sm text-slate-700 font-semibold">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            { data?.areas.map((a) => (
                                <tr className="transition-colors hover:bg-slate-50" key={a.clave}>
                                    <td className="px-4 py-3 font-bold hover:cursor-pointer bg-slate-50" title={a.area}>{a.clave}</td>
                                    { a.eventos.map((e, i) => (
                                        <td className={`px-4 py-3 text-center ${e.total === 0 ? 'bg-red-100' : ''} `} key={i}>
                                            {e.total}
                                        </td>
                                    )) }
                                    <td className="px-4 py-3 font-bold bg-slate-50 text-center">{a.total}</td>
                                </tr>
                            )) }
                        </tbody>
                        <tfoot className="bg-slate-50 hover:bg-slate-100">
                            <tr>
                                <th>Total</th>
                                { data?.types.map((t, i) => (
                                    <th className="px-4 py-3 text-center text-sm text-slate-700 border border-slate-200" key={i}>
                                        {t.total}
                                    </th>
                                )) }
                                <th className="px-4 py-3 text-center font-bold">{data?.total}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </YearWrapper>
        </div>
    )
}
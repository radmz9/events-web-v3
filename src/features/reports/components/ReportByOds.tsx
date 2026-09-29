import { useState } from "react";
import { generateYears } from "./year.constant"
import { useReportByOdsQuery } from "../api/reportsApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { Header } from "./Header";
import { ReportTable, type TopHeader } from "./Table/ReportTable";
import { YearWrapper } from "./YearWrapper";

const YEARS = generateYears();

const topHeaders: TopHeader[] = [
    { colspan: 3, title: '' },
    { colspan: 2, title: 'Comunidad Universitaria' },
    { colspan: 2, title: 'Sociedad en General' }
]

const headers = [
    'ODS',
    'No. Actividades',
    'Participantes',
    'Hombres',
    'Mujeres',
    'Hombres',
    'Mujeres'
]

export const ReportByOds = () => {
    const [year, setYear] = useState<string>("");
    const { data, isLoading, isFetching, isError } = useReportByOdsQuery(
        year === "" ? skipToken : Number(year)
    )
    const title = 'Reporte Histórico ODS';

    return(
        <div className="space-y-6 p-6">
            <Header
                title={title}
                years={YEARS}
                selectedYear={year}
                onYearChange={setYear}
                total={data?.generalStats.actividades}
            />

            <YearWrapper
                isLoading={isLoading || isFetching}
                isError={isError}
                year={year}
            >
                <ReportTable
                    topHeaders={topHeaders}
                    headers={headers}
                >   
                    <tbody className="divide-y divide-slate-100 text-sm">
                        { data?.report.map((o) => (
                            <tr className="transition-colors hover:bg-slate-50" key={o.id}>
                                <td className="px-4 py-3">{o.nombre}</td>
                                <td className="px-4 py-3 text-center">{o.totalEventos}</td>
                                <td className="px-4 py-3 text-center">{o.stats.asistencia}</td>
                                <td className="px-4 py-3 text-center">{o.stats.comunidad.hombres}</td>
                                <td className="px-4 py-3 text-center">{o.stats.comunidad.mujeres}</td>
                                <td className="px-4 py-3 text-center">{o.stats.externos.hombres}</td>
                                <td className="px-4 py-3 text-center">{o.stats.externos.mujeres}</td>
                            </tr>
                        )) }
                    </tbody>
                    <tfoot className="bg-slate-50">
                        <tr className="transition-colors text-sm">
                            <th className="px-4 py-3">Total</th>
                            <th className="px-4 py-3">{data?.generalStats.actividades}</th>
                            <th className="px-4 py-3">{data?.generalStats.asistencia}</th>
                            <th className="px-4 py-3">{data?.generalStats.comunidad.hombres}</th>
                            <th className="px-4 py-3">{data?.generalStats.comunidad.mujeres}</th>
                            <th className="px-4 py-3">{data?.generalStats.externos.hombres}</th>
                            <th className="px-4 py-3">{data?.generalStats.externos.mujeres}</th>
                        </tr>
                    </tfoot>
                </ReportTable>
            </YearWrapper>
        </div>
    )
}
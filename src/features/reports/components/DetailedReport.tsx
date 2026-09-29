import { useState } from "react";
import { generateYears } from "./year.constant";
import { useDetailedReportByStudentsQuery } from "../api/reportsApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { Header } from "./Header";
import { ReportTable, type TopHeader } from "./Table/ReportTable";
import { YearWrapper } from "./YearWrapper";

const YEARS = generateYears();

const topHeaders: TopHeader[] = [
    { colspan: 1, title: '' },
    { colspan: 4, title: 'Rango de asistencia' },
    { colspan: 1, title: '' }
]

const headers = [
    'Carrera',
    '1 - 3',
    '4 - 6',
    '7 - 9',
    ' + de 10',
    'Total'
]

export const DetailedReport = () => {
    const [year, setYear] = useState<string>("");
    const { data: report = [], isLoading, isFetching, isError } = useDetailedReportByStudentsQuery(
        year === "" ? skipToken : Number(year)
    )
    const title = 'Reporte por Rango de Asistencia de Alumnos a Eventos.';

    return(
        <div className="space-y p-6">
            <Header
                title={title}
                years={YEARS}
                selectedYear={year}
                onYearChange={setYear}
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
                        { report.map((a) => (
                            <tr className="transition-colors hover:bg-slate-50" key={a.id}>
                                <td className="px-4 py-3">{a.nombre}</td>
                                <td className="px-4 py-3 text-center">{a.groupOne}</td>
                                <td className="px-4 py-3 text-center">{a.groupThree}</td>
                                <td className="px-4 py-3 text-center">{a.groupThree}</td>
                                <td className="px-4 py-3 text-center">{a.groupFour}</td>
                                <td className="px-4 py-3 text-center font-bold">{a.total}</td>
                            </tr>
                        )) }
                    </tbody>
                </ReportTable>
            </YearWrapper>
        </div>
    )
}
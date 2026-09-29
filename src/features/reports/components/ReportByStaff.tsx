import { useState } from "react";
import { useReportByStaffQuery } from "../api/reportsApi";
import { ReportTable, type TopHeader } from "./Table/ReportTable";
import { generateYears } from "./year.constant";
import { skipToken } from "@reduxjs/toolkit/query";
import { Header } from "./Header";
import { YearWrapper } from "./YearWrapper";

const YEARS = generateYears();

const topHeaders: TopHeader[] = [
    { colspan: 2, title: '' },
    { colspan: 3, title: 'Profesores' },
    { colspan: 1, title: '' },
    { colspan: 3, title: 'Administrativos' },
];

const headers = [
    'Año',
    'Profesores',
    'Hombres',
    'Mujeres',
    'Asistencia',
    'Administrativos',
    'Hombres',
    'Mujeres',
    'Asistencia'
]

export const ReportByStaff = () => {
    const [year, setYear] = useState<string>("");
    const { data: report = [], isLoading, isFetching, isError } = useReportByStaffQuery(
        year === "" ? skipToken : Number(year)
    );

    const title = 'Reporte de Asistencia del Personal Administrativo.';
    return(
        <div className="space-y-6 p-6">
            <Header 
                title={title}
                years={YEARS}
                selectedYear={year}
                onYearChange={setYear}
            />

            <YearWrapper
                year={year}
                isLoading={isLoading || isFetching}
                isError={isError}
            >
                <ReportTable
                    topHeaders={topHeaders}
                    headers={headers}
                >
                    <tbody className="divide-y divide-slate-100 text-sm">
                        { report.map(((r, i) => (
                            <tr className="transition-colors hover:bg-slate-50" key={i}>
                                <td className="px-4 py-3 text-center font-bold">{r.year}</td>
                                <td className="px-4 py-3 text-center bg-slate-100 font-semibold">{r.totalProfesores}</td>
                                <td className="px-4 py-3 text-center">{r.profesores.hombres}</td>
                                <td className="px-4 py-3 text-center">{r.profesores.mujeres}</td>
                                <td className="px-4 py-3 text-center font-bold">{r.profesores.total}</td>
                                <td className="px-4 py-3 text-center bg-slate-100 font-semibold">{r.totalAdministrativos}</td>
                                <td className="px-4 py-3 text-center">{r.administrativos.hombres}</td>
                                <td className="px-4 py-3 text-center">{r.administrativos.mujeres}</td>
                                <td className="px-4 py-3 text-center font-bold">{r.administrativos.total}</td>
                            </tr>
                        ))) }
                    </tbody>
                </ReportTable>
            </YearWrapper>
        </div>
    )
}
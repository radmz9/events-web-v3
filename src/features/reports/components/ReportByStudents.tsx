import { useState } from "react";
import { useReportByStudentsQuery } from "../api/reportsApi";
import { generateYears } from "./year.constant"
import { skipToken } from "@reduxjs/toolkit/query";
import { Header } from "./Header";
import { ReportTable } from "./Table/ReportTable";
import { YearWrapper } from "./YearWrapper";

const YEARS = generateYears();

const headers = [
    'Carreras',
    'Alumnos Activos',
    'Hombres',
    'Mujeres',
    'Indigenas',
    'Asistencia'
];

export const ReportByStudents = () => {
    const [year, setYear] = useState<string>("");
    const { data: report = [], isLoading, isFetching, isError } = useReportByStudentsQuery(
        year === "" ? skipToken : Number(year)
    )

    const title = 'Reporte de Asistencia de Alumnos por Carrera.';
    
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
                    headers={headers}
                >
                    <tbody className="divide-y divide-slate-100 text-sm">
                        { report.map((d) => (
                            <tr className="transition-colors hover:bg-slate-50" key={d.id}>
                                <td className="px-4 py-3">{d.nombre}</td>
                                <td className="px-4 py-3 text-center font-bold bg-slate-50">{d.alumnos}</td>
                                <td className="px-4 py-3 text-center">{d.hombres}</td>
                                <td className="px-4 py-3 text-center">{d.mujeres}</td>
                                <td className="px-4 py-3 text-center">{d.indigenas}</td>
                                <td className="px-4 py-3 text-center font-bold bg-slate-50">{d.total}</td>
                            </tr>
                        )) }
                    </tbody>
                </ReportTable>
            </YearWrapper>
        </div>
    )

}
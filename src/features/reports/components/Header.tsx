import { Info, Logs } from "lucide-react";
import type React from "react";

type HeaderProps = {
    title: string;
    selectedYear: string;
    years: number[];
    onYearChange: (year: string) => void;
    children?: React.ReactNode;
    total?: number;
}

export const Header = ({ title, selectedYear, years, onYearChange, children, total }: HeaderProps) => {
    return(
        <div className="mb-6 gap-4 bg-white p-4 rounded-lg border-b border-slate-600 pb-4 shadow-md">
            <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 border-b border-slate-100">
                <div>
                    <h2 className="text-2xl font-semibold">{title}</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Consulta las estadísticas por año.
                    </p>
                </div>
                <select 
                    name="year" 
                    value={selectedYear}
                    onChange={(e) => onYearChange(e.target.value)}
                    className="rounded-lg border border-slate-300 px-3 py-2"
                >
                    <option value={""} disabled>Selecciona un año</option>
                    { years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    )) }
                </select>
            </section>
            { selectedYear !== "" ? (
                <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h6 className="inline-flex items-center md:font-light font-bold text-slate-900 tracking-tight">
                        <Info className="mr-3" />
                        Estadísticas del año: {selectedYear}
                    </h6>
                    { total !== undefined && total > 0 ? (
                        <span className="flex items-center bg-slate-500 p-2 text-xs font-bold rounded-lg text-white">
                            <Logs className="w-4 h-4 mr-4" />
                            {total} eventos
                        </span>
                    ) : null}
                    { total !== undefined && total > 0 ? children : null}
                </section>
            ) : <span className="text-sm text-slate-500">Debes seleccionar el año para ver las estadísticas de asistencia por evento.</span>}
            
        </div>
    )
}
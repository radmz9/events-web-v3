import { StatsDetails } from "./StatsDetails"


export const StatsPage = () => {
    return(
        <div className="space-y-6 p-6">
            <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-md">
                <h1 className="font-bold text-2xl text-slate-600">Estadisticas generales de estudiantes</h1>
                <span
                    className="font-light text-sm"
                >
                    Vista general de estudiantes por calendario escolar.
                </span>
            </div>

            <StatsDetails />
        </div>
    )
}
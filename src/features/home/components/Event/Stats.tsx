import type { StatsAttendance } from "../../types/stats.types"

interface StatProps {
    stats: StatsAttendance | undefined
}

export const Stats = ({ stats }: StatProps ) => {
    return(
        <section>
            <div className="mb-2">
                <h2 className="text-lg font-bold text-slate-900">Control de Asistencia</h2>
                <p className="text-sm text-slate-500">Lista de Participantes</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="bg-sky-50/50 border border-sky-100 rounded-xl flex flex-col p-4 text-center justify-between">
                    <span className="text-2xl">👨🏻‍💻</span>
                    <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider">Alumnos</span>
                    <span className="text-sm font-bold text-sky-900">{stats?.alumnos}</span>
                </div>

                <div className="bg-indigo-50/50 border border-sky-100 rounded-xl flex flex-col p-4 text-center justify-between">
                    <span className="text-2xl">👨🏻‍🎓</span>
                    <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider">Egresados</span>
                    <span className="text-sm font-bold text-sky-900">{stats?.egresados}</span>
                </div>

                <div className="bg-sky-50/50 border border-sky-100 rounded-xl flex flex-col p-4 text-center justify-between">
                    <span className="text-2xl">👨🏻‍🏫</span>
                    <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider">Profesores</span>
                    <span className="text-sm font-bold text-sky-900">{stats?.profesores}</span>
                </div>

                <div className="bg-indigo-50/50 border border-sky-100 rounded-xl flex flex-col p-4 text-center justify-between">
                    <span className="text-2xl">👨🏻‍💼</span>
                    <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider">Administrativos</span>
                    <span className="text-sm font-bold text-sky-900">{stats?.administrativos}</span>
                </div>

                <div className="bg-sky-50/50 border border-sky-100 rounded-xl flex flex-col p-4 text-center justify-between">
                    <span className="text-2xl">🛗</span>
                    <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider">Externos</span>
                    <span className="text-sm font-bold text-sky-900">{stats?.externos}</span>
                </div>

                <div className="bg-indigo-50/50 border border-sky-100 rounded-xl flex flex-col p-4 text-center justify-between">
                    <span className="text-2xl">📶</span>
                    <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider">Total</span>
                    <span className="text-sm font-bold text-sky-900">{stats?.total}</span>
                </div>
            </div>
        </section>
    )
}
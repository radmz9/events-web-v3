import { useGetStudentsStatsQuery } from "../api/studentApi";

type CardProps = {
    title: string;
    total: number | string;
}

const CardInfo = ({ title, total }: CardProps) => {
    return(
        <div className="border border-slate-300 rounded-lg flex flex-col p-2 text-center justify-between">
            <span className="text-xs font-semibold text-slate-500">{title}</span>
            <span className="text-sm font-bold text-sky-500">{total}</span>
        </div>    
    )
}

export const StatsDetails = () => {
    const { data, isLoading, isError } = useGetStudentsStatsQuery();

    if(isLoading) return <p>Cargando datos....</p>

    if(isError || !data) return <p>Ocurrio un error al cargar los datos</p>

    const { stats, caledarDetails } = data;
    return( 
        <div>
            <div className="bg-white border border-slate-200 rounded-lg shadow-md p-6">
                <span className="text-sm font-light">
                    Datos generales.
                </span>
                <div className="grid grid-cols-3 lg:grid-cols-7 gap-3 mt-2">
                    <CardInfo title="Total" total={stats.total} />
                    
                    <CardInfo title="Alumnos" total={stats.alumnos} />

                    <CardInfo title="Egresados" total={stats.egresados} />

                    <CardInfo title="Inactivos" total={stats.inactivos} />

                    <CardInfo title="Hombres" total={stats.hombres} />

                    <CardInfo title="Mujeres" total={stats.mujeres} />

                    <CardInfo title="Indigenas" total={stats.indigenas} />
                </div>
            </div>

            <div className="bg-white border border-slate-200 shadow-md mt-6 p-6 rounded-lg">
                <span className="font-light text-sm">Detalles por calendario escolar.</span>
                <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-md mt-2">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-center text-sm">
                                Calendario
                            </th>
                            <th className="px-4 py-3 text-center text-sm">
                                Alumnos
                            </th>
                            <th className="px-4 py-3 text-center text-sm">
                                Egresados
                            </th>
                            <th className="px-4 py-3 text-center text-sm">
                                Inactivos
                            </th>
                            <th className="px-4 py-3 text-center text-sm">
                                Hombres
                            </th>
                            <th className="px-4 py-3 text-center text-sm">
                                Mujeres
                            </th>
                            <th className="px-4 py-3 text-center text-sm">
                                Indigenas
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                        { caledarDetails.length ? caledarDetails.map((c) => (
                            <tr key={c.calendario} className="hover:bg-sky-50 transition-colors group">
                                <td className="px-4 py-3 text-center text-xs text-slate-700">{c.calendario}</td>
                                <td className="px-4 py-3 text-center text-xs text-slate-700">{c.alumnos}</td>
                                <td className="px-4 py-3 text-center text-xs text-slate-700">{c.egresados}</td>
                                <td className="px-4 py-3 text-center text-xs text-slate-700">{c.inactivos}</td>
                                <td className="px-4 py-3 text-center text-xs text-slate-700">{c.hombres}</td>
                                <td className="px-4 py-3 text-center text-xs text-slate-700">{c.mujeres}</td>
                                <td className="px-4 py-3 text-center text-xs text-slate-700">{c.indigenas}</td>
                            </tr>
                        )) : null }
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}
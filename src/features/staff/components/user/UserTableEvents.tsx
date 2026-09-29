import { useParams } from "react-router-dom"
import { useGetStaffEventsQuery } from "../../../search/api/searchApi";
import { skipToken } from "@reduxjs/toolkit/query";
import dayjs from "dayjs";
import { GenerateFile } from "../../../students/components/student/GenerateFile";

export const UserTableEvents = () => {
    const { code } = useParams<{ code?: string}>();
    const { data, isLoading, isError } = useGetStaffEventsQuery(
        !code ? skipToken : code
    );

    if(isLoading){
        return(
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-600 border-t-transparent mx-auto">
                        {/* <p className="mt-4 text-slate-600 font-medium">Cargando histórico del usuario...</p> */}
                    </div>
                </div>
            </div>
        )
    }

    if(isError) return <p>Ocurrio un error al cargar la pagina</p>;

    if(!data) return null;

    const { total, totalHours, events } = data;

    return(
        <div className="mx-auto border border-slate-200 bg-white rounded-lg">
            <div className="flex justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">
                    Historial de Asistencias
                </h2>
                { total > 0 && <GenerateFile /> }
                {/* { total > 0 && <GenerateFile /> } */}
            </div>
            { total > 0 ? (
                <>
                    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 p-6">
                        <div className="bg-linear-to-br from-indigo-50 to-indigo-100/50 p-4 rounded-lg border border-indigo-100 text-center">
                            <p className="text-sm font-medium text-indigo-600">Eventos Asistidos</p>
                            <p className="text-3xl font-extrabold text-indigo-900 mt-1">{total}</p>
                        </div>
                        <div className="bg-linear-to-br from-emerald-50 to-indigo-100/50 p-4 rounded-lg border border-emerald-100 text-center">
                            <p className="text-sm font-medium text-emerald-600">Total de Horas</p>
                            <p className="text-3xl font-extrabold text-emerald-900 mt-1">{totalHours}</p>
                        </div>
                    </div>

                    <table className="w-full text-left text-slate-500 border border-slate-200 mb-4">
                        <thead className="bg-slate-50 text-center text-slate-600 tracking-wider">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Evento</th>
                                <th className="px-4 py-3 font-semibold">Lugar</th>
                                <th className="px-4 py-3 font-semibold">Fecha</th>
                                <th className="px-4 py-3 font-semibold">Duración</th>
                                <th className="px-4 py-3 font-semibold">Área</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                            { events.map((e) => (
                                <tr key={e.id} className="hover:bg-sky-50 transition-colors group">
                                    <td className="px-4 py-3 text-sm">
                                        <span className="font-semibold">{e.tipo}: </span>
                                        {e.nombre}
                                    </td>
                                    <td className="px-4 py-3 text-sm">{e.lugar}</td>
                                    <td className="px-4 py-3 text-sm">{dayjs(e.fecha).format('dddd M [de] MMMM [del] YYYY')}</td>
                                    <td className="px-4 py-3 text-sm text-center">{e.duracion} {e.duracion > 1 ? 'hrs' : 'hr'}</td>
                                    <td className="px-4 py-3 text-sm">{e.area}</td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </>
            ) : (
                <div className="p-6">
                    <span className="text-sm text-slate-500">
                        El usuario no tiene registro de asistencia a ningún envento.
                    </span>
                </div>
            )}
        </div>
    )
}
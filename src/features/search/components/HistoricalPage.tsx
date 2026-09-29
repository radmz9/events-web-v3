import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { searchApi } from "../api/searchApi";
import { useEffect } from "react";
import { EventHistory } from "./EventHistory";

export const HistoricalPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const code = location.state?.code;
    const selectUser = searchApi.endpoints.searchUserEvents.select(code);
    const { data: user, isLoading, isError } = useAppSelector(selectUser);
    
    useEffect(() => {
        if(!location.state?.fromForm || isError){
            navigate('/search', { replace: true })
        }
    }, [location, navigate, isError]);

    if(isLoading){
        return(
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-600 border-t-transparent mx-auto">
                        <p className="mt-4 text-slate-600 font-medium">Cargando histórico del usuario...</p>
                    </div>
                </div>
            </div>
        )
    }

    if(!user) return null;

    const { eventsSummary } = user;

    return(
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* User Info */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-4">
                        <div>
                            <span className="inline-flex items-center rounded-md bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700 mb-2">
                                {user.rol}
                            </span>
                            <h1 className="text-2xl font-bold text-slate-900">{user.nombre}</h1>
                            <p className="text-sm text-slate-500 mt-1">Código: <span className="font-mono font-semibold">{user.codigo}</span></p>
                        </div>
                        <div className="mt-4 md:mt-0 text-left md:text-right">
                            <p className="text-sm font-medium uppercase text-slate-700">Área: <span className="text-slate-600 font-normal">{user.area}</span></p>
                            {/* Responsalbe info */}
                            <p className="text-xs text-slate-500 mt-1">
                                <span className="uppercase">{user.rolAreaResponsable}</span>: {user.areaResponsable}
                            </p>
                        </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        <div className="bg-linear-to-br from-indigo-50 to-indigo-100/50 p-4 rounded-lg border border-indigo-100 text-center">
                            <p className="text-sm font-medium text-indigo-600">Eventos Asistidos</p>
                            <p className="text-3xl font-extrabold text-indigo-900 mt-1">{eventsSummary.total}</p>
                        </div>
                        <div className="bg-linear-to-br from-emerald-50 to-indigo-100/50 p-4 rounded-lg border border-emerald-100 text-center">
                            <p className="text-sm font-medium text-emerald-600">Total de Horas</p>
                            <p className="text-3xl font-extrabold text-emerald-900 mt-1">{eventsSummary.totalHours}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/search')}
                        className="bg-sky-600 rounded-2xl p-2 mt-2 text-white hover:cursor-pointer hover:bg-sky-900"
                    >
                        Regresar
                    </button>
                </div>

                {/* Events */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                        <h2 className="text-lg font-bold text-slate-900">Historial de Asistencias</h2>
                    </div>
                    <EventHistory code={code} />
                </div>
            </div>
        </div>        
    )
}
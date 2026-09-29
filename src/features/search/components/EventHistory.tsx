import { Briefcase, Clock, MapPin, Tag } from "lucide-react";
import { useAppSelector } from "../../../app/hooks";
import { searchApi } from "../api/searchApi";
import { getBadgeStyle } from "../utils/getBadgeStyle";
import dayjs from "dayjs";

interface EventHistoryProp {
    code: string;
}

export const EventHistory = ({ code }: EventHistoryProp) => {
    const selectUser = searchApi.endpoints.searchUserEvents.select(code);
    const { data: user, isLoading} = useAppSelector(selectUser);

    if(isLoading){
        <div className="flex h-screen items-center justify-center bg-slate-50">
            <div className="text-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-600 border-t-transparent mx-auto">
                    <p className="mt-4 text-slate-600 font-medium">Cargando Eventos</p>
                </div>
            </div>
        </div>
    }

    if(!user) return null;

    const { eventsSummary } = user;

    return(
        <div className="max-w-2xl mx-auto p-4">
            <div className="relative border-l-2 border-slate-200 ml-4 md:ml-32 space-y-8">
                { eventsSummary.events.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">
                        Este usuario no registra asitencia a ningún evento todavía.
                    </div>
                ) : eventsSummary.events.map((event) => {
                    const badgeStyle = getBadgeStyle(event.tipo);
                    return (
                        <div key={event.id} className="relative pl-6 md:pl-8">
                            <div className="hidden md:block absolute -left-36 top-1.5 w-28 text-right">
                                <span className="text-sm font-semibold text-slate-700">{dayjs(new Date(event.fecha)).format('DD [de] MMMM, YYYY')}</span>
                            </div>

                            <span className="absoulte -left-2.25 top-2.5 bg-white rounded-full p-0.5 border-2 border-indigo-600 shadow-sm">
                                <div className="h-2 w-2 rounded-full bg-indigo-600" />
                            </span>

                            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all duration-200">

                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}>
                                        <Tag className="w-3 h-3" />
                                        {event.tipo}
                                    </span>
                                    <span className="text-xs text-slate-400 font-medium md:hidden">
                                        {dayjs(new Date(event.fecha)).format('DD [de] MMMM, YYYY')}
                                    </span>
                                </div>

                                <h3 className="text-base font-bold text-slate-800 leading-snug">
                                    {event.nombre}
                                </h3>

                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                                        <span className="truncate">{event.lugar}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                                        <span className="truncate">{event.area}</span>
                                    </div>

                                    <div className="flex items-center gap-2 sm:col-span-2">
                                        <Clock className="w-4 h-4 text-slate-400 shrink-0" /> 
                                        <span>{event.duracion} horas de duración</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) }
            </div>
        </div>
    )    
}
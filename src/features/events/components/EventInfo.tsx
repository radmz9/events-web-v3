import { useParams } from "react-router-dom"
import { useGetEventDetailsQuery } from "../api/eventApi"
import { Briefcase, Calendar, Clock, MapPin, School, Tag } from "lucide-react";
import dayjs from "dayjs";
import { ErrorState, LoadingState } from "../../../common/components/feedback";
import { GoBackButton } from "../../../common/ui/GoBackButton";

interface RouteParams {
    eventId: string;
}

export const EventInfo = () => {
    const { eventId } = useParams<keyof RouteParams>() as RouteParams;
    const { data: event, isLoading, isError } = useGetEventDetailsQuery(eventId);

    if(isLoading) return <LoadingState />
    if(isError || !event) return <ErrorState />
    return(
        <section
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
            <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-md font-medium bg-emerald-50 text-emerald-700 mb-2">
                    <School className="w-3 h-3 mr-2" />
                    {event.area}
                </span>
                <br />
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-50 text-sky-700 mb-2">
                    <Tag className="w-3 h-3 mr-2" />
                    {event.tipo}
                </span>
                <h1 className="text-2xl md:font-light md:text-2xl font-bold text-slate-900 tracking-tight">
                    {event.nombre}
                </h1>
                <span className="inline-flex px-2.5 py-0.5 items-center rounded-full text-xs bg-sky-50 text-sky-700 mt-2">
                    <Briefcase className="w-3 h-3 mr-2" />
                    {event.encargado} : {event.responsable}
                </span>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto text-sm text-slate-600 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 mr-2"><Calendar /></span> { dayjs(event.fecha).format('DD [de] MMMM, YYYY') }
                </div>
                <div className="flex items-center grap-2">
                    <span className="font-semibold text-slate-900 mr-3"><Clock /> </span> {event.hora} hrs.
                </div>
                <div className="flex items-center grap-2">
                    <span className="font-semibold text-slate-900 mr-3"><MapPin /> </span> {event.lugar}
                </div>
                    
                <GoBackButton />
                    
            </div>
        </section>
    )
}
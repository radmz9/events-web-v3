import { Briefcase, Calendar, Clock, MapPin, Tag } from "lucide-react";
import { useGetPublicInfoEventQuery } from "../../api/activeEventApi";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { GoBackButton } from "../../../../common/ui/GoBackButton";

export const Details = () => {
    const navigate = useNavigate();
    const { data: event, isLoading, isError } = useGetPublicInfoEventQuery();

    if(isLoading) return <p>Cargando....</p>

    if(isError) return <p className="text-2xl text-red-500">Ocurrio un error al cargar el contenido</p>

    if(!event) return null;

    const date = new Date(event.fecha)

    const exit = () => {
        navigate('/');
        sessionStorage.removeItem('event_token');
    }

    return(
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-50 text-sky-700 mb-2">
                    <Tag className="w-3 h-3 mr-2" />
                    {event.tipo}
                </span>
                <h1 className="text-2xl md:font-light md:text-2xl font-bold text-slate-900 tracking-tight">{ event.nombre}</h1>
                <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs bg-sky-50 text-sky-700 mt-2">
                    <Briefcase className="w-3 h-4 mr-2" />
                    {event?.encargado} : {event.responsable}
                </span>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto text-sm text-slate-600 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center grap-2">
                    <span className="font-semibold text-slate-900 mr-3"><Calendar /></span> { dayjs(date).format('DD [de] MMMM, YYYY')}
                </div>
                <div className="flex items-center grap-2">
                    <span className="font-semibold text-slate-900 mr-3"><Clock /> </span> {event.hora} hrs.
                </div>
                <div className="flex items-center grap-2">
                    <span className="font-semibold text-slate-900 mr-3"><MapPin /> </span> {event.lugar}
                </div>
                
                <GoBackButton title="Salir" fn={exit} />
                {/* <button 
                    onClick={exit}
                    className="bg-white p-2 text-xs text-sky-600 font-semibold rounded-2xl border border-sky-600 mt-2 hover:cursor-pointer hover:bg-slate-200"
                >
                    Salir
                </button> */}
            </div>
        </section>
    )
}
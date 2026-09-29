import { Stats } from "./Stats";
import { InternalList } from "./InternalList";
import { ExternalList } from "./ExternalList";
import { useGetEventAttendaceQuery } from "../../api/attendanceApi";

export const Attendance = () => {
    const { data: attendance, isLoading, isError } = useGetEventAttendaceQuery();

    if(isLoading) return <p>Cargando....</p>
    if(isError) return <p className="text-2xl text-red-500">Ocurrio un error al cargar el contenido</p>

    return(
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-8">
            <Stats stats={attendance?.stats}/>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <InternalList internals={attendance?.internals} />
                <ExternalList externals={attendance?.externals} />
            </div>                    
        </section>
    )
}
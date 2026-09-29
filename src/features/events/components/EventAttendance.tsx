import { useParams } from "react-router-dom";
import { useGetAttendanceQuery } from "../../home/api/attendanceApi"
import { Stats } from "../../home/components/Event/Stats";
import { InternalList } from "../../home/components/Event/InternalList";
import { ExternalList } from "../../home/components/Event/ExternalList";
import { Actions } from "./Actions";
import { ErrorState, LoadingState } from "../../../common/components/feedback";

interface RouteParams {
    eventId: string;
}

export const EventAttendance = () => {
    const { eventId } = useParams<keyof RouteParams>() as RouteParams;
    const { data: attendance, isLoading, isError } = useGetAttendanceQuery(eventId);

    if(isLoading) return <LoadingState />
    if(isError || !attendance) return <ErrorState /> 
    
    return(
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-8">
            <Stats stats={attendance.stats} />
            { attendance.stats.total > 0 && ( <Actions /> ) }
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <InternalList internals={attendance.internals} />
                <ExternalList externals={attendance.externals} />
            </div>
        </section>
    )
}
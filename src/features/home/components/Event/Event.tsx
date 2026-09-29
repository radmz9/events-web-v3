import { Navigate } from "react-router-dom";
import { Attendance } from "./Attendance";
import { Details } from "./Details";
import { Forms } from "./Forms";
import { getEventToken } from "../../helpers/event_token.helper";

export const Event = () => {
    const token = getEventToken();

    if(!token){
        return <Navigate to={'/'} replace />
    }

    return(
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <Details />
                <Forms />
                <Attendance />
            </div>
        </div>
    )
}

import { useParams } from "react-router-dom"
import { useSearchStaffQuery } from "../../../search/api/searchApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { GoBackButton } from "../../../../common/ui/GoBackButton";
import { ErrorState, LoadingState } from "../../../../common/components/feedback";

export const UserPage = () => {
    const { code } = useParams<{ code?: string }>();
    const { data: user, isLoading, isError } = useSearchStaffQuery(
        !code ? skipToken : code
    );

    if(isLoading) return <LoadingState />

    if(isError) return <ErrorState />

    if(!user) return null;

    return(
        <div className="bg-slate-50 py-8">
            <div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-4">
                        <div>
                            <span className="inline-flex items-center rounded-md bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700 mb-2">
                                {user?.area}
                            </span>
                            <h1 className="text-2xl font-bold text-slate-900">{user?.nombre}</h1>
                            <p className="text-sm text-slate-500 mt-1">Código: {user?.codigo}</p>
                        </div>
                        <div className="mt-4 md:mt-0 text-left md:text-right">
                            <GoBackButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
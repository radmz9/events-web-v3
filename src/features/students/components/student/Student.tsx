import { useParams } from "react-router-dom"
import { useSearchStudentQuery } from "../../../search/api/searchApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { ErrorState, LoadingState } from "../../../../common/components/feedback";
import { GoBackButton } from "../../../../common/ui/GoBackButton";

export const Student = () => {
    const { code } = useParams<{ code?: string }>();
    const { data: user, isLoading, isError } = useSearchStudentQuery(
        !code ? skipToken : code
    );

    if(isLoading) return <LoadingState />

    if(isError) return <ErrorState /> 

    if(!user) return null;

    return(
        <div className="bg-slate-50 py-8">
            <div className="">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-4 mb-2">
                        <div>
                            <span className="inline-flex items-center rounded-md bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700 mb-2">
                                {user.rol}
                            </span>
                            <h1 className="text-2xl font-bold text-slate-900">{user.nombre}</h1>
                            <p className="text-sm text-slate-500 mt-1">Código: {user.codigo}</p>
                        </div>
                        <div className="mt-4 md:mt-0 text-left md:text-right">
                            <p className="text-sm font-light text-slate-700">
                                {user.area}
                            </p>
                            <p className="text-sm font-light text-slate-500">
                                Ingreso: {user.calendario}
                            </p>
                            <p className="text-sm font-light text-slate-400">
                                Sede: {user.sede}
                            </p>
                            <p className="text-sm font-light text-slate-400">
                                Etnia: {user.etnia}
                            </p>
                        </div>
                    </div>
                    <GoBackButton />
                </div>
            </div>
        </div> 
    )   
}
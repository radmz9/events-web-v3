import { Briefcase, MapPin, ShieldCheck } from "lucide-react";
import { InfoCard } from "./InfoCard";
import { useGetProfileQuery } from "../api/profileApi";
import { useAppDispatch } from "../../../app/hooks";
import { openModal } from "../../modals/services/modalSlice";
import { QueryState } from "../../../common/components/layout/QueryState";
import { DownloadAction } from "../../backup/components/DownloadAction";

export const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const { data: profile, isLoading, isError } = useGetProfileQuery();

    if(!profile) return null;
    return(
        <QueryState
            isLoading={isLoading}
            isError={isError}
        >
            <div className="min-h-screen bg-slate-50 text-slate-800 antialiased">
                <div className="h-48 w-full rounded-2xl bg-linear-to-r from-emeral-500 via-teal-500 to-sky-500 border-slate-100 p-6 sm:p-6" />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-12">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-6 border-b border-slate-100">
                            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
                                {/* Avatar */}
                                <div className="w-28 h-28 rounded-2xl bg-sky-600 text-white flex items-center justify-center text-3xl font-bold border-4 border-white shadow-md ring-1 ring-slate-200/50">
                                    {profile.username.charAt(0)}
                                </div>

                                <div className="mb-2">
                                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">@{profile.user}</h1>
                                    <p className="text-slate-500 font-medium">{profile.username}</p>
                                </div>

                                {/* <button 
                                    onClick={() => dispatch(openModal({ type: 'UPDATE_PASSWORD', title: 'Cambiar contrasena', data: { foo: 'password' } }))}
                                    className="w-full sm:w-auto px-4 py-2 bg-slate-500 hover:bg-slate-900 text-white font-medium rounded-xl text-sm transition-colors shadow-sm hover:cursor-pointer"
                                >
                                    Cambiar contraseña
                                </button> */}
                            </div>

                            {/* Info */}
                            <div className="mt-8">
                                <h2 className="text-lg font-bold mb-4 tracking-tight text-slate-900">
                                    SIGAAE v3.0
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InfoCard
                                        icon={<Briefcase className="w-5 h-5 text-sky-500" />}
                                        label="Rol" 
                                        value={profile.role}
                                        badge
                                    />

                                    <InfoCard 
                                        icon={<MapPin className="w-5 h-5 text-emerald-500" />}
                                        label="Área"
                                        value={profile.areaName}
                                        badge
                                    />

                                    <InfoCard 
                                        icon={<ShieldCheck className="w-5 h-5 text-indigo-500" />}
                                        label="Tipo de Área"
                                        value={profile.areaType}
                                        badge
                                    />

                                    <button 
                                        onClick={() => dispatch(openModal({ type: 'UPDATE_PASSWORD', title: 'Cambiar contraseña', data: { foo: 'password' } }))}
                                        className="w-full sm:w-auto px-4 py-2 bg-slate-900 text-white hover:bg-slate-500 font-light uppercase rounded-xl text-sm transition-colors shadow-sm hover:cursor-pointer"
                                    >
                                        Cambiar contraseña
                                    </button>

                                    <DownloadAction />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </QueryState>
    )
}
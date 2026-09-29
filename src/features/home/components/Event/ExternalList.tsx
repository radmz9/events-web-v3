import { Delete } from "lucide-react";
import type { ExternalTypes } from "../../types/externals.types";
import dayjs from "dayjs";
import { useDeleteResourse } from "../../../../shared/utils/useDeleteResourse";
import { useDeleteExternalMutation } from '../../api/attendanceApi';
import { useAppSelector } from "../../../../app/hooks";

interface ExternalProps {
    externals: ExternalTypes[] | undefined
}

export const ExternalList = ({ externals }: ExternalProps) => {
    const { isAuth } = useAppSelector(state => state.auth);
    const { executeDelete } = useDeleteResourse();
    const [deleteExternal] = useDeleteExternalMutation();
    if(externals === undefined) return <p>Ocurrio un error</p>
    return(
        <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                    Público Externo
                </h3>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                    { externals?.length }
                </span>
            </div>
            {/* Tabla */}
            <div className="max-h-80 overflow-y-auto pr-2 space-y-2 scrollbar-thin">
                { externals.length 
                    ? externals.map((external) => (
                        <div key={external.id} className="flex items-center justify-between p-3 bg-slate-50 hover:bg-purple-50/50 rounded-xl border border-slate-100 transition-all group">
                            <div className="flex gap-0.5 min-w-0">
                                <div className="w-9 h-9 mr-4 rounded-full bg-white flex items-center justify-center text-2xl shrink-0 shadow-sm border border-sky-200">
                                    { external.genero === 'H' ? '🧔🏻‍♂️' : '👩🏻' }
                                </div>

                                <div className="flex flex-col min-w-0 mr-4">
                                    <span className="font-extralight text-sm text-slate-900 group-hover:text-sky-900 transition-colors">
                                        { external.nombre }
                                    </span>
                                    <span className="text-xs text-slate-500 font-light max-w-37.5 truncate">
                                        { external.dependencia }
                                    </span>
                                    <span className="text-xs lg:hidden md:hidden bg-white border border-slate-200 px-2 py-1 rounded-lg text-slate-500 font-mono shadow-sm">
                                        {dayjs(external.createdAt).fromNow()}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-xs hidden sm:inline bg-white border border-slate-200 px-2 py-1 rounded-lg text-slate-500 font-mono shadow-sm">
                                        {dayjs(external.createdAt).fromNow()}
                                    </span>
                                    { isAuth && (
                                        <button 
                                            onClick={() => executeDelete(external.nombre, external.id, deleteExternal)}
                                            className="p-1.5 text-red-900 sm:items-end hover:text-red-600 hover:bg-red-50 hover:cursor-pointer rounded-lg transition-all"
                                        >
                                            <Delete />
                                        </button>
                                    ) }
                                </div>
                            </div>
                        </div>
                    ))  
                    : <p className="text-sm text-center text-slate-400 italic py-8">Aun no hay registros</p>
                }
            </div>
        </div>
    )
}
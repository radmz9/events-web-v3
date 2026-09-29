import { Delete } from "lucide-react"
import type { InternalTypes } from "../../types/internals.types"
import dayjs from "dayjs"
import { useDeleteResourse } from "../../../../shared/utils/useDeleteResourse"
import { useDeleteInternalMutation } from "../../api/attendanceApi"
import { useAppSelector } from "../../../../app/hooks"

interface InternalProp {
    internals: InternalTypes[] | [] | undefined
}

export const InternalList = ({ internals }: InternalProp) => {
    const { isAuth } = useAppSelector(state => state.auth);
    const { executeDelete } = useDeleteResourse();
    const [deleteInternal] = useDeleteInternalMutation();
    if(internals === undefined) return <p>Ocurrio un error</p>
    const types = ['','👨🏻‍💻','👨🏻‍🎓','','👨🏻‍🏫','👨🏻‍💼']
    return(
        <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                    Comunidad Universitaria
                </h3>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                    {internals.length}
                </span>
            </div>
            {/* Tabla */}
            <div className="max-h-80 overflow-y-auto pr-2 space-y-2 scrollbar-thin">
                { internals.length 
                    ? internals.map((internal) => (
                        <div key={internal.id} className="flex items-center justify-between p-3 bg-slate-50 hover:bg-purple-50/50 rounded-xl border border-slate-100 transition-all group">
                            <div className="flex gap-0.5 min-w-0">
                                <div className="w-9 h-9 mr-4 rounded-full bg-white flex items-center justify-center text-2xl shrink-0 shadow-sm border border-sky-200">
                                    {types[internal.idRol]}
                                </div>

                                <div className="flex flex-col min-w-0 mr-4">
                                    <span className="font-extralight text-sm text-slate-900 group-hover:text-sky-900 transition-colors">
                                        {internal.codigo}
                                    </span>

                                    <span className="text-xs text-slate-500 font-light">
                                        {internal.nombre}
                                    </span>

                                    <span className="text-xs lg:hidden md:hidden font-mono mr-4 bg-white border border-slate-200 px-2 py-1 rounded-lg text-slate-500 shadow-sm">
                                        {dayjs(internal.createdAt).fromNow()}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    <span className="text-xs hidden sm:inline-block font-mono mr-4 bg-white border border-slate-200 px-2 py-1 rounded-lg text-slate-500 shadow-sm">
                                        {dayjs(internal.createdAt).fromNow()}
                                    </span>
                                    { isAuth && (
                                        <button 
                                            onClick={() => executeDelete(internal.nombre, internal.id, deleteInternal)}
                                            title="Eliminar asistencia" className="p-1.5 text-red-900 hover:text-red-600 hover:bg-red-50 hover:cursor-pointer rounded-lg transition-all"
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
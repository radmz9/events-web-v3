import { toast } from "sonner";
import { showApiError } from "./handle-toast-error";

type DeleteMutation<T = unknown> = (id: number) => { unwrap: () => Promise<T> };

export const useDeleteResourse = () => {
    const executeDelete = async <T, > (
        name: string,
        id: number,
        deleteFn: DeleteMutation<T>
    ) => {
        toast.custom((t) => (
            <>
                <div className="bg-white border border-zinc-200 p-4 rounded-xl shadow-xl flex flex-col gap-3 w-96">
                    <div>
                        <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-300">Confirmar eliminación</h3>
                        <p className="text-xs text-zinc-500 mt-2 mb-2">
                            ¿Estás seguro de eliminar el registro: <strong>{name}</strong>?
                        </p>
                    </div>
                    <div className="flex justify-end gap-2 border-t border-zinc-300 p-2">
                        <button 
                            onClick={() => toast.dismiss(t)}
                            className="px-3 py-1.5 text-xs text-zinc-600 bg-zinc-100 hover:bg-zinc-400 hover:text-white rounded-lg hover:cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={async () => {
                                toast.dismiss(t);
                                
                                const loadingId = toast.loading(`Eliminando ${name}...`);
                                
                                try {
                                    await deleteFn(id).unwrap();
                                    toast.success(`${name} eliminado correctamente`, { id: loadingId });
                                } catch (error) {
                                    toast.dismiss(loadingId);
                                    showApiError(error);
                                }
                            }}
                            className="px-3 py-1.5 text-xs bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm hover:cursor-pointer"
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </>
        ), { duration: Infinity })
    }
    return { executeDelete }
}

import { toast } from "sonner";

export const useConfirm = () => {
    const confirmDelete = (name: string, onConfirm: () => void) => {
        toast.custom((t) => (
            <div className="bg-white border border-zinc-200 p-4 rounded-xl shadow-lg flex flex-col gap-3 w-87.5">
                <div>
                    <h3 className="text-sm font-bold text-zinc-900">
                        Confirmar eliminación
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                        ¿Estás seguro de que deseas eliminar <strong>{name}</strong>?
                    </p>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => toast.dismiss(t)}
                        className="px-3 py-1.5 text-xs font-medium text-zinc-600 bg-zinc-100 hover:bg-zinc-400 hover:text-white hover:cursor-pointer rounded-lg transition-all"
                    >
                        Cancelar
                    </button>

                    <button 
                        onClick={() => {
                            toast.dismiss(t);
                            onConfirm();
                        }}
                        className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-100 hover:bg-red-400 hover:text-white hover:cursor-pointer rounded-lg transition-all"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        ), { duration: Infinity })
    };
    return { confirmDelete }
}
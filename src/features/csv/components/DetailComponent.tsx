import { ChevronDown, Info } from "lucide-react"
import type { HeaderTypes } from "../types/headers.types";

interface DetailProps {
    id: string;
    title: string;
    headers: HeaderTypes[];
    example: string;
}

export const DetailComponent = ({ id, title, headers, example }: DetailProps) => {
    return(
        <details className="group border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden transition-all duration-300 open:shadow-md">
            <summary className="flex items-center justify-between p-4 bg-slate-50 cursor-pointer select-none hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 font-semibold text-indigo-600 text-sm">
                        {id}
                    </span>
                    <div>
                        <h4 className="font-semibold text-slate-900">Importación de: {title}</h4>
                        <p className="text-xs text-slate-500">Para dar de alta.</p>
                    </div>
                </div>
                <ChevronDown className="w-5 h-5 text-slate-400 transition-transform duration-300 group-open:-rotate-180" />
            </summary>

            <div className="p-4 border-t border-slate-100 bg-white">
                <div className="overflow-x-auto rounded-lg border border-slate-100">
                    <table className="min-w-full divide-y divide-slate-200 text-sm text-left">
                        <thead className="bg-slate-50 text-xs font-semibold text-slate-600 tracking-wider">
                            <tr>
                                <th className="px-4 py-3">Columna (Header)</th>
                                <th className="px-4 py-3">Tipo de dato</th>
                                <th className="px-4 py-3">Reglas / Validaciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide- divide-slate-100 text-slate-700">
                            { headers.map((h, i) => (
                                <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                                    <td className="px-4 py-3 font-mono font-medium text-indigo-600">{h.header}</td>
                                    <td className="px-4 p-3 text-slate-500">{h.type}</td>
                                    <td className="px-4 py-3 text-xs text-slate-600 whitespace-pre">
                                        {h.rules}
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200/60">
                    <Info className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Ejemplo de linea CSV:</span>
                    <code className="text-xs font-mono text-slate-700 block overflow-x-auto whitespace-nowrap">
                        {example}
                    </code>
                </div>
            </div>
        </details>  
    )
}
import { Info } from "lucide-react"

type Props = {
    year?: string;
}

export const Description = ({ year }: Props) => {
    return(
        <section className="bg-white rounded-2xl shadow-sm border-slate-100 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex">
                <h4 className="inline-flex items-center text-2xl md:font-light md:text-2xl font-bold text-slate-900 tracking-tight">
                    <Info className="mr-3 text-sky-700" />
                    Estadísticas del año: {year}
                </h4>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto text-sm text-slate-600 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 mr-3 border-b border-slate-100">Encabezados</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-light">H = Hombres</span>
                    <span className="font-light">M = Mujeres</span>
                    <span className="font-light">I = Indigenas</span>
                    <span className="font-light">T = Total</span>
                </div>
            </div>
        </section>
    )
}
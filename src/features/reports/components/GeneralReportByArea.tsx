import { ErrorState, LoadingState } from "../../../common/components/feedback";
import { useGeneralReportByAreaQuery } from "../api/reportsApi"

export const GeneralReportByArea = () => {
    const { data, isLoading, isError } = useGeneralReportByAreaQuery();

    if(isLoading) return <LoadingState />

    if(isError && !data) return <ErrorState />
    return(
        <div className="space-y p-6">
            <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-lg">
                <h1
                    className="text-2xl font-bold text-slate-700"
                >
                    Histórico de asistencia a eventos por año.
                </h1>
                <span className="text-sm font-light">
                    Solo aparecerán los eventos que cuentan con almenos una asistencia registrada.
                </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white mt-6">
                
                <table className="min-w-full table-fixed divide-y divide-sky-200">
                    <thead className="bg-white">
                        <tr className="bg-slate-50">
                            <th>Año</th>
                            { data?.types.map((item, i) => (
                                <th
                                    className="px-3 text-center text-xs text-slate-700 font-semibold border border-slate-200" key={i}
                                    style={{ writingMode: 'sideways-rl', transform: 'rotate(180dg)' }}
                                >
                                    { item.nombre }
                                </th>
                            )) }
                            <th className="px-4 py-3 text-center text-sm text-slate-700 font-semibold">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        { data?.stats.map((item, i) => (
                            <tr className="transition-colors hover:bg-slate-50" key={i}>
                                <td className="py-4 px-3 font-bold hover:cursor-pointer bg-slate-50 text-center">
                                    { item.year }
                                </td>
                                { item.eventos.map((element, j) => (
                                    <td className={`px-4 py-3 text-center ${element.total === 0 ? 'bg-red-100' : ''}`} key={j}>
                                        {element.total}
                                    </td>
                                )) }
                                <td className="py-4 px-3 font-bold bg-slate-50 text-center">{item.total}</td>
                            </tr>
                        )) }
                    </tbody>
                    <tfoot className="bg-slate-50 hover:bg-slate-100">
                        <tr>
                            <th>Total</th>
                            { data?.types.map((item, i) => (
                                <th className={`px-4 py-3 text-center text-sm text-slate-700 border border-slate-200 ${item.total === 0 ? 'bg-red-100' : ''}`} key={i}>
                                    {item.total}
                                </th>
                            )) }
                            <th className="px-4 py-3 text-center font-bold">{data?.total}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}
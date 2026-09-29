export const TableEmptyState = () => {
    return(
        <div className="flex flex-col items-center justify-center p-12 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 text-slate-500 transition-all">
            <svg className="w-12 h-12 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-lg font-medium text-slate-600">No se econtraron registros.</p>
            {/* <p className="text-sm text-slate-400">Prueba a crear un nuevo registro para ver contenido aquí.</p> */}
        </div>
    )
}
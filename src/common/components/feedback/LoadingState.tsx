type LoadingStateProps = {
    message?: string;
}

export const LoadingState = ({
    message = 'Cargando información....'
}: LoadingStateProps) => {
    return(
        <div className="flex flex-col items-center justify-center gap-3 p-8">
            {/* <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" /> */}
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-600 border-t-transparent mx-auto" />

            <span className="text-sm text-slate-500">
                {message}
            </span>
        </div>
    )
}
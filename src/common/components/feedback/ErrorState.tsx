type ErrorStateProps = {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

export const ErrorState = ({
    title = "Ocurrió un error",
    message = " No fue posible cargar la página.",
    onRetry
}: ErrorStateProps) => {
    return(
        <div className="flex flex-col items-center gap-3 p-8 text-center">
            <span className="text-lg font-semibold text-red-600">
                {title}
            </span>

            <p className="text-sm text-slate-500">
                {message}
            </p>

            { onRetry && (
                <button 
                    onClick={onRetry}
                    className="rounded-md bg-blue-600 px-4 py-2 text-white cursor-pointer"
                > 
                    Reintentar
                </button>
            ) }
        </div>
    )
}
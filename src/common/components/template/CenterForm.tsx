interface CenterFormProps {
    icon: React.ReactNode;
    title: string;
    subTitle: string;
    text: string;
    children: React.ReactNode;
}

export const CenterForm = ({ icon, title, subTitle, text, children }: CenterFormProps) => {
    return(
        <div className="min-h-1 w-full flex flex-col items-center justify-center bg-slate-50">
            <div className="mb-8 flex flex-col items-center">
                <div className="p-3 text-white bg-sky-600 rounded-2xl shadow-lg shadow-blue-200 mb-4">
                    {icon}
                </div>
                <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                <p className="mt-2 text-sm text-gray-600">{subTitle}</p>
            </div>
            {children}
            <p className="mt-8 text-sm text-slate-500">
                {text}
            </p>
        </div>
    )
}
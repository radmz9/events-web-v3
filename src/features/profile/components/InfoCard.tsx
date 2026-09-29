interface InfoCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    badge?: boolean;
}

export const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value, badge }) => {
    return (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-all">
            <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                {icon}
            </div>
            <div className="space-y-1 items-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {label}
                </span>
                <div>
                    { badge ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/50 ">
                            {value}
                        </span>
                    ) : (
                        <p className="text-xs sm:text-base font-extralight text-slate-700">
                            {value}
                        </p>
                    ) }
                </div>
            </div>
        </div>
    )
}
import { ListFilter, Search, University, UserPlus } from "lucide-react";

export type TabType = 'search' | 'filter';

interface Props {
    activeTab: string;
    setActiveTab: (tab: TabType) => void;
    action: () => void;
    children: React.ReactNode;
}

export const TabOptions = ({ children, setActiveTab, activeTab, action }: Props) => {
    return(
        <div className="">
            <div className="max-w-md mx-auto">
                <div className="mb-4 flex flex-col items-center">
                    <div className="p-3 text-white bg-sky-600 rounded-2xl shadow-lg shadow-blue-200 mb-2">
                        <University />
                    </div>

                    <h2 className="flex items-center gap-4 text-xl font-bold text-slate-900">
                        Estudiantes

                        <button
                            className="bg-sky-400 text-white p-2 rounded-full cursor-pointer hover:bg-emerald-700"
                            onClick={action}
                        >
                            <UserPlus />
                        </button>
                    </h2>

                </div>


                <p className="text-sm text-slate-500 text-center mb-6">
                    Selecciona el tipo de acción que deseas realizar.
                </p>

                <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl mb-6">
                    <button 
                        className={`flex items-center ml-10 gap-2 py-2 text-center font-medium borer-b-2 transition-colors cursor-pointer ${
                            activeTab === 'search' 
                            ? 'border-sky-600 text-sky-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 hover:cursor-pointer'
                        }`}
                        onClick={() => setActiveTab('search')}
                    >
                        <Search className="w-4 h-4" />
                        Buscar
                    </button>

                    <button 
                        className={`flex items-center ml-10 gap-2 py-2 text-center font-medium borer-b-2 transition-colors cursor-pointer ${
                            activeTab === 'filter' 
                            ? 'border-sky-600 text-sky-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 hover:cursor-pointer'
                        }`}
                        onClick={() => setActiveTab('filter')}
                    >
                        <ListFilter className="w-4 h-4" />
                        Filtros
                    </button> 
                </div>

                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}
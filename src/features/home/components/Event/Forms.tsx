import { useState } from "react";
import { InternalsForm } from "./InternalForm";
import { ExternalForm } from "./ExternalForm";

type TabType = 'community' | 'outsiders';

export const Forms = () => {
    const [activeTab, setActiveTab] = useState<TabType>('community');
    return(
        <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8">
            <div className="max-w-md mx-auto">
                <h2 className="text-xl font-bold text-slate-900 text-center mb-2">Formulario de Registro</h2>
                <p className="text-sm text-slate-500 text-center mb-6">Selecciona tu tipo de perfil para registrarte</p>

                <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl mb-6">
                    <button
                        className={`flex-1 py-2 text-center font-medium border-b-2 transition-colors ${
                            activeTab === 'community'
                            ? 'boder-sky-600 text-sky-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 hover:cursor-pointer'
                        }`}
                        onClick={() => setActiveTab('community')}
                    >
                        Comunidad Universitaria
                    </button>
                    <button
                        className={`flex-1 py-2 text-center font-medium border-b-2 transition-colors ${
                            activeTab === 'outsiders'
                            ? 'boder-sky-600 text-sky-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 hover:cursor-pointer'
                        }`}
                        onClick={() => setActiveTab('outsiders')}
                    >
                        Externos
                    </button>
                </div>

                <div className="bg-white py-2">
                    { activeTab === 'community' ? <InternalsForm /> : <ExternalForm /> }
                </div>
            </div>
        </section>
    )
}
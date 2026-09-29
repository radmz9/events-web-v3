import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const MainLayout = () => {
    return (
        <div className="flex min-h-screen bg-slate-50 text-slate-900">
            <div className="flex flex-col flex-1 min-w-0">
                <Navbar />
                
                <main className="flex-1 overflow-y-auto">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <section className="min-h-full">
                            <Outlet />
                        </section>
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-6 text-center text-sm text-slate-500 border-t border-slate-200 bg-white">
                    © {new Date().getFullYear()} SIGAAE v3.0
                </footer>
            </div>
        </div>
    )
}
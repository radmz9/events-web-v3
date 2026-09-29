import { useState } from "react";
import { CalendarOptions } from "./CalendarOptions";
import { CoordiTableView } from "./coordi/CoordiTableView";
import { UserPlus } from "lucide-react";
import { useStudentCatalog } from "../hooks/student-catalog.hook";
import { useAppDispatch } from "../../../app/hooks";
import { openModal } from "../../modals/services/modalSlice";

export const CoordiView = () => {
    const dispatch = useAppDispatch();
    const [calendarId, setCalendarId] = useState<string | null>(null);
    const { catalog } = useStudentCatalog();

    const handleStudentModal = () => {
        dispatch(openModal({ type: 'CREATE_STUDENT', title: 'Formulario de Registro', data: { calendarOptions: catalog.calendarOptions, sedeOptions: catalog.sedeOptions } }))
    }
    
    return(
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between bg-white border border-slate-200 p-6 rounded-lg shandow-md">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="font-bold text-2xl text-slate-600">
                            Estudiantes
                        </h1>
                        <button
                            className="cursor-pointer border border-slate-200 px-2 py-1 rounded-lg bg-green-500 text-white hover:bg-green-800"
                            onClick={handleStudentModal}
                        >
                            <UserPlus />
                        </button>
                    </div>
                    <span
                        className="font-light text-sm"
                    >
                        Para ver los alumos, debes seleccionar un calendario escolar.
                    </span>
                </div>

                <CalendarOptions setCalendar={setCalendarId} />
            </div>

            <CoordiTableView calendarId={calendarId} />
        </div>
    )
}
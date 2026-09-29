import { FileSpreadsheet } from "lucide-react"
import { DetailComponent } from "./DetailComponent"
import { students, staff, attendanceEvent, studentsStatus } from "../constants/index.constants"

export const CSVFormatGuide = () => {
    const studentExample = 'CODE123XS, USER NAME, H, 1, 1, 11, 44, 1';
    const staffExample = 'CODE123, USER NAME, H, 44';
    const eventExample = '400, CODE123XS';
    const statusExample = 'CODE123XS, 2';
    return(
        <div className="w-full max-w-4xl mx-auto my-6 space-y-5">
            <div className="border-b border-slate-200 pb-2 bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-slate-800">
                    <FileSpreadsheet className="w-6 h-6 text-indigo-600" />
                    Estructura requerida para los archivos CSV
                </h3>
                <p className="text-sm text-slate-500">
                    Despliega el tipo de registro que vas a subir para validar que tu archivo cumpla con el formato.
                </p>
            </div>

            <DetailComponent id="01" title="Alumnos | Egresados | Inactivos" headers={students} example={studentExample} />
            <DetailComponent id="02" title="Profesores | Administrativos" headers={staff} example={staffExample} />
            <DetailComponent id="03" title="Asistencia a eventos" headers={attendanceEvent} example={eventExample} />
            <DetailComponent id="04" title="Actualización de estatus de estudiantes" headers={studentsStatus} example={statusExample} />
        </div>
    )
}
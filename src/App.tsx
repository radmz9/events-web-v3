import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MainLayout } from "./common/components/layout/MainLayout";
import { LoginPage } from "./features/auth/components/LoginPage";
import { HomePage } from "./features/home/components/HomePage";
import { SearchPage } from "./features/search/components/SearchPage";
//
import { AreaPage } from "./features/areas/components/AreaPage";
import { SedePage } from "./features/sedes/components/SedePage";
import { PlacePage } from "./features/places/components/PlacePage";
import { ModalityPage } from "./features/modalities/components/ModalityPage";
import { OdsPage } from "./features/ods/components/OdsPage";
import { ThematicPage } from "./features/thematics/components/ThematicPage";
import { TypePage } from "./features/event_type/components/TypePage";
import { StaffPage } from "./features/staff/components/StaffPage";
import { ProtectedRoute } from "./common/components/layout/ProtectedRoute";
import { CurrentEvent } from "./features/home/components/Event";
import { HistoricalPage } from "./features/search/components/HistoricalPage";
import { ProfilePage } from "./features/profile/components/ProfilePage";
import { AccountPage } from "./features/accounts/components/AccountPage";
import { CsvPage } from "./features/csv/components/CsvPage";
import { ReportByGender } from "./features/reports/components/ReportByGender";
import { ReportByRoles } from "./features/reports/components/ReportByRoles";
import { ReportByOds } from "./features/reports/components/ReportByOds";
import { ReportByStudents } from "./features/reports/components/ReportByStudents";
import { ReportByStaff } from "./features/reports/components/ReportByStaff";
import { GeneralReport } from "./features/reports/components/GeneralReport";
import { DetailedReport } from "./features/reports/components/DetailedReport";
import { CalendarPage } from "./features/calendars/components/CalendarPage";
import { EventPage } from "./features/events/components/EventPage";
import { EventView } from "./features/events/components/EventView";
import { StudentPage } from "./features/students/components/StudentPage";
import { DetailsPage } from "./features/students/components/DetailsPage";
import { StatsPage } from "./features/students/components/StatsPage";
import { GeneralReportByArea } from "./features/reports/components/GeneralReportByArea";
import { StaffDetails } from "./features/staff/components/StaffDetails";

function App(){
    return( 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/evento/registros" element={<CurrentEvent />} />
                    <Route path="/historial/eventos" element={<HistoricalPage />} />

                    
                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute allowedRoles={['ROOT']} />}>
                        <Route path="/areas/carreras" element={<AreaPage typeId={1} title="Carreras" />} />
                        <Route path="/areas/departamentos" element={<AreaPage typeId={2} title="Departamentos" />} />
                        <Route path="/areas/areas" element={<AreaPage typeId={3} title="Áreas" />} />
                        <Route path="/areas/supervision" element={<AreaPage typeId={4} title="Supervisión" />} />

                        <Route path="/calendarios" element={<CalendarPage />} />
                        <Route path="/sedes" element={<SedePage />} />
                        <Route path="/lugares" element={<PlacePage />} />
                        <Route path="/modalidades" element={<ModalityPage />} />
                        <Route path="/ods" element={<OdsPage />} />
                        <Route path="/tematicas" element={<ThematicPage />} />
                        <Route path="/tipos_evento" element={<TypePage />} />

                        <Route path="/comunidad/administrativos" element={<StaffPage typeId={5} title="Administrativos" />} />

                        <Route path="/cuentas" element={<AccountPage />} />
                        <Route path="/csv" element={<CsvPage />}/>
                        {/* Reportes */}
                        {/* <Route path="/reporte/genero" element={<ReportByGender />} /> */}
                        {/* <Route path="/reporte/roles" element={<ReportByRoles />} />
                        <Route path="/reporte/ods" element={<ReportByOds />} />
                        <Route path="/reporte/alumnos" element={<ReportByStudents />} />
                        <Route path="/reporte/personal" element={<ReportByStaff />} />
                        <Route path="/reporte/general" element={<GeneralReport />} />
                        <Route path="/reporte/alumnos/rango" element={<DetailedReport />} /> */}
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['ROOT', 'COORDI', 'JEFE_AREA', 'JEFE_DPTO']} />}>
                        <Route path="/reporte/historico/eventos" element={<GeneralReportByArea />} />
                        <Route path="/reporte/genero" element={<ReportByGender />} />
                    </Route>   

                    <Route element={<ProtectedRoute allowedRoles={['ROOT', 'SUPERVISOR']} />}>
                        <Route path="/reporte/roles" element={<ReportByRoles />} />
                        <Route path="/reporte/ods" element={<ReportByOds />} />
                        <Route path="/reporte/alumnos" element={<ReportByStudents />} />
                        <Route path="/reporte/personal" element={<ReportByStaff />} />
                        <Route path="/reporte/general" element={<GeneralReport />} />
                        <Route path="/reporte/alumnos/rango" element={<DetailedReport />} />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['JEFE_DPTO', 'ROOT']} />}>
                        <Route path="/comunidad/profesores" element={<StaffPage typeId={4} title="Profesores" />} />
                    </Route>         
                    
                    <Route element={<ProtectedRoute allowedRoles={['COORDI', 'JEFE_AREA', 'JEFE_DPTO', 'ROOT']} />}>
                        <Route path="/eventos" element={<EventPage />} />
                        <Route path="/eventos/detalles/:eventId" element={<EventView />} />
                    </Route>
                    <Route element={<ProtectedRoute allowedRoles={['COORDI', 'JEFE_AREA', 'JEFE_DPTO', 'ROOT', 'SUPERVISOR']} />}>
                        <Route path="/perfil" element={<ProfilePage />} />
                    </Route>
                    <Route element={<ProtectedRoute allowedRoles={['COORDI', 'ROOT']} />}>
                        <Route path="/comunidad/alumnos" element={<StudentPage />} />
                        <Route path="/comunidad/alumnos/:code" element={<DetailsPage />} />
                        <Route path="/comunidad/alumnos/estadisticas" element={<StatsPage />} />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['ROOT', 'JEFE_DPTO']} />}>
                        <Route path="/comunidad/personal/:code" element={<StaffDetails />} />
                    </Route>
                </Route>

                {/* Page 404 */}
                <Route element={<MainLayout />}>
                    <Route path="*" element={
                        <div className="flex flex-col items-center justify-center h-screen">
                            <h1 className="text-4xl font-black">404</h1>
                            <p>Pagina no econtrada</p>
                            <Link to="/" className="text-indigo-500 underline mt-4">Volver al inicio</Link>
                        </div>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
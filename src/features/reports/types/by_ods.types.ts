interface InfoEvent {
    id: number;
    nombre: string;
    totalEventos: string;
}

interface Stats {
    hombres: number;
    mujeres: number;
    total: number;
}

interface FullStats {
    asistencia: number;
    comunidad: Stats;
    externos: Stats;
}

export interface ReportByOds extends InfoEvent{
    stats: FullStats;
}

interface GeneralStats {
    actividades: number;
    asistencia: number;
    comunidad: Partial<Stats>;
    externos: Partial<Stats>;
}

export interface FullReportByOds {
    report: ReportByOds[],
    generalStats: GeneralStats
}
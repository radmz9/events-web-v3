interface Stats {
    total: number | string;
    hombres: number | string;
    mujeres: number | string;
    indigenas: number | string;
    alumnos: number | string;
    egresados: number | string;
    inactivos: number | string;
}

interface Calendar extends Stats {
    calendario: string;
}

export interface StudentStatsTypes {
    stats: Stats;
    caledarDetails: Calendar[];
}
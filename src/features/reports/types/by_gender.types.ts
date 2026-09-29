import type { GeneralStats } from "./common_stats.types";

export interface CommonInfoEvent {
    id: number;
    area: string;
    nombre: string;
    tipo: string;
    tematica: string;
    ods: string
    modalidad: string;
    fecha: string;
}

export interface ReportByGender extends CommonInfoEvent {
    stats: GeneralStats;
}
import type { OutsiderStats } from "./common_stats.types";

interface Staff {
    year: number;
    totalProfesores: number;
    totalAdministrativos: number;
}

export interface ReportByStaff extends Staff {
    profesores: OutsiderStats;
    administrativos: OutsiderStats;
}
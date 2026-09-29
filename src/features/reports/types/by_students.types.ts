import type { CommunityStats } from "./common_stats.types";

export interface ReportByStudents extends CommunityStats {
    id: number;
    nombre: string;
    alumnos: string;
}
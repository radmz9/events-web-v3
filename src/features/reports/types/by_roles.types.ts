import type { CommonInfoEvent } from "./by_gender.types";

interface RoleStats {
    estudiantes: number;
    profesores: number;
    administrativos: number;
    externos: number;
    total: number;
}

export interface ReportByRoles extends CommonInfoEvent {
    stats: RoleStats;
};
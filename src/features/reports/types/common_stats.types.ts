export interface CommonStats {
    hombres: number;
    mujeres: number;
}

export interface CommunityStats extends CommonStats {
    indigenas: number;
    total: number;
}

export interface OutsiderStats extends CommonStats {
    total: number;
}

export interface GeneralStats {
    alumnos: CommunityStats;
    egresados: CommunityStats;
    profesores: CommunityStats;
    administrativos: CommunityStats;
    externos: OutsiderStats;
    total: number;
}
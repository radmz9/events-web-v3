export interface Area {
    id: number;
    clave: string;
    nombre: string;
    dependencia?: string | null;
}

export const AreaType = {
    CARRERA: 1,
    DEPARTAMENTO: 2,
    AREA: 3,
    SUPERVISION: 4,
} as const;

export type AreaType = typeof AreaType[keyof typeof AreaType];
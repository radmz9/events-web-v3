interface EventAttended {
    id: number;
    nombre: string;
    duracion: number;
    tipo: string;
    lugar: string;
    fecha: string;
    area: string;
    createdAt: Date    
}

export interface UserEventsSummary {
    total: number;
    totalHours: number;
    events: EventAttended[]
}

export interface UserInfoWithEvents {
    id: number;
    codigo: string;
    nombre: string;
    area: string;
    rol: string;
    areaResponsable: string;
    rolAreaResponsable: string;
    eventsSummary: UserEventsSummary
}
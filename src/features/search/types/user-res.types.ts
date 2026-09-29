interface Event {
    id: number;
    nombre: string;
    duracion: number;
    tipo: string;
    lugar: string;
    fecha: string;
    area: string;
    createdAt: Date
}

export interface UserResponse {
    id: number;
    codigo: string;
    nombre: string;
    area: string;
    rol: string;
    areaResponsable: string;
    rolAreaResponsable: string;
    eventsSummary: {
        total: number;
        totalHours: number;
        events: Event[]
    }
}
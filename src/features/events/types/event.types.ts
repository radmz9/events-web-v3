export interface EventType {
    id: number;
    clave: string;
    nombre: string;
    responsable: string;
    idArea: string;
    area: string;
    fecha: string;
    hora: string;
    idLugar: string | null;
    lugar: string;
    idTipo: string;
    tipo: string;
    encargado: string;
    duracion: number;
    idSede: string;
    sede: string;
    isActive: boolean;
    idOds: string;
    ods: string;
    idModalidad: string;
    modalidad: string;
    idTematica: string;
    tematica: string;
    constancy: boolean;    
}

export interface MetaData {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface EventsType {
    data: EventType[];
    meta: MetaData
}
interface CommonFields {
    nombre: string;
    total: number;
}

interface Areas {
    clave: string;
    area: string;
    eventos: CommonFields[];
    total: number;
}

interface Year {
    year: string;
    eventos: CommonFields[];
    total: number;
}

export interface GeneralReport {
    areas: Areas[];
    types: CommonFields[];
    total: number;
}

export interface GeneralReportByAreaDto {
    stats: Year[];
    types: CommonFields[];
    total: number;
}
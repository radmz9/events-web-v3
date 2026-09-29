import type { HeaderTypes } from "../types/headers.types";

export const students: HeaderTypes[] = [
    { header: 'codigo', type: 'string', rules: 'Longitud de 7 a 9 \nSolo letras y numeros' },
    { header: 'nombre', type: 'string', rules: 'Longitud de 3 a 250 \nSolo letras, puedes usar comas (,) y puntos (.)' },
    { header: 'genero', type: 'string', rules: 'H = Hombre \nM = Mujer' },
    { header: 'etnia', type: 'number', rules: '1 = SI \n0 = NO' },
    { header: 'idRol', type: 'number', rules: '1 = Alumno \n2 = Egresado \n3 = Inactivo' },
    { header: 'idArea', type: 'number', rules: '11 = Ingeniería en Electrónica y Computación.' },
    { header: 'idCalendario', type: 'number', rules: '44 = 2020B.' },
    { header: 'idSede', type: 'number', rules: '1 = Colotlán' },
];

export const staff: HeaderTypes[] = [
    { header: 'codigo', type: 'string', rules: 'Longitud de 7 a 9 \nSolo letras y numeros' },
    { header: 'nombre', type: 'string', rules: 'Longitud de 3 a 250 \nSolo letras, puedes usar comas (,) y puntos (.)' },
    { header: 'genero', type: 'string', rules: 'H = Hombre \nM = Mujer' },
    { header: 'idArea', type: 'number', rules: '40 = Departamento de Desarrollo Sustentable.' },
];

export const attendanceEvent: HeaderTypes[] = [
    { header: 'idEvento', type: 'number', rules: '400 = Evento de Prueba' },
    { header: 'codigo', type: 'string', rules: 'Longitud de 7 a 9 \nSolo letras y numeros' }
];

export const studentsStatus: HeaderTypes[] = [
    { header: 'codigo', type: 'string', rules: 'Longitud de 7 a 9 \nSolo letras y numeros' },
    { header: 'estatus', type: 'number', rules: '1 = Alumno \n2 = Egresado \n3 = Inactivo' }
]

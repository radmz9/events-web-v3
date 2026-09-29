import { 
    BookSearch,
    SquareUser,
    University,
    GraduationCap,
    Building2,
    UserStar,
    CalendarRange,
    School,
    Settings,
    MapPin,
    TrendingUpDown,
    FileStack,
    FileSpreadsheet,
    List,
    IdCard,
    CalendarCog,
    FileUp,
    BarChart3,
    ListCheck,
    CopyCheck,
    VenusAndMars,
    SquareChartGantt,
    History,
    ChartLine,
    ChartBar,
    FileChartLine,
    ChartSpline,
    BriefcaseBusiness
} from "lucide-react";

interface SubMenuItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

export interface MenuItem {
    label: string;
    icon: React.ElementType;
    href?: string;
    subItems?: SubMenuItem[];
}

export const menuConfig: MenuItem[] = [
    { label: 'Ver mis eventos', icon: BookSearch, href: '/search' },
];

export const ROOT: MenuItem[] = [
    { label: 'Perfil', icon: SquareUser, href: '/perfil' },
    {
        label: 'Áreas',
        icon: University,
        subItems: [
            { label: 'Áreas', href: '/areas/areas', icon: GraduationCap },
            { label: 'Carreras', href: '/areas/carreras', icon: GraduationCap },
            { label: 'Departamentos', href: '/areas/departamentos', icon: Building2 },
            { label: 'Supervisión', href: '/areas/supervision', icon: UserStar },
        ]
    },
    { label: 'Calendarios Escolares', icon: CalendarRange, href: '/calendarios' },
    {
        label: 'Comunidad',
        icon: School,
        subItems: [
            { label: 'Administrativos', href: '/comunidad/administrativos', icon: BriefcaseBusiness },
            { label: 'Alumnos', href: '/comunidad/alumnos', icon:  GraduationCap},
            { label: 'Profesores', href: '/comunidad/profesores', icon:  UserStar},
        ]
    },{
        label: 'Configuración',
        icon: Settings,
        subItems: [
            { label: 'Lugares', href: '/lugares', icon: MapPin },
            { label: 'Modalidad', href: '/modalidades', icon: TrendingUpDown },
            { label: 'Ods', href: '/ods', icon: FileStack },
            { label: 'Sedes', href: '/sedes', icon: School },
            { label: 'Temáticas', href: '/tematicas', icon: FileSpreadsheet },
            { label: 'Tipos de Evento', href: '/tipos_evento', icon: List },
        ]
    },
    { label: 'Cuentas', href: '/cuentas', icon: IdCard},
    { label: 'Eventos', href: '/eventos', icon: CalendarCog },
    { label: 'Registro CSV', href: '/csv', icon: FileUp },
    { 
        label: 'Reportes', 
        icon: BarChart3,
        subItems: [
            { label: 'Asistencia por Roles', href: '/reporte/roles', icon: ListCheck },
            { label: 'Asistencia de Alumnos', href: '/reporte/alumnos', icon: CopyCheck },
            { label: 'Asistencia de Personal', href: '/reporte/personal', icon: CopyCheck },
            { label: 'Por Género', href: '/reporte/genero', icon: VenusAndMars },
            { label: 'Eventos por Alumno', href: '/reporte/alumnos/rango', icon: SquareChartGantt },
            { label: 'Histórico ODS', href: '/reporte/ods', icon: History },
            { label: 'Total de Eventos', href: '/reporte/general', icon: ChartLine },
        ]
    }
];

export const COORDI: MenuItem[] = [
    { label: 'Perfil', icon: SquareUser, href: '/perfil' },
    { label: 'Eventos', href: '/eventos', icon: CalendarCog },   
    { label: 'Alumnos', href: '/comunidad/alumnos', icon:  GraduationCap}, 
    { label: 'Estadísticas', href: '/comunidad/alumnos/estadisticas', icon:  ChartBar},
    { label: 'Asistencia a Eventos', href: '/reporte/genero', icon: FileChartLine },
    { label: 'Historico de Eventos', href: '/reporte/historico/eventos', icon: ChartSpline }
];

export const JEFE_AREA: MenuItem[] = [
    { label: 'Perfil', icon: SquareUser, href: '/perfil' },
    { label: 'Eventos', href: '/eventos', icon: CalendarCog },
    { label: 'Asistencia a Eventos', href: '/reporte/genero', icon: FileChartLine },
    { label: 'Historico de Eventos', href: '/reporte/historico/eventos', icon: ChartSpline }
];

export const JEFE_DPTO: MenuItem[] = [
    { label: 'Perfil', icon: SquareUser, href: '/perfil' },
    { label: 'Eventos', href: '/eventos', icon: CalendarCog },
    { label: 'Profesores', href: '/comunidad/profesores', icon:  UserStar},
    { label: 'Asistencia a Eventos', href: '/reporte/genero', icon: FileChartLine },
    { label: 'Historico de Eventos', href: '/reporte/historico/eventos', icon: ChartSpline }
];

export const SUPERVISOR: MenuItem[] = [
    { label: 'Perfil', icon: SquareUser, href: '/perfil' },
    { 
        label: 'Reportes', 
        icon: BarChart3,
        subItems: [
            { label: 'Asistencia por Roles', href: '/reporte/roles', icon: ListCheck },
            { label: 'Asistencia de Alumnos', href: '/reporte/alumnos', icon: CopyCheck },
            { label: 'Asistencia de Personal', href: '/reporte/personal', icon: CopyCheck },
            { label: 'Eventos por Alumno', href: '/reporte/alumnos/rango', icon: SquareChartGantt },
            { label: 'Histórico ODS', href: '/reporte/ods', icon: History },
            { label: 'Total de Eventos', href: '/reporte/general', icon: ChartLine },
        ]
    }
];
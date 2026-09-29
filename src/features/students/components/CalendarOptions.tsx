import { useGetCalendarsQuery } from "../../calendars/api/calendarApi";

interface Props {
    setCalendar: (calendarId: string) => void;
}

export const CalendarOptions = ({ setCalendar }: Props) => {
    const { data: calendars = [], isLoading } = useGetCalendarsQuery();

    if(isLoading) return <p>Cargando...</p>
    return(
        <select 
            name="calendars" 
            id="calendars"
            onChange={(e) => setCalendar(e.target.value)}
            className="border border-slate-200 p-2 rounded-md"
        >
            <option value="">Calendario</option>
            { calendars.length ? calendars.map((c) => <option value={c.id} key={c.id}>{c.nombre}</option>) : null}
        </select>
    )
}
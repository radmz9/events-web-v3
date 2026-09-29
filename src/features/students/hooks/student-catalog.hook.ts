import { useAppSelector } from "../../../app/hooks"
import { toOptions } from "../../../shared/utils/toOption.helper";
import { useFetchAreasQuery } from "../../areas/api/areaApi";
import { useGetCalendarsQuery } from "../../calendars/api/calendarApi";
import { useGetSedesQuery } from "../../sedes/api/sedeApi";


export const useStudentCatalog = () => {
    const { role } = useAppSelector(state => state.auth);

    const { data: calendars = [], isLoading: loadingCalendars } = useGetCalendarsQuery();
    const { data: sedes = [], isLoading: loadingSedes } = useGetSedesQuery();
    const { data: areas = [], isLoading: loadingAreas } = useFetchAreasQuery(
        undefined, { skip: role !== 'ROOT' }
    );

    const isLoading = loadingCalendars || loadingSedes || loadingAreas;

    const calendarOptions = toOptions(calendars, { value: 'id', label: 'nombre' });
    const sedeOptions = toOptions(sedes, { value: 'id', label: 'nombre' });
    const areaOptions = areas !== undefined ? areas.map((a) => {
        return { id: a?.id || '', label: a?.nombre || ''  }
    }) : [];

    const catalog = {
        calendarOptions,
        sedeOptions,
        areaOptions
    };

    return {
        catalog,
        isLoading
    }
}
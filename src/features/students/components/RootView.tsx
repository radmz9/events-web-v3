import { useState } from "react"
import { FilterForm } from "./forms/FilterForm";
import { StudentTable } from "./StudentTable";
import { useGetCalendarsQuery } from "../../calendars/api/calendarApi";
import { useGetSedesQuery } from "../../sedes/api/sedeApi";
import { useGetAreasByTypeQuery } from "../../areas/api/areaApi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { openModal } from "../../modals/services/modalSlice";
import { toOptions } from "../../../shared/utils/toOption.helper";
import { skipToken } from "@reduxjs/toolkit/query";
import { TabOptions, type TabType } from "./TabOptions";
import { SearchForm } from "./forms/SearchForm";

export type SearchFilters = {
    areaId: string;
    calendarId: string;
}

export const RootView = () => {
    const [activeTab, setActiveTab] = useState<TabType>('search');
    const { role } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const [filters, setFilters] = useState<SearchFilters | null>(null);
    const { data: calendars = [] } = useGetCalendarsQuery();
    const { data: sedes = [] } = useGetSedesQuery();
    const { data: areas = [] } = useGetAreasByTypeQuery(
        role === 'ROOT' ? 1 : skipToken
    );

    const areaOptions = areas ? toOptions(areas, { value: 'id', label: 'nombre' }) : undefined;
    const calendarOptions = toOptions(calendars, { value: 'id', label: 'nombre' });
    const sedeOptions = toOptions(sedes, { value: 'id', label: 'nombre' })

    const handleOpenModal = () => {
        dispatch(openModal({ type: "CREATE_STUDENT", title: "Nuevo estudiante", data: { areaOptions, calendarOptions, sedeOptions } }));
    }
    return(
        <div className="space-y-6 p-6">
            <section>
            {/* <section className="flex items-baseline justify-between bg-white p-6 border rounded-md border-slate-200 shadow-lg"> */}
                <TabOptions activeTab={activeTab} setActiveTab={setActiveTab} action={handleOpenModal}>
                    { activeTab === 'search' ? <SearchForm /> : <FilterForm onSuccess={setFilters} /> }
                </TabOptions>    
            </section>
            <StudentTable filters={filters} />
        </div> 
    )   
}
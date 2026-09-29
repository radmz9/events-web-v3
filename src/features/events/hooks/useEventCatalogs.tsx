import { useAppSelector } from "../../../app/hooks"
import type { RootState } from "../../../app/store"
import { toOptions } from "../../../shared/utils/toOption.helper";
import { useFetchAreasQuery } from "../../areas/api/areaApi";
import { useGetTypesQuery } from "../../event_type/api/typeApi";
import { useGetModalitiesQuery } from "../../modalities/api/modalityApi";
import { useGetOdsQuery } from "../../ods/api/odsApi";
import { useGetPlacesQuery } from "../../places/api/placeApi";
import { useGetSedesQuery } from "../../sedes/api/sedeApi";
import { useGetThematicsQuery } from "../../thematics/api/thematicApi";

export const useEventCatalogs = () => {
    const { role } = useAppSelector((state: RootState) => state.auth);

    const { data: places = [], isLoading: placeIsLoading, isFetching: placeIsFetching, isError: placeIsError } = useGetPlacesQuery();
    const { data: types = [], isLoading: typeIsLoading, isFetching: typeIsFetching, isError: typeIsError } = useGetTypesQuery();
    const { data: sedes = [], isLoading: sedeIsLoading, isFetching: sedeIsFetching, isError: sedeIsError } = useGetSedesQuery();
    const { data: ods = [], isLoading: odsIsLoading, isFetching: odsIsFetching, isError: odsIsError } = useGetOdsQuery();
    const { data: modalities = [], isLoading: modIsLoading, isFetching: modIsFetching, isError: modIsError } = useGetModalitiesQuery();
    const { data: thematics = [], isLoading: theIsLoading, isFetching: theIsFetching, isError: theIsError } = useGetThematicsQuery();
    const { data: areas = [], isLoading: areaIsLoading, isFetching: areaIsFetching, isError: areaIsError } = useFetchAreasQuery( undefined, {
        skip: role !== 'ROOT'
    } )
    // const areas = useGetAvailableAreasQuery(undefined, {
    //     skip: role !== 'ROOT'
    // })

    const isLoading = placeIsLoading || typeIsLoading || sedeIsLoading || odsIsLoading || modIsLoading || theIsLoading || areaIsLoading;
    const isFetching = placeIsFetching || typeIsFetching || sedeIsFetching || odsIsFetching || modIsFetching || theIsFetching || areaIsFetching;
    const isError = placeIsError || typeIsError || sedeIsError || odsIsError || modIsError || theIsError || areaIsError;

    const placeOptions = toOptions(places, { value: 'id', label: 'nombre' });
    const typeOptions = toOptions(types, { value: 'id', label: 'nombre' });
    const sedeOptions = toOptions(sedes, { value: 'id', label: 'nombre' });
    const odsOptions = toOptions(ods, { value: 'id', label: 'nombre' });
    const modalityOptions = toOptions(modalities, { value: 'id', label: 'nombre' });
    const thematicOptions = toOptions(thematics, { value: 'id', label: 'nombre' });
    const areaOptions = areas !== undefined ? areas.map((a) => { 
        return { id: String(a?.id || ''), label: a?.nombre || '' }
    }) : [];

    const catalog = {
        placeOptions,
        typeOptions,
        sedeOptions,
        odsOptions,
        modalityOptions,
        thematicOptions,
        areaOptions
    }

    return {
        catalog,
        isLoading,
        isFetching,
        isError
    }
}
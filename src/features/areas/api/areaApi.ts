import { baseApi } from "../../../app/services/baseApi";
import type { Area } from "../types/area.types";

const endpointNames: Array<string> = [
    '',
    'career',
    'department',
    'area',
    'supervision'
];

const url = `/areas`

export const areaApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAreasByType: builder.query<Area[], number>({
            query: (typeId) => `${url}/type/${endpointNames[typeId]}`,
            // providesTags: (result) => result ? [...result.map(({ id }) => ({ type: 'Area' as const, id })), 'Area'] : ['Area'],
            providesTags: (result) => result ? [...result.map(({ id }) => ({ type: 'Area' as const, id })) , { type: 'Area' as const, id: 'LIST' }] : [{ type: 'Area' as const, id: 'LIST' }]
        }),
        fetchAreas: builder.query<Partial<Area[]>, void>({
            query: () => '/areas',
            providesTags: ['Area']
        }),
        //Mutations
        createArea: builder.mutation<Area, Partial<Area> & {id_tipo_area: number}> ({
            query: (newArea) => ({
                url: `${url}`,
                method: 'POST',
                body: newArea
            }),
            invalidatesTags: [{ type: 'Area', id: 'LIST' }]
        }),
        updateArea: builder.mutation<Area, { areaId: number, area: Partial<Area>}>({
            query: ({areaId, area}) => ({
                url: `${url}/${areaId}`,
                method: 'PATCH',
                body: area
            }),
            invalidatesTags: (_result, _error, { areaId }) => [
                { type: 'Area', id: areaId},
                { type: 'Area', id: 'LIST' }
            ]
        }),
        deleteArea: builder.mutation<void, number>({
            query: (areaId) => ({
                url: `${url}/${areaId}`,
                method: 'DELETE',
            }),
            // invalidatesTags: ['Area']
            invalidatesTags: (_result, _error, id) => [
                { type: 'Area', id },
                { type: 'Area', id: 'LIST' }
            ],
        })
    })
});

export const { 
    useGetAreasByTypeQuery,
    useFetchAreasQuery, 
    useCreateAreaMutation, 
    useUpdateAreaMutation, 
    useDeleteAreaMutation 
} = areaApi;
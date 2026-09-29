import { baseApi } from "../../../app/services/baseApi";
import type { Place } from "../types/place.types";

export const placeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPlaces: builder.query<Place[], void>({
            query: () => '/places',
            providesTags: ['Place']
        }),
        //Mutations
        createPlace: builder.mutation<Place, Partial<Place>>({
            query: (body) => ({
                url: '/places',
                method:'POST',
                body
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data: createdPlace } = await queryFulfilled;
                    dispatch(
                        placeApi.util.updateQueryData('getPlaces', undefined, (draft) => {
                            draft.unshift(createdPlace)
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        updatePlace: builder.mutation<Place, { placeId: number, place: Partial<Place> }>({
            query: ({ placeId, place }) => ({
                url: `/places/${placeId}`,
                method: 'PATCH',
                body: place
            }),
            async onQueryStarted({ placeId }, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedPlace } = await queryFulfilled;
                    dispatch(
                        placeApi.util.updateQueryData('getPlaces', undefined, (draft) => {
                            const index = draft.findIndex((p) => p.id === placeId);
                            if(index !== -1){
                                draft[index] = updatedPlace;
                            }
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        deletePlace: builder.mutation<void, number>({
            query: (placeId) => ({
                url: `/places/${placeId}`,
                method: 'DELETE'
            }),
            async onQueryStarted(placeId, { dispatch, queryFulfilled }){
                try {
                    await queryFulfilled;
                    dispatch(
                        placeApi.util.updateQueryData('getPlaces', undefined, (draft) => {
                            return draft.filter((p) => p.id !== placeId)
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})

export const { useGetPlacesQuery, useCreatePlaceMutation, useUpdatePlaceMutation, useDeletePlaceMutation } = placeApi;
import { baseApi } from "../../../app/services/baseApi";
import type { Ods } from "../types/ods.types";

export const odsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOds: builder.query<Ods[], void>({
            query: () => '/ods',
            providesTags: ['Ods']
        }),
        //Mutations
        createOds: builder.mutation<Ods, Partial<Ods>>({
            query: (body) => ({
                url: '/ods',
                method: 'POST',
                body
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }){
                try {
                    const { data: createdOds } = await queryFulfilled;
                    dispatch(
                        odsApi.util.updateQueryData('getOds', undefined, (draft) => {
                            draft.unshift(createdOds)
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        updateOds: builder.mutation<Ods, { odsId: number, ods: Partial<Ods> }>({
            query: ({ odsId, ods }) => ({
                url: `/ods/${odsId}`,
                method: 'PATCH',
                body: ods
            }),
            async onQueryStarted({ odsId }, { dispatch, queryFulfilled }){
                try {
                    const { data: updatedOds } = await queryFulfilled;
                    dispatch(
                        odsApi.util.updateQueryData('getOds', undefined, (draft) => {
                            const index = draft.findIndex((o) => o.id === odsId);
                            if(index !== -1) draft[index] = updatedOds;
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        deleteOds: builder.mutation<void, number>({
            query: (odsId) => ({
                url: `/ods/${odsId}`,
                method: 'DELETE'
            }),
            async onQueryStarted(odsId, { dispatch, queryFulfilled }){
                try {
                    await queryFulfilled;
                    dispatch(
                        odsApi.util.updateQueryData('getOds', undefined, (draft) => {
                            return draft.filter((o) => o.id !== odsId)
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
});

export const { useGetOdsQuery, useCreateOdsMutation, useUpdateOdsMutation, useDeleteOdsMutation } = odsApi;
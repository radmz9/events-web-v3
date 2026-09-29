import { baseApi } from "../../../app/services/baseApi";
import type { Sede } from "../types/sede.types";

export const sedeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSedes: builder.query<Sede[], void>({
            query: () => '/sedes',
            providesTags: (res) => res ? [...res.map(({ id }) => ({ type: 'Sede' as const, id })), { type: 'Sede' as  const, id: 'LIST' }] : [{ type: 'Sede' as const, id: 'LIST' }]
        }),
        //Mutations
        createSede: builder.mutation<Sede, Partial<Sede>>({
            query: (body) => ({
                url: '/sedes',
                method: 'POST',
                body
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data: createdSede } = await queryFulfilled;
                    dispatch(
                        sedeApi.util.updateQueryData('getSedes', undefined, (draft) => {
                            draft.unshift(createdSede)
                        })
                    )
                } catch(error) {
                    console.error('Failed to create sede:', error);
                }
            }
        }),
        updateSede: builder.mutation<Sede, { sedeId: number; sede: Partial<Sede>}>({
            query: ({ sedeId, sede }) => ({
                url: `/sedes/${sedeId}`,
                method: 'PATCH',
                body: sede
            }),
            async onQueryStarted({ sedeId }, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedSede } = await queryFulfilled;
    
                    dispatch(
                        sedeApi.util.updateQueryData('getSedes', undefined, (draft) => {
                            const index = draft.findIndex((s) => s.id === sedeId);
                            if(index !== -1){
                                draft[index] = updatedSede
                            }
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        deleteSede: builder.mutation<void, number>({
            query: (sedeId) => ({
                url: `/sedes/${sedeId}`,
                method: 'DELETE'
            }),
            async onQueryStarted(sedeId, { dispatch, queryFulfilled }){
                try {
                    await queryFulfilled;
                    dispatch(
                        sedeApi.util.updateQueryData('getSedes', undefined, (draft) => {
                            return draft.filter((d) => d.id !== sedeId)
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})

export const { useGetSedesQuery, useCreateSedeMutation, useUpdateSedeMutation, useDeleteSedeMutation } = sedeApi;
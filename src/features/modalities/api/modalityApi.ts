import { baseApi } from "../../../app/services/baseApi";
import type { Modality } from "../types/modality.types";

export const modalityApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getModalities: builder.query<Modality[], void>({
            query: () => '/modalities',
            providesTags: ['Modality']
        }),
        //Mutations
        createModality: builder.mutation<Modality, Partial<Modality>>({
            query: (body) => ({
                url: '/modalities',
                method: 'POST',
                body
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }){
                try {
                    const { data: createdModality } = await queryFulfilled;
                    dispatch(
                        modalityApi.util.updateQueryData('getModalities', undefined, (draft) => {
                            draft.unshift(createdModality);
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        updateModality: builder.mutation<Modality, { modalityId: number, modality: Partial<Modality> }>({
            query: ({ modalityId, modality }) => ({
                url: `/modalities/${modalityId}`,
                method: 'PATCH',
                body: modality
            }),
            async onQueryStarted({ modalityId }, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedModality } = await queryFulfilled;
                    dispatch(
                        modalityApi.util.updateQueryData('getModalities', undefined, (draft) => {
                            const index = draft.findIndex((m: Modality) => m.id === modalityId);
                            if(index !== -1) draft[index] = updatedModality
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        deleteModality: builder.mutation<void, number>({
            query: (modalityId) => ({
                url: `/modalities/${modalityId}`,
                method: 'DELETE'
            }),
            async onQueryStarted(modalityId, { dispatch, queryFulfilled }){
                try {
                    await queryFulfilled;
                    dispatch(
                        modalityApi.util.updateQueryData('getModalities', undefined, (draft) => {
                            return draft.filter((t: Modality) => t.id !== modalityId)
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
});

export const { useGetModalitiesQuery, useCreateModalityMutation, useUpdateModalityMutation, useDeleteModalityMutation } = modalityApi;
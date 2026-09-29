import { baseApi } from "../../../app/services/baseApi";
import type { Type } from "../types/type.types";

export const typeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTypes: builder.query<Type[], void>({
            query: () => '/types',
            providesTags: ['Type']
        }),
        // Mutations
        createType: builder.mutation<Type, Partial<Type>>({
            query: (body) => ({
                url: '/types',
                method: 'POST',
                body
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }){
                try {
                    const { data: createdType } = await queryFulfilled;
                    dispatch(
                        typeApi.util.updateQueryData('getTypes', undefined, (draft) => {
                            draft.unshift(createdType)
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        updateType: builder.mutation<Type, { typeId: number, type: Partial<Type> }>({
            query: ({ typeId, type }) => ({
                url: `/types/${typeId}`,
                method: 'PATCH',
                body: type
            }),
            async onQueryStarted({ typeId }, { dispatch, queryFulfilled }){
                try {
                    const { data: updatedType } = await queryFulfilled;
                    dispatch(
                        typeApi.util.updateQueryData('getTypes', undefined, (draft) => {
                            const index = draft.findIndex((t) => t.id === typeId);
                            if(index !== -1) draft[index] = updatedType;
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        deleteType: builder.mutation<void, number>({
            query: (typeId) => ({
                url: `/types/${typeId}`,
                method: 'DELETE'
            }),
            async onQueryStarted(typeId, { dispatch, queryFulfilled }){
                try {
                    await queryFulfilled;
                    dispatch(
                        typeApi.util.updateQueryData('getTypes', undefined, (draft) => {
                            return draft.filter((t) => t.id !== typeId)
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
});

export const { useGetTypesQuery, useCreateTypeMutation, useUpdateTypeMutation, useDeleteTypeMutation } = typeApi;
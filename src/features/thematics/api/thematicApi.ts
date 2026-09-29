import { baseApi } from "../../../app/services/baseApi";
import type { Thematic } from "../types/thematic.types";

export const thematicApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getThematics: builder.query<Thematic[], void>({
            query: () => '/thematics',
            providesTags: ['Thematic']
        }),
        // Mutations
        createThematic: builder.mutation<Thematic, Partial<Thematic>>({
            query: (body) => ({
                url: '/thematics',
                method: 'POST',
                body
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }){
                try {
                    const { data: createdThematic } = await queryFulfilled;
                    dispatch(
                        thematicApi.util.updateQueryData('getThematics', undefined, (draft) => {
                            draft.unshift(createdThematic);
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        updateThematic: builder.mutation<Thematic, { thematicId: number, thematic: Partial<Thematic> }>({
            query: ({ thematicId, thematic }) => ({
                url: `/thematics/${thematicId}`,
                method: 'PATCH',
                body: thematic
            }),
            async onQueryStarted({ thematicId }, { dispatch, queryFulfilled }){
                try {
                    const { data: updatedThematic } = await queryFulfilled;
                    dispatch(
                        thematicApi.util.updateQueryData('getThematics', undefined, (draft) => {
                            const index = draft.findIndex((t) => t.id === thematicId);
                            if(index !== -1) draft[index] = updatedThematic;
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        deleteThematic: builder.mutation<void, number>({
            query: (thematicId) => ({
                url: `/thematics/${thematicId}`,
                method: 'DELETE'
            }),
            async onQueryStarted(thematicId, { dispatch, queryFulfilled }){
                try {
                    await queryFulfilled;
                    dispatch(
                        thematicApi.util.updateQueryData('getThematics', undefined, (draft) => {
                            return draft.filter((t) => t.id !== thematicId)
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
});

export const { useGetThematicsQuery, useCreateThematicMutation, useUpdateThematicMutation, useDeleteThematicMutation } = thematicApi;
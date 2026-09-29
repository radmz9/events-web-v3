import { baseApi } from "../../../app/services/baseApi";
import type { Staff } from "../types/staff.types";

interface StaffArgs {
    staffId?: number;
    typeId: number;
    body?: Partial<Staff> & { idRol: number };
}

const endpoint = `/staff`;

const getUrl = (typeId: number) => typeId === 4 ? 'professors' : 'administratives';

export const staffApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStaff: builder.query<Staff[], number>(({
            query: (typeId) => `${endpoint}/${getUrl(typeId)}`,
            providesTags: ['Staff']
        })),
        // Mutations
        createStaff: builder.mutation<Staff, StaffArgs>({
            query: ({ body }) => ({
                url: `${endpoint}`,
                method: 'POST',
                body
            }),
            async onQueryStarted({ typeId }, { dispatch, queryFulfilled }){
                try {
                    const { data: createdStaff } = await queryFulfilled;
                    dispatch(
                        staffApi.util.updateQueryData('getStaff', typeId, (draft) => {
                            draft.unshift(createdStaff);
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        updateStaff: builder.mutation<Staff, StaffArgs>({
            query: ({ staffId, body }) => ({
                url: `${endpoint}/${staffId}`,
                method: 'PATCH',
                body
            }),
            async onQueryStarted({ staffId, typeId }, { dispatch, queryFulfilled  }){
                try {
                    const { data: updatedStaff } = await queryFulfilled;
                    dispatch(
                        staffApi.util.updateQueryData('getStaff', typeId, (draft) => {
                            const index = draft.findIndex((s) => s.id === staffId);
                            if(index !== -1) draft[index] = updatedStaff;
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        deleteStaff: builder.mutation<void, number>({
            query: (staffId) => ({
                url: `${endpoint}/${staffId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Staff']
        })
    })
});

export const { useGetStaffQuery, useCreateStaffMutation, useUpdateStaffMutation, useDeleteStaffMutation } = staffApi;
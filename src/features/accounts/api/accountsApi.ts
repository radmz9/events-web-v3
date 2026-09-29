import { baseApi } from "../../../app/services/baseApi";
import type { AccountDto } from "../types/account.dto";
import type { AuthAccount } from "../types/accounts.types";
import type { AvailableArea } from "../types/area.types";
import type { ChangePasswordDto } from "../types/password.dto";
import type { AvailableStaff } from "../types/staff.types";

const endpoint = '/accounts'

export const accountApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAccounts: builder.query<AuthAccount[], void>({
            query: () => endpoint,
            providesTags: ['Account']
        }),
        getAvailableAreas: builder.query<AvailableArea[], void>({
            query: () => `${endpoint}/unused/areas`,
            providesTags: ['AvailableArea']
        }),
        getAvailableStaff: builder.query<AvailableStaff[], void>({
            query: () => `${endpoint}/unused/staff`,
            providesTags: ['AvailableStaff']
        }),
        // Mutations
        createAccount: builder.mutation<AuthAccount, AccountDto>({
            query: (body) => ({
                url: endpoint,
                method: 'POST',
                body: body
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled}){
                try {
                    const { data: createdAccount } = await queryFulfilled;

                    dispatch(
                        accountApi.util.updateQueryData('getAccounts', undefined, (draft) => {
                            draft.unshift(createdAccount);
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            },
            invalidatesTags: ['AvailableArea', 'AvailableStaff']
        }),
        changeUserFromArea: builder.mutation<AuthAccount, { accountId: number; body: Partial<AccountDto> }>({
            query: ({ accountId, body }) => ({
                url: `${endpoint}/${accountId}`,
                method: 'PATCH',
                body
            }),
            async onQueryStarted({ accountId }, { dispatch, queryFulfilled }){
                try {
                    const { data: updatedAccount } = await queryFulfilled;
                    dispatch(
                        accountApi.util.updateQueryData('getAccounts', undefined, (draft) => {
                            const index = draft.findIndex(a => a.id === accountId);
                            if(index !== -1) draft[index] = updatedAccount;
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            },
            invalidatesTags: ['AvailableStaff']
        }),
        deleteAccount: builder.mutation<void, number>({
            query: (accountId) => ({
                url: `${endpoint}/${accountId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['AvailableArea', 'AvailableStaff'],
            async onQueryStarted(accountId, { dispatch, queryFulfilled }){
                try {
                    await queryFulfilled;
                    dispatch(
                        accountApi.util.updateQueryData('getAccounts', undefined, (draft) => {
                            return draft.filter(a => a.id !== accountId)
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        changePassword: builder.mutation<void, ChangePasswordDto>({
            query: (body) => ({
                url: `${endpoint}/reset/password`,
                method: 'PATCH',
                body
            })
        })
    })
})

export const { 
    useGetAccountsQuery,
    useGetAvailableAreasQuery,
    useGetAvailableStaffQuery,
    useCreateAccountMutation,
    useChangeUserFromAreaMutation,
    useDeleteAccountMutation,
    useChangePasswordMutation
} = accountApi;
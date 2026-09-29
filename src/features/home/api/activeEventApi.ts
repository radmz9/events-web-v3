import { baseApi } from "../../../app/services/baseApi";
import type { CurrentEventData } from "../types/event.types";

export const activeEventApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPublicInfoEvent: builder.query<CurrentEventData, void>({
            query: () => `/events/public/details`,
            providesTags: ['CurrentEvent']
        }),
        checkEvent: builder.mutation<{ event_token: string }, { eventKey: string }>({
            query: (body) => ({
                url: `/events/isActive`,
                method: 'POST',
                body,
            }),
            async onQueryStarted(_, { queryFulfilled }){
                const { data: token } = await queryFulfilled;
                sessionStorage.setItem('event_token', token.event_token);
            },
            invalidatesTags: ['CurrentEvent', 'Attendance']
        })
    })
});

export const { useGetPublicInfoEventQuery, useCheckEventMutation } = activeEventApi;
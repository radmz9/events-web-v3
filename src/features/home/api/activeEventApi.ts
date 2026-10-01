import { baseApi } from "../../../app/services/baseApi";
import type { CurrentEventData } from "../types/event.types";

export const activeEventApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPublicInfoEvent: builder.query<CurrentEventData, void>({
            query: () => `/events/public/details`,
            providesTags: ['CurrentEvent']
        }),
        getPublicToken: builder.query<{event_token: string}, number>({
            query: (eventId) => `/events/${eventId}/isActive`,
            async onQueryStarted(_, { queryFulfilled }){
                const { data: token } = await queryFulfilled;
                sessionStorage.setItem('event_token', token.event_token);
            },
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
        }),
        
    })
});

export const { 
    useGetPublicInfoEventQuery, 
    useCheckEventMutation,
    useGetPublicTokenQuery
} = activeEventApi;
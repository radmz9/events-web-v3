import { baseApi } from "../../../app/services/baseApi";
import type { EventsType, EventType } from "../types/event.types";

interface Pagination {
    page: number;
    size: number;
}

export const eventApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEvents: builder.query<EventsType, Pagination>({
            query: ({ page, size }) => `/events/page/${page}/size/${size}`,
            providesTags: ['Events']
        }),
        getEventDetails: builder.query<EventType, string>({
            query: (eventId) => `/events/details/${eventId}`,
            providesTags: (result, _, id) => result ? [{ type: 'Events', id }] : ['Events']
        }),
        //Mutations
        createEvent: builder.mutation<EventType, { body: Partial<EventType>, pagination: Pagination}>({
            query: ({ body }) => ({
                url: `/events`,
                method: 'POST',
                body
            }),
            async onQueryStarted({ pagination }, { dispatch, queryFulfilled }){
                try {
                    const { data: createdEvent } = await queryFulfilled;

                    dispatch(
                        eventApi.util.updateQueryData('getEvents', { ...pagination }, (draft) => {
                            draft.data.unshift(createdEvent)
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        updateEvent: builder.mutation<EventType, { eventId: number, body: Partial<EventType>, pagination: Pagination }>({
            query: ({ eventId, body }) => ({
                url: `/events/${eventId}`,
                method: 'PATCH',
                body
            }),
            async onQueryStarted({ eventId, pagination }, { dispatch, queryFulfilled }){
                try {
                    const { data: updatedEvent } = await queryFulfilled;
                    dispatch(
                        eventApi.util.updateQueryData('getEvents', { ...pagination }, (draft) => {
                            const index = draft.data.findIndex((e) => e.id === eventId);
                            if(index !== -1) draft.data[index] = updatedEvent
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        toggleStateEvent: builder.mutation<void, { eventId: number, pagination: Pagination }>({
            query: ({ eventId }) => ({
                url: `/events/state/${eventId}/toggle`,
                method: 'PATCH'
            }),
            async onQueryStarted({ eventId, pagination }, { dispatch, queryFulfilled }){
                try {
                    await queryFulfilled;
                    dispatch(
                        eventApi.util.updateQueryData('getEvents', {...pagination}, (draft) => {
                            const index = draft.data.findIndex(e => e.id === eventId);
                            if(index !== -1) draft.data[index].isActive = !draft.data[index].isActive
                        })
                    )
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        deleteEvent: builder.mutation<void, {eventId: number, pagination: Pagination}>({
            query: ({ eventId }) => ({
                url: `/events/${eventId}`,
                method: 'DELETE',
            }),
            async onQueryStarted({eventId, pagination}, { dispatch, queryFulfilled }){
                try {
                    await queryFulfilled;
                    dispatch(
                        eventApi.util.updateQueryData('getEvents', {...pagination}, (draft) => {
                            return {
                                data: draft.data.filter(e => e.id !== eventId),
                                meta: {...draft.meta }
                            }
                        })
                    )
                } catch (error) {
                    console.log(error);
                }
            }
        })
    })
});

export const { 
    useGetEventsQuery, 
    useGetEventDetailsQuery,
    useCreateEventMutation, 
    useUpdateEventMutation, 
    useToggleStateEventMutation, 
    useDeleteEventMutation 
} = eventApi;
import { baseApi } from "../../../app/services/baseApi";
import type { Calendar } from "../types/calendar.types";

export const calendarApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCalendars: builder.query<Calendar[], void>({
            query: () => '/calendars',
            // providesTags: (result) => result ? [...result.map(({ id }) => ({ type: 'Calendar' as const, id })), 'Calendar'] : ['Calendar']
            providesTags: (result) => result ? [...result.map(({ id }) => ({ type: 'Calendar' as const, id })) , { type: 'Calendar' as const, id: 'LIST' }] : [{ type: 'Calendar' as const, id: 'LIST' }]
        }),
        // Mutations
        createCalendar: builder.mutation<Calendar, Partial<Calendar>> ({
            query: (data) => ({
                url: '/calendars',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data: createdCalendar } = await queryFulfilled;

                    dispatch(
                        calendarApi.util.updateQueryData('getCalendars', undefined, (draft) => {
                            draft.unshift(createdCalendar);
                        })
                    )
                } catch(error){ console.log(error) }
            }
        }),
        updateCalendar: builder.mutation<Calendar, { calendarId: number; calendar: Partial<Calendar>}> ({
            query: ({ calendarId, calendar }) => ({
                url: `/calendars/${calendarId}`,
                method: 'PATCH',
                body: calendar
            }),
            async onQueryStarted({ calendarId }, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedCalendar } = await queryFulfilled;

                    dispatch(
                        calendarApi.util.updateQueryData('getCalendars', undefined, (draft) => {
                            const index = draft.findIndex((c) => c.id === calendarId);
                            if(index !== -1){
                                draft[index] = updatedCalendar;
                            }
                        })
                    );
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        deleteCalendar: builder.mutation<void, number>({
            query: (calendarId) => ({
                url: `/calendars/${calendarId}`,
                method: 'DELETE'
            }),
            async onQueryStarted(calendarId, {dispatch, queryFulfilled}){
                try {
                    await queryFulfilled;
                    dispatch(
                        calendarApi.util.updateQueryData('getCalendars', undefined, (draft) => {
                            return draft.filter((c) => c.id !== calendarId);
                        })
                    );
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
});

export const { useGetCalendarsQuery, useCreateCalendarMutation, useUpdateCalendarMutation, useDeleteCalendarMutation } = calendarApi;
import { baseApi } from "../../../app/services/baseApi";
import type { Staff } from "../../staff/types/staff.types";
import type { StudentTypes } from "../../students/types/student.types";
import type { UserEventsSummary, UserInfoWithEvents } from "../types/search-data.types";

export const searchApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        searchUserEvents: builder.query<UserInfoWithEvents, string>({
            query: (code) => `/users/${code}`,
            // providesTags: ['SearchUser']
            providesTags: (result, error, userId) => [{ type: 'SearchUser', id: userId }],
            keepUnusedDataFor: 900
        }),
        searchStudent: builder.query<StudentTypes, string>({
            query: (code) => `/students/${code}`,
            providesTags: (result, error, userId) => [{ type: 'SearchUser', id: userId }]
        }),
        getStudentEvents: builder.query<UserEventsSummary, string>({
            query: (code) => `/students/${code}/events`,
            providesTags: (result, error, userId) => [{ type: 'UserEvents', id: userId }]
        }),
        searchStaff: builder.query<Staff, string>({
            query: (code) => `/staff/${code}/details`,
            providesTags: (result, error, userId) => [{ type: 'SearchUser', id: userId }]
        }),
        getStaffEvents: builder.query<UserEventsSummary, string>({
            query: (code) => `/staff/${code}/events`,
            providesTags: (result, error, userId) => [{ type: 'UserEvents', id: userId }]
        })
    })
});

export const { 
    useSearchUserEventsQuery, 
    useLazySearchUserEventsQuery,
    useSearchStudentQuery,
    useLazySearchStudentQuery,
    useGetStudentEventsQuery,
    useSearchStaffQuery,
    useLazySearchStaffQuery,
    useGetStaffEventsQuery,
    useLazyGetStaffEventsQuery
} = searchApi;
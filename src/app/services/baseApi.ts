import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { FetchArgs } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { logout, type AuthSlice } from "../../features/auth/services/authSlice";
import { toast } from "sonner";
import { getEventToken } from "../../features/home/helpers/event_token.helper";

export const BASE_URL = import.meta.env.VITE_API_URL;

const rawBaseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState } ) => {
        const state = getState() as { auth: AuthSlice };
        const authToken = state.auth.token;
        const eventToken = getEventToken();
        
        if(authToken){
            headers.set('Authorization', `Bearer ${authToken}`);
        }

        if(eventToken){
            headers.set('X-Event-Token', `Bearer ${eventToken}`);
        }
        return headers;
    }
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    if(result.error && result.error.status === 401){
        toast.error('Error', {
            description: 'El token ha expirado, saliendo....',
            duration: 5000
        })
        api.dispatch(logout());
        sessionStorage.removeItem('event_token');
        api.dispatch(baseApi.util.resetApiState());
        window.location.href = '/';
    }

    return result;
}

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        'Account',
        'AvailableArea',
        'AvailableStaff',
        'User', 
        'Area', 
        'Calendar', 
        'Sede', 
        'Place', 
        'Modality', 
        'Ods', 
        'Thematic', 
        'Type', 
        'Staff',
        'Attendance',
        'CurrentEvent',
        'SearchUser',
        'UserEvents',
        'Profile',
        'Reports',
        'Events',
        'Students',
        'StudentStats'
    ],
    endpoints: () => ({}),
})
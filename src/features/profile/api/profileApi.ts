import { baseApi } from "../../../app/services/baseApi";
import type { ProfileType } from "../types/profile.types";

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<ProfileType, void>({
            query: () => '/accounts/profile',
            providesTags: ['Profile']
        })
    })
})

export const { useGetProfileQuery } = profileApi;
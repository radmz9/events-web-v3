import { baseApi } from "../../../app/services/baseApi";


type UserType = "alumnos" | "personal";

type CheckUserAccessResponse = 
    | {
        allowed: true;
        type_user: UserType;
    }
    | {
        allowed: false;
        reason: string;
    }

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        checkUserAccess: builder.query<CheckUserAccessResponse, string>({
            query: (code) => `/users/${code}/access`
        })
    })
});

export const {
    useLazyCheckUserAccessQuery
} = userApi;